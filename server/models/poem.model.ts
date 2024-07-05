import mongoose, { Model, Schema } from "mongoose";
import {
  IComment,
  ILink,
  IPoem,
  IPoemData,
  IReview,
} from "../interface/poem.interface";

const reviewSchema = new Schema<IReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
  commentReplies: [Object],
});

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const commentSchema = new Schema<IComment>(
  {
    user: Object,
    question: String,
    questionReplies: [Object],
  },
  {
    timestamps: true,
  }
);

const poemDataSchema = new Schema<IPoemData>({
  title: String,
  description: String,
  content: String,
  poemImage: String,
  imageSection: String,
  imageThumbnail: Object,
  link: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

// const poemSchema = new Schema<IPoem>({
  const poemSchema: Schema<IPoem> = new mongoose.Schema({
    user: Object,
    bio: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    tags: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    demoUrl: {
      type: String,
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: {
      type: [reviewSchema],
      default: []
    },
    poemData: {
      type: [poemDataSchema],
      default: []
    },
    rating: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  });

const PoemModel: Model<IPoem> = mongoose.model<IPoem>("Poem", poemSchema);

export default PoemModel;
