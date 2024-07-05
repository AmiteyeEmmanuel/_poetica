import { Response } from "express";
import PoemModel from "../models/poem.model";
import catchAsyncError from "../middleware/catchAsyncErrors";

// // create poem 
export const createPoem = catchAsyncError(async (req: any, res: Response) => {
    const data = req.body;

    const poet = await PoemModel.create(data);

    res.status(201).json({
        success: true,
        poet,
    });
});


export const allAvailablePoems = async (res: Response) => {
    try {
       const allPoems = await PoemModel.find().sort({createdAt: -1})
 
       res.status(201).json({
         success: true, 
         allPoems
       })
 
    }catch (error: any) {
     res.status(500).json({
       success: false,
       message: error.message,
     });
   }
 }