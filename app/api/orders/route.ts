// ─── app/api/orders/route.ts ──────────────────────────────────────────────────
// GET  /api/orders — Fetch authenticated user's order history.
// POST /api/orders — Create a new order from current database cart items.

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { CartModel } from "@/lib/models/cart.model";
import { OrderModel } from "@/lib/models/order.model";
import { ProductModel } from "@/lib/models/product.model";
import { z } from "zod";

const AddressSchema = z.object({
  line1: z.string().min(1, "Street address is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required").default("US"),
});

const CheckoutSchema = z.object({
  shippingAddress: AddressSchema,
  paymentMethod: z.string().min(1, "Payment method is required").default("credit_card"),
});

// ─── GET /api/orders ──────────────────────────────────────────────────────────

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const orders = await OrderModel.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    const normalized = orders.map(({ _id, ...order }) => ({
      id: _id.toString(),
      ...order,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    }));

    return NextResponse.json({ success: true, data: normalized });
  } catch (error) {
    console.error("[GET /api/orders]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch order history" }, { status: 500 });
  }
}

// ─── POST /api/orders ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: unknown = await req.json();
    const parsed = CheckoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten() },
        { status: 422 },
      );
    }

    await connectToDatabase();

    // 1. Fetch user's cart
    const cart = await CartModel.findOne({ userId: session.user.id }).populate({
      path: "items.productId",
      model: ProductModel,
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ success: false, error: "Cart is empty" }, { status: 400 });
    }

    // Filter out deleted products
    const activeItems = cart.items.filter((item) => item.productId !== null);
    if (activeItems.length === 0) {
      return NextResponse.json({ success: false, error: "Cart contains invalid products" }, { status: 400 });
    }

    // 2. Prepare items snapshot & compute totals
    const orderItems = activeItems.map((item) => {
      const product = item.productId as unknown as {
        _id: mongoose.Types.ObjectId;
        name: string;
        price: number;
        images: { url: string }[];
      };
      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0]?.url ?? "",
      };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 2000 ? 0 : 195;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // 3. Create the Order
    const order = await OrderModel.create({
      userId: new mongoose.Types.ObjectId(session.user.id),
      items: orderItems,
      shippingAddress: parsed.data.shippingAddress,
      paymentMethod: parsed.data.paymentMethod,
      paymentStatus: "paid", // simulate instant card billing success
      status: "processing",
      subtotal,
      shipping,
      tax,
      total,
    });

    // 4. Clear user's Cart
    cart.items = [];
    await cart.save();

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/orders]", error);
    return NextResponse.json({ success: false, error: "Failed to place order" }, { status: 500 });
  }
}
