import { NextFunction, Request, Response } from 'express';
import catchAsyncError from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/errorHandler';
import OrderModel from '../models/order.model';


export const newOrder = catchAsyncError(async (data:any, res: Response, next: NextFunction) => {
  try {
    const order = await OrderModel.create(data);

    res.status(201).json({
        success: true,
        message: 'New order successfully placed.',
        order
      })
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});



export const allAvailableOrders = async (res: Response) => {
  try {
     const allOrders = await OrderModel.find().sort({createdAt: -1})

     res.status(201).json({
       success: true, 
       allOrders
     })

  }catch (error: any) {
   res.status(500).json({
     success: false,
     message: error.message,
   });
 }
}