// ─── lib/models/product.model.ts ──────────────────────────────────────────────
// Mongoose schema for the Product collection.
// Matches the Product interface in models/index.ts but adds DB-specific fields.

import mongoose, { Schema, type Document, type Model, type CallbackWithoutResultAndOptionalError } from "mongoose";

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

const ImageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, required: true },
    width: { type: Number, required: true, default: 800 },
    height: { type: Number, required: true, default: 800 },
    blurDataURL: { type: String, default: null },
  },
  { _id: false },
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: { url: string; alt: string; width: number; height: number; blurDataURL?: string }[];
  category: string;
  tags: string[];
  stock: number;
  featured: boolean;
  inStock: boolean;  // computed — true when stock > 0
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductDocument extends IProduct, Document {
  _id: mongoose.Types.ObjectId;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const ProductSchema = new Schema<IProductDocument>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [200, "Name must be at most 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [5000, "Description must be at most 5000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    compareAtPrice: {
      type: Number,
      min: [0, "Compare-at price cannot be negative"],
      default: null,
    },
    images: {
      type: [ImageSchema],
      validate: {
        validator: (arr: unknown[]) => arr.length >= 1,
        message: "At least one image is required",
      },
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: {
        values: ["living", "dining", "bedroom", "lighting", "outdoor", "workspace"],
        message: "Category must be one of: living, dining, bedroom, lighting, outdoor, workspace",
      },
    },
    tags: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ─── Indexes ─────────────────────────────────────────────────────────────────

ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ createdAt: -1 });

// ─── Model ────────────────────────────────────────────────────────────────────

export const ProductModel: Model<IProductDocument> =
  (mongoose.models.Product as Model<IProductDocument>) ||
  mongoose.model<IProductDocument>("Product", ProductSchema);
