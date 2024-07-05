import { Document } from "mongoose";
import { IUser } from "../models/user.model";

export interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies: IComment[];
}

export interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies?: IComment[];
}

export interface ILink extends Document {
  title: string;
  url: string;
}

export interface IPoemData extends Document {
  title: string;
  description: string;
  content: string;
  poemImage: string;
  imageSection: string;
  imageThumbnail: object;
  link: ILink[];
  suggestion: string;
  questions: IComment[];
}

export interface IPoem extends Document {
  user: IUser,
  bio: string,
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  poemData: IPoemData[];
  rating: number;
  purchased: number;
}

export interface IQuestionData {
  question: string;
  poemId: string;
  contentId: string;
}

export interface IAnswerData {
    answer: string,
    poemId: string,
    contentId: string,
    questionId: string
}

export interface IAddReviewData{
  review: string;
  courseId: string;
  rating: number;
  userId: string;
}

export interface IAddReviewReplyData{
  comment: string;
  poemId: string;
  reviewId: string;
}

