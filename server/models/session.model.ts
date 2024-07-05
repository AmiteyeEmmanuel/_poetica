import mongoose, { Document, Schema, Model } from "mongoose";

interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema = new Schema<ISession>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    // Create a TTL index on this field
    index: { expires: "1s" },
  },
});

const SessionModel: Model<ISession> = mongoose.model<ISession>(
  "Session",
  sessionSchema
);

export default SessionModel;
