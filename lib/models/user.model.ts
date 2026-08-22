// ─── lib/models/user.model.ts ──────────────────────────────────────────────────
// Mongoose schema for the User collection.
// This is the persistent DB model — distinct from the TypeScript interface in models/index.ts.

import mongoose, { Schema, type Document, type Model } from "mongoose";

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = "user" | "admin";

export interface IUser {
  name: string;
  email: string;
  hashedPassword: string;
  role: UserRole;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  _id: mongoose.Types.ObjectId;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must be at most 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Never returned in queries unless explicitly requested
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "users",
  },
);

// ─── Model ────────────────────────────────────────────────────────────────────
// Guard against model re-registration in Next.js dev hot-reload

export const UserModel: Model<IUserDocument> =
  (mongoose.models.User as Model<IUserDocument>) ||
  mongoose.model<IUserDocument>("User", UserSchema);
