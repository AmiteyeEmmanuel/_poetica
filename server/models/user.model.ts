import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

require('dotenv').config();

// Define the email regex pattern
const emailRegexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Define the interface for the User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  photo: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  poems: Array<{ poemId: any }>;
  comparePassword: (password: string) => Promise<boolean>; 
  signAccessToken:  () => string;
  signRefreshToken: () => string;
}

// Define the schema for the User model
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Please enter your username"] },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      // required: [true, "please enter your password"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    photo: {
      public_id: { type: String },
      url: { type: String },
    },
    role: { type: String, default: "user" },
    isVerified: { type: Boolean, default: false },
    poems: [{ poemId: String }],
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash the password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//sign access token
userSchema.methods.signAccessToken = function () {
    return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN || '', {
      expiresIn: '2m'
    });
};

/// sign refresh token 
userSchema.methods.signRefreshToken = function () {
  return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN || '', {
    expiresIn: '2d'
  });
};
// Method to compare password
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Create the User model
const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default UserModel;
