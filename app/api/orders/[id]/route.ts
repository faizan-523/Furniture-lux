// ─── app/api/orders/[id]/route.ts ─────────────────────────────────────────────
// GET /api/orders/:id — Fetch details for a specific order.
// Restricts retrieval to the order owner.

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { OrderModel } from "@/lib/models/order.model";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: "Invalid order ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const order = await OrderModel.findById(id).lean();

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    // Security: make sure the order belongs to the requesting user
    if (order.userId.toString() !== session.user.id) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const normalized = {
      ...order,
      id: order._id.toString(),
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    };

    return NextResponse.json({ success: true, data: normalized });
  } catch (error) {
    console.error("[GET /api/orders/:id]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch order details" }, { status: 500 });
  }
}
