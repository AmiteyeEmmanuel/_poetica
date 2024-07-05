import NotificationModel from "../models/notification.model";
import catchAsyncError from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { NextFunction, Request, Response } from "express";
import cron from 'node-cron';

// get all Notification -admin
export const getNotification = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// update notification status
export const updateNotification = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const notification = await NotificationModel.findById(req.params.id);
  
        if (!notification) {
          return next(new ErrorHandler("Notification not found", 404));
        }
  
        notification.status = "read";
        await notification.save();

        const sortNotification = await NotificationModel.find().sort({
            createdAt: -1,
        });
  
        res.status(200).json({
          success: true,
          message: "Notification status updated to read",
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );
  
// Function to delete notifications older than one month
const deleteOldNotifications = async () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
    try {
      await NotificationModel.deleteMany({ status: "read", createdAt: { $lt: oneMonthAgo } });
      console.log('Old notifications deleted successfully');
    } catch (error) {
      console.error('Error deleting old notifications:', error);
    }
  };
  
  // Schedule the cron job to run daily at midnight
  cron.schedule('0 0 * * *', () => {
    console.log('Running the daily cron job to delete old notifications');
    deleteOldNotifications();
  });