import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import cld from "cloudinary";

import sendMail from "../utils/sendMail";
import {
  IRegistrationBody,
  IActivationToken,
  IActivationRequest,
  ILoginRequest,
  ISocialBody,
  IUpdateUserInfo,
  IUpdateUserPassword,
  IUpdateUserProfileImage,
} from "../interface/user.interface";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
// import { redis } from "../utils/redis";
import { getUserById } from "../services/user.service";
import UserModel, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middleware/catchAsyncErrors";
import SessionModel from "../models/session.model";

require("dotenv").config();

// Function to create activation token
const createActivationToken = (newUser: IUser): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { user: newUser, activationCode },
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: "2m",
    }
  );

  return { token, activationCode };
};

// Register user
export const registerUser = catchAsyncError(
  async (
    req: Request<{}, {}, IRegistrationBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return next(
          new ErrorHandler("User already exists with this email", 400)
        );
      }

      // Create new user
      const newUser = new UserModel({
        username,
        email,
        password,
      });

      // Create activation token
      const activationToken = createActivationToken(newUser);

      const activation = activationToken.activationCode;

      const data = { newUser: { name: newUser.username }, activation };
      // Render the EJS template
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation_email.ejs"),
        data
      );

      try {
        await sendMail({
          email: newUser.email,
          subject: "Activate yout account",
          template: "activation_email.ejs",
          data,
        });

        // Send response with token
        res.status(201).json({
          success: true,
          message: `${newUser.email} successfully registered. Please check your email to activate your account.`,
          activationToken: activationToken.token,
          // activationCode
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Activate New Users
export const activateAccount = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;

      // Verify the activation token
      const decodedToken = jwt.verify(
        activation_token,
        process.env.JWT_SECRET as string
      ) as { user: IUser; activationCode: string };

      // Ensure decodedToken and its properties are defined
      if (!decodedToken || !decodedToken.user || !decodedToken.activationCode) {
        throw new Error("Invalid token structure");
      }

      // Check if the activation code matches
      if (decodedToken.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }

      const { username, email, password } = decodedToken.user;

      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        return next(new ErrorHandler("User already exists", 400));
      }

      const user = await UserModel.create({
        username,
        email,
        password,
        // photo,
      });

      // Send response
      res.status(200).json({
        success: true,
        message: "User Account activated successfully.",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


export const loginUser = catchAsyncError(
  async (
    req: Request<{}, {}, ILoginRequest>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }

      // Check if user exists
      const user = await UserModel.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      // Check if password matches
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      // Create token
      sendToken(user, 200, res);

      // Remove password from the output
      user.password = undefined;
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const logoutUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return next(new ErrorHandler("User not found", 404));
      }

      await SessionModel.findOneAndDelete({ userId });

      // Clear cookies
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });

      // Clear headers
      res.setHeader("access_token", "");
      res.setHeader("refresh_token", "");

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// validate users role.
export const validateRoles = (...roles: string[]) => {
  return catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await UserModel.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      if (!roles.includes(user.role)) {
        return next(
          new ErrorHandler(
            "You do not have permission to access this resources.",
            403
          )
        );
      }

      next();
    }
  );
};

// update access token
export const updateAccessToken = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.headers['refresh_token'] as string;
      // const refresh_token = req.cookies.refreshToken;

      if (!refresh_token) {
        return next(new ErrorHandler("No refresh token provided", 400));
      }

      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;

      if (!decoded || !decoded.id) {
        return next(new ErrorHandler("Invalid refresh token", 400));
      }

      // Fetch the user from the database
      const session = await UserModel.findById(decoded.id);

      if (!session) {
        return next(new ErrorHandler("Session not found", 404));
      }

      const user = session.toObject();

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        { expiresIn: "5m" }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        { expiresIn: "2d" }
      );

      req.user = user;

      // Set cookies
      res.cookie("accessToken", accessToken, accessTokenOptions);
      res.cookie("refreshToken", refreshToken, refreshTokenOptions);

      res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get user info
export const getUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return next(new ErrorHandler("User ID not found in request", 400));
      }
      getUserById(userId, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// social auth
export const socialAuth = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, photo } = req.body as ISocialBody;

      if (!email || !username || !photo) {
        return next(new ErrorHandler("Missing required fields", 400));
      }

      const user = await UserModel.findOne({ email });

      if (!user) {
        const newUser = await UserModel.create({ email, username, photo });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update userInfo
export const updateUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username } = req.body as IUpdateUserInfo;

      if (!email && !username) {
        return next(
          new ErrorHandler("Please provide email or username to update", 400)
        );
      }

      const userId = req.user?._id;
      // if (!userId) {
      //   return next(new ErrorHandler("User ID not found in request", 400));
      // }

      const user = await UserModel.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      if (email && user) {
        const isEmailExist = await UserModel.findOne({ email });
        if (isEmailExist) {
          return next(new ErrorHandler("Email already exist", 400));
        }
        user.email = email;
      }

      if (username && user) {
        user.username = username;
      }

      await user?.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update userPassword
export const updateUserPassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdateUserPassword;

      if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("Please enter old and new password", 404));
      }
      const user = await UserModel.findById(req.user?._id).select("+password");

      if (user?.password === undefined) {
        return next(new ErrorHandler("Invalid User", 400));
      }

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const isPasswordMatch = await user.comparePassword(oldPassword);

      if (!isPasswordMatch) {
        return next(new ErrorHandler("Incorrect password", 400));
      }

      user.password = newPassword;
      await user.save();

      res.status(201).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update profile picture
export const updateProfilePicture = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { photo } = req.body as IUpdateUserProfileImage;
      const userId = req.user?._id;

      if (!userId) {
        return next(new ErrorHandler("User not authenticated", 401));
      }

      const user = await UserModel.findById(userId);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      if (photo && user) {
        // Delete the old profile picture if it exists
        if (user.photo?.public_id) {
          await cld.v2.uploader.destroy(user.photo.public_id);

          // Upload new profile picture
          const myCloud = await cld.v2.uploader.upload(photo, {
            folder: "profileImage",
            width: 150,
            crop: "scale",
          });

          // Update user's profile picture information
          user.photo = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          // Upload new profile picture
          const myCloud = await cld.v2.uploader.upload(photo, {
            folder: "profileImage",
            width: 150,
            crop: "scale",
          });

          // Update user's profile picture information
          user.photo = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await user.save();

      res.status(200).json({
        success: true,
        message: "Profile picture updated successfully",
        photo: user.photo,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

