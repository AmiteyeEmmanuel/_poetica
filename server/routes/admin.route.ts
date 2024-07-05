import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { validateRoles } from "../controller/user.controller";
import {
  deletePoem,
  deleteUser,
  getAllOrders,
  getAllPoems,
  getAllUser,
  getOrderAnalytics,
  getPoemAnalytics,
  getUserAnalytics,
  updateUserRole,
} from "../controller/admin.controller";

const adminRouter = express.Router();

adminRouter.get(
  "/get-all-users",
  isAuthenticated,
  validateRoles("admin"),
  getAllUser
);

adminRouter.get(
  "/get-all-poems",
  isAuthenticated,
  validateRoles("admin"),
  getAllPoems
);

adminRouter.get(
  "/get-all-orders",
  isAuthenticated,
  validateRoles("admin"),
  getAllOrders
);

adminRouter.get(
  "/get-users-analytics",
  isAuthenticated,
  validateRoles("admin"),
  getUserAnalytics
);


adminRouter.get(
  "/get-poems-analytics",
  isAuthenticated,
  validateRoles("admin"),
  getPoemAnalytics
);

adminRouter.get(
  "/get-orders-analytics",
  isAuthenticated,
  validateRoles("admin"),
  getOrderAnalytics
);

adminRouter.put(
  "/update-user-roles",
  isAuthenticated,
  validateRoles("admin"),
  updateUserRole
);

adminRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  validateRoles("admin"),
  deleteUser
);

adminRouter.delete(
  "/delete-poem/:id",
  isAuthenticated,
  validateRoles("admin"),
  deletePoem
);

export default adminRouter;
