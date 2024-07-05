import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middleware/catchAsyncErrors";
import { allAvailablePoems } from "../services/poem.service";
import {
  getAllUsersServices,
  updateUserRoleService,
} from "../services/user.service";
import { allAvailableOrders } from "../services/order.service";
import UserModel from "../models/user.model";
import PoemModel from "../models/poem.model";
import { generateLast12MonthData } from "../utils/analytics.generator";
import OrderModel from "../models/order.model";

// get all Users -admin
export const getAllUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersServices(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// // get all Poems -admin
export const getAllPoems = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      allAvailablePoems(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all Orders - admin
export const getAllOrders = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      allAvailableOrders(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// update user role -admin
export const updateUserRole = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.body;
      updateUserRoleService(res, id, role);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// delete user -admin
export const deleteUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await UserModel.findById(id);

      if (!user) {
        return next(new ErrorHandler("User does not Exist", 404));
      }

      await user.deleteOne({ id });

      res.status(201).json({
        success: true,
        message: "User account successfully deleted.",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const deletePoem = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const poemExist = await PoemModel.findById(id);

      if (!poemExist) {
        return next(new ErrorHandler("Poem not found", 404));
      }

      await poemExist.deleteOne({ id });

      res.status(201).json({
        success: true,
        message: "Poem deleted successfully.",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get user analytics - admin
export const getUserAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
     try {
        const users = await generateLast12MonthData(UserModel);

        res.status(200).json({
            success: true,
            users
        })
     } catch (error: any) {
         return next(new ErrorHandler(error.message, 5000))
     }
  }
);


// get poems analytics - admin
export const getPoemAnalytics = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
       try {
          const poems = await generateLast12MonthData(PoemModel);
  
          res.status(200).json({
              success: true,
              poems
          })
       } catch (error: any) {
           return next(new ErrorHandler(error.message, 5000))
       }
    }
  );


  // get orders analytics - admin
export const getOrderAnalytics = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
       try {
          const orders = await generateLast12MonthData(OrderModel);
  
          res.status(200).json({
              success: true,
              orders
          })
       } catch (error: any) {
           return next(new ErrorHandler(error.message, 5000))
       }
    }
  );
  
  
