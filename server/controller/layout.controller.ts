import catchAsyncError from "../middleware/catchAsyncErrors";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
import {
  BannerImage,
  Category,
  FAQItem,
  Layout,
} from "../interface/layout.interface";
import LayoutModel from "../models/layout.model";
import cld from "cloudinary";

export const createLayout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      let layoutData: Partial<Layout> = {
        type,
        faq: [],
        categories: [],
        banner: undefined,
      };

      const isTypeExist = await LayoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`${type} already exist`, 400));
      }
      if (type === "Banner") {
        const { image, title, subtitle } = req.body;

        const cloud = await cld.v2.uploader.upload(image, {
          folder: "Layout",
        });

        const banner = {
          image: {
            public_id: cloud.public_id,
            url: cloud.secure_url,
          },
          title,
          subtitle,
        };

        await LayoutModel.create(banner);
      } else if (type === "FAQ") {
        const { faq } = req.body;

        layoutData.faq = faq.map((item: FAQItem) => ({
          question: item.question,
          answer: item.answer,
        }));
      } else if (type === "Categories") {
        const { categories } = req.body;

        layoutData.categories = categories.map((category: Category) => ({
          title: category.title,
        }));
      } else {
        return next(new ErrorHandler("Invalid layout type", 400));
      }

      const layout = new LayoutModel(layoutData);
      await layout.save();

      res.status(200).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const editLayout = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { type } = req.body;
  
        // Find the existing layout by its type
        const layout = await LayoutModel.findOne({ type });
        if (!layout) {
          return next(new ErrorHandler("Layout not found", 404));
        }
  
        if (type === "Banner") {
          const { image, title, subtitle } = req.body;
  
          if (layout.banner && layout.banner.image) {
            // Remove the old image from Cloudinary
            await cld.v2.uploader.destroy(layout.banner.image.public_id);
          }
  
          // Upload the new image to Cloudinary
          const cloud = await cld.v2.uploader.upload(image, {
            folder: "Layout",
          });
  
          // Update the banner fields
          const banner = {
            image: {
              public_id: cloud.public_id,
              url: cloud.secure_url,
            },
            title,
            subtitle,
          };

          await LayoutModel.create(banner);
  
        } else if (type === "FAQ") {
          const { faq } = req.body;
  
          // Update the FAQ fields
          layout.faq = faq.map((item: FAQItem) => ({
            question: item.question,
            answer: item.answer,
          }));
  
        } else if (type === "Categories") {
          const { categories } = req.body;
  
          // Update the categories fields
          layout.categories = categories.map((category: Category) => ({
            title: category.title,
          }));
  
        } else {
          return next(new ErrorHandler("Invalid layout type", 400));
        }
  
        // Save the updated layout
        await layout.save();
  
        res.status(200).json({
          success: true,
          message: "Layout updated successfully"
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );


  //get Layout by type 
export const getLayoutByType = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;

      // Find the layout by its type
      const layout = await LayoutModel.findOne({ type });
      if (!layout) {
        return next(new ErrorHandler('Layout not found', 404));
      }

      res.status(200).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);