import { Response, NextFunction, Request } from "express";
import OrderModel from "../models/order.model";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middleware/catchAsyncErrors";
import { IOrder } from "../interface/order.interface";
import UserModel from "../models/user.model";
import PoemModel from "../models/poem.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import { newOrder } from "../services/order.service";
import Stripe from "stripe";

export const createOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { poemId, payment_info } = req.body as IOrder;

      if(payment_info) {
        if("id" in payment_info) {
          const paymentIntentId =  payment_info.id as string;
          const paymentIntent = await stripe.paymentIntents.retrieve(
             paymentIntentId
          );

          if(paymentIntent.status !== "succeeded") {
             return next(new ErrorHandler("Payment not authorized", 400));
          }
        }
      }

      const user = await UserModel.findById(req.user?._id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Check if the user has already purchased this poem
      const poemPurchase = user.poems.some(
        (poem: any) => poem.poemId.toString() === poemId
      );

      if (poemPurchase) {
        return next(
          new ErrorHandler("You've already purchased this poem", 400)
        );
      }

      const poem = await PoemModel.findById(poemId);
      if (!poem) {
        return next(new ErrorHandler("Poem not found", 404));
      }

      const data: any = {
        poemId: poem._id,
        userId: user._id,
        payment_info,
      };

      const mailData = {
        order: {
          _id: poem._id.toString().slice(0, 6),
          name: poem.name,
          price: poem.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order_confirmation.ejs"),
        { order: mailData.order }
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Order Confirmation",
          template: "order_confirmation.ejs",
          data: mailData,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }

      user.poems.push({ poemId: poem._id });
      await user.save();

      await NotificationModel.create({
        user: user._id,
        title: "New Order",
        message: `You have a new order for ${poem.name}`,
      });

      poem.purchased = (poem.purchased || 0) + 1;

      await poem.save();

      // Create the order
      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export const sendStripePublishableKey = catchAsyncError(
  async (req: Request, res: Response) => {
    res.status(200).json({
       publishableKey : process.env.STRIPE_PUBLISHABLE_KEY,
    })
  } 
)

export const newPayment = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'USD',
        metadata: {
           company: 'Poetica' 
        },
         automatic_payment_methods: {
              enabled: true
         },
      });

      res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);