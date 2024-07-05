import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { validateRoles } from "../controller/user.controller";
import { createLayout, editLayout, getLayoutByType } from "../controller/layout.controller";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAuthenticated,
  validateRoles("admin"),
  createLayout
);

layoutRouter.put(
    "/edit-layout",
    isAuthenticated,
    validateRoles("admin"),
    editLayout
  );

layoutRouter.get(
  "/get-layout/:type",
  getLayoutByType
);
export default layoutRouter 
