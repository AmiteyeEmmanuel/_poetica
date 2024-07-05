import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import cld from "cloudinary";
import PoemModel from "../models/poem.model";
import {
  IAddReviewData,
  IAddReviewReplyData,
  IAnswerData,
  IQuestionData,
} from "../interface/poem.interface";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";

// upload poem
export const uploadPoem = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      // Handle thumbnail upload if present
      if (data.thumbnail) {
        const cloudData = await cld.v2.uploader.upload(data.thumbnail, {
          folder: "poems",
        });
        data.thumbnail = {
          public_id: cloudData.public_id,
          url: cloudData.secure_url,
        };
      }

      const poem = await PoemModel.create(data);

      res.status(201).json({
        success: true,
        poem,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// edit poems
export const editPoem = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const thumbnail = data.thumbnail;

      // If a new thumbnail is provided, delete the old one and upload the new one
      if (thumbnail) {
        await cld.v2.uploader.destroy(thumbnail.public_id);

        const cloudData = await cld.v2.uploader.upload(thumbnail, {
          folder: "poems",
        });

        data.thumbnail = {
          public_id: cloudData.public_id,
          url: cloudData.secure_url,
        };
      }

      // Update the poem with new data
      const updatedPoem = await PoemModel.findByIdAndUpdate(id, {
        $set: data,
        new: true,
      });

      res.status(200).json({
        success: true,
        poem: updatedPoem,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get single poem  --- without purchase
export const getSinglePoem = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poem = await PoemModel.findById(req.params.id).select(
        "-poemData.content -poemData.suggestion -poemData.questions -poemData.link"
      );

      if (!poem) {
        return next(new ErrorHandler("Poem not found", 404));
      }

      res.status(200).json({
        success: true,
        poem,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all poem with purchase
export const getAllPoems = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poems = await PoemModel.find().select(
        "-poemData.content -poemData.suggestion -poemData.questions -poemData.link"
      );

      if (!poems) {
        return next(new ErrorHandler("Poem not found", 404));
      }

      res.status(200).json({
        success: true,
        poems,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get poem content --- validated users
export const getPoemsByUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userPoemList = req.user?.poems;
      const { id } = req.params;

      const poemExists = userPoemList?.find(
        (poem: any) => poem._id.toString() === id
      );

      if (!poemExists) {
        return next(
          new ErrorHandler("You're not eligible to access this poem", 404)
        );
      }

      const poem = await PoemModel.findById(id);

      const content = poem?.poemData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add question in poem
export const addQuestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, poemId, contentId }: IQuestionData = req.body;
      const poem = await PoemModel.findById(poemId);

      if (!mongoose.Types.ObjectId.isValid(poemId)) {
        return next(new ErrorHandler("Invalid poem id", 400));
      }

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      if (!poem) {
        return next(new ErrorHandler("Poem not found", 404));
      }

      const poemContent = poem.poemData.find(
        (item: any) => item._id.toString() === contentId
      );

      if (!poemContent) {
        return next(new ErrorHandler("Content not found in poem", 404));
      }

      const newQuestion: any = {
        users: req.user,
        question,
        questionReplies: [],
      };

      poemContent.questions.push(newQuestion);

      await NotificationModel.create({
        user: req.user?._id,
        title: "New Question",
        message: `You have from ${req.user?._id} in ${poem.name}`,
      });

      // save the updated poem
      await poem.save();

      res.status(200).json({
        success: true,
        message: "Question added successfully",
        poem,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add answering poem question
export const addAnswer = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, poemId, contentId, questionId }: IAnswerData = req.body;

      const poem = await PoemModel.findById(poemId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      if (!poem) {
        return next(new ErrorHandler("Poem not found", 404));
      }

      const poemContent = poem?.poemData?.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!poemContent) {
        return next(new ErrorHandler("Content not found in poem", 404));
      }

      const question = poemContent?.questions?.find((item: any) =>
        item._id.equals(questionId)
      );

      if (!question) {
        return next(new ErrorHandler("Question not found in content", 404));
      }

      const newAnswer: any = {
        user: req.user,
        answer,
      };

      // add this answer to our poem content.
      question.questionReplies.push(newAnswer);

      await poem?.save();
    
      if (req.user?._id.toString() === question.user?._id.toString()) {
        const data = {
          name: question.user?.username,
          title: poemContent.title,
        };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/question_reply.ejs"),
          data
        );

        try {
          await sendMail({
            email: question.user?.email,
            subject: "Question Reply",
            template: "question_reply.ejs",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 400));
        }
      }

      res.status(200).json({
        success: true,
        message: "Answer added successfully",
        poem,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add review in poem
export const addReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userPoemList = req.user?.poems;

      const poemId = req.params.id;

      // check if the poemId already exist and user is eligible
      const poemExists = userPoemList?.some(
        (poem: any) => poem._id.toString() === poemId.toString()
      );

      if (!poemExists) {
        return next(
          new ErrorHandler("Your are not eligible to access this poem", 400)
        );
      }

      const poem = await PoemModel.findById(poemId);

      const { review, rating } = req.body as IAddReviewData;

      const reviewData: any = {
        user: req.user,
        comment: review,
        rating,
      };

      poem?.reviews.push(reviewData);

      let averageValue = 0;

      poem?.reviews.forEach((rev: any) => {
        averageValue += rev.rating;
      });

      if (poem) {
        poem.rating = averageValue / poem.reviews.length;
      }

      await poem?.save();

      const notification = {
        title: "New review",
        message: `${req.user?.username} has posted a review on ${poem?.name}.`,
      };

      // create notification

      res.status(200).json({
        sucess: true,
        poem,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add review replies
export const addReviewReply = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, poemId, reviewId } = req.body as IAddReviewReplyData;

      if (!mongoose.Types.ObjectId.isValid(poemId)) {
        return next(new ErrorHandler("Invalid poem id", 400));
      }

      if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return next(new ErrorHandler("Invalid review id", 400));
      }

      const poem = await PoemModel.findById(poemId);
      if (!poem) {
        return next(new ErrorHandler("Poem not found", 404));
      }

      // Ensure the user is the author of the poem or an admin
      if (
        poem.user?._id.toString() !== req.user?._id.toString() &&
        req.user.role !== "admin"
      ) {
        return next(
          new ErrorHandler("You do not have permission to reply", 403)
        );
      }

      const review = poem.reviews.find(
        (rev: any) => rev._id.toString() === reviewId.toString()
      );

      if (!review) {
        return next(new ErrorHandler("Review not found in poem", 404));
      }

      const replyData: any = {
        user: req.user,
        comment,
      };

      if (!review.commentReplies) {
        review.commentReplies = [];
      }

      review.commentReplies.push(replyData);

      await poem.save();

      res.status(200).json({
        success: true,
        poem,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
