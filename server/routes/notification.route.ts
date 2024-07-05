import express from "express";
import { getNotification, updateNotification } from "../controller/notification.controller";
import { isAuthenticated } from "../middleware/auth";
import { validateRoles } from "../controller/user.controller";

const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  isAuthenticated,
  validateRoles('admin'),
  getNotification
);

notificationRouter.put(
    "/update-notifications/:id",
    isAuthenticated,
    validateRoles('admin'),
    updateNotification
  );

  notificationRouter.put(
    "/delete-notifications",
    isAuthenticated,
    validateRoles('admin'),
    updateNotification
  );


export default notificationRouter