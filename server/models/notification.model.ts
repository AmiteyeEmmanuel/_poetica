import mongoose, { Model, Schema } from "mongoose";
import { INotification } from "../interface/notification.interface";

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'unread'
    },
    // userId: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const NotificationModel: Model<INotification> = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default NotificationModel;
