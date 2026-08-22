// ─── lib/models/cart.model.ts ──────────────────────────────────────────────────
// Mongoose schema for the Cart collection.
// Stores cart items for authenticated users.

import mongoose, { Schema, type Document, type Model } from "mongoose";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartDocument extends ICart, Document {
  _id: mongoose.Types.ObjectId;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const CartItemSchema = new Schema<ICartItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
  },
  { _id: false },
);

const CartSchema = new Schema<ICartDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
    collection: "carts",
  },
);

// ─── Model ────────────────────────────────────────────────────────────────────

export const CartModel: Model<ICartDocument> =
  (mongoose.models.Cart as Model<ICartDocument>) ||
  mongoose.model<ICartDocument>("Cart", CartSchema);
