import { NextFunction, Response } from "express";
import UserModel from "../models/user.model";

export const getUserById = async (id: any, res: Response) => {
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// get all user - admin
export const getAllUsersServices = async (res: Response) => {
   try {
      const Users = await UserModel.find().sort({createdAt: -1})

      res.status(201).json({
        success: true, 
        Users
      })

   }catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// update user role - admin
export const updateUserRoleService = async (res: Response, id:string, role:string) => {
  try {
     const userRole = await UserModel.findByIdAndUpdate(id, {role}, {new: true});

     res.status(201).json({
      success: true, 
      userRole
    })
  } catch (error) {
     res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
