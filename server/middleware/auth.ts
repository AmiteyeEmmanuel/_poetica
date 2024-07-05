import { Request, Response, NextFunction } from "express";
import catchAsyncError from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import { updateAccessToken } from "../controller/user.controller";

// authenticated user
export const isAuthenticated = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.headers['access_token'] as string;

    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access your account!", 400)
      );
    }

    try {
      const decoded = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN as string
      ) as jwt.JwtPayload;

      if (!decoded) {
        return next(new ErrorHandler("access token not found", 404));
      }
      if(decoded.exp && decoded.exp <= Date.now() / 1000) {
         try {
            await updateAccessToken(req, res, next);
         } catch(error) {
            return next(error);
         }
      }else {
        const user = await UserModel.findById(decoded.id);

        if (!user) {
          return next(new ErrorHandler("User not found", 404));
        }
        req.user = user;
      }
      next();
    } catch (error: any) {
      return next(new ErrorHandler("Invalid token, please login again!", 401));
    }
  }
);


// import { Request, Response, NextFunction } from "express";
// import catchAsyncError from "./catchAsyncErrors";
// import ErrorHandler from "../utils/errorHandler";
// import jwt from 'jsonwebtoken';
// import UserModel from "../models/user.model";


// // authenticated user
// export const isAuthenticated = catchAsyncError(
//     async (req: Request, res: Response, next: NextFunction) => {
//       const accessToken = req.cookies.accessToken;
  
//       if (!accessToken) {
//         return next(new ErrorHandler("Please login to access your account!", 400));
//       }
  
//       try {
//         const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN as string) as jwt.JwtPayload;

//         if(!decoded) {
//             return next(new ErrorHandler("access token not found", 404));
//         }
  
//         // Optionally, you can fetch the user from the database
//         const user = await UserModel.findById(decoded.id);
  
//         if (!user) {
//           return next(new ErrorHandler("User not found", 404));
//         }
//         req.user = user;

//         next();
//       } catch (error: any) {
//         return next(new ErrorHandler("Invalid token, please login again!", 401));
//       }
//     }
//   );
