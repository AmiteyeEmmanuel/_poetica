import express from "express";
import {
  activateAccount,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updateAccessToken,
  updateProfilePicture,
  updateUserInfo,
  updateUserPassword,
  validateRoles,
} from "../controller/user.controller";
import { isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

//Post routers 

userRouter.post("/registration", registerUser);

userRouter.post("/activate-user", activateAccount);

userRouter.post("/login", loginUser);

userRouter.post("/social-auth", socialAuth);

// get routes

userRouter.post("/logout", isAuthenticated, logoutUser);

userRouter.get("/refreshtoken", updateAccessToken);

userRouter.get("/userInfo", isAuthenticated, getUserInfo);

// put routes

userRouter.put("/update-userInfo", isAuthenticated, updateUserInfo);

userRouter.put("/update-userpassword", isAuthenticated, updateUserPassword);

userRouter.put("/update-userprofile", isAuthenticated, updateProfilePicture);

export default userRouter;
