// ─── lib/models/order.model.ts ────────────────────────────────────────────────
// Mongoose schema for the Order collection.
// Stores complete order details, items, addresses, statuses, and pricing snapshots.

import mongoose, { Schema, type Document, type Model } from "mongoose";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface IOrder {
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: IAddress;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDocument extends IOrder, Document {
  _id: mongoose.Types.ObjectId;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const AddressSchema = new Schema<IAddress>(
  {
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: "US" },
  },
  { _id: false },
);

const OrderSchema = new Schema<IOrderDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [OrderItemSchema],
    shippingAddress: AddressSchema,
    paymentMethod: {
      type: String,
      required: true,
      default: "credit_card",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    shipping: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

// ─── Index ────────────────────────────────────────────────────────────────────

OrderSchema.index({ userId: 1 });
OrderSchema.index({ createdAt: -1 });

// ─── Model ────────────────────────────────────────────────────────────────────

export const OrderModel: Model<IOrderDocument> =
  (mongoose.models.Order as Model<IOrderDocument>) ||
  mongoose.model<IOrderDocument>("Order", OrderSchema);
