// ─── app/api/cart/route.ts ────────────────────────────────────────────────────
// GET  /api/cart  — Load populated cart items for authenticated user.
// POST /api/cart  — Overwrite/Sync database cart items for authenticated user.

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { CartModel } from "@/lib/models/cart.model";
import { ProductModel } from "@/lib/models/product.model";
import { z } from "zod";

const CartSyncSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid product ID",
      }),
      quantity: z.number().int().min(1),
    }),
  ),
});

// Helper to load and populate products for return
async function getPopulatedCart(userId: string) {
  const cartDoc = await CartModel.findOne({ userId }).populate({
    path: "items.productId",
    model: ProductModel,
  });

  if (!cartDoc) {
    return [];
  }

  // Filter out any items where the product was deleted
  const validItems = cartDoc.items.filter((item) => item.productId !== null);

  return validItems.map((item) => {
    const product = item.productId as unknown as {
      _id: mongoose.Types.ObjectId;
      name: string;
      slug: string;
      category: string;
      price: number;
      compareAtPrice?: number;
      images: { url: string; alt: string }[];
    };

    return {
      id: product._id.toString(),
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.images[0]?.url ?? "",
      imageAlt: product.images[0]?.alt ?? product.name,
      quantity: item.quantity,
    };
  });
}

// ─── GET /api/cart ────────────────────────────────────────────────────────────

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const items = await getPopulatedCart(session.user.id);
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("[GET /api/cart]", error);
    return NextResponse.json({ success: false, error: "Failed to load cart" }, { status: 500 });
  }
}

// ─── POST /api/cart ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: unknown = await req.json();
    const parsed = CartSyncSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid cart format", details: parsed.error.flatten() },
        { status: 422 },
      );
    }

    await connectToDatabase();

    const dbItems = parsed.data.items.map((item) => ({
      productId: new mongoose.Types.ObjectId(item.id),
      quantity: item.quantity,
    }));

    // Update or Insert the user's cart document
    await CartModel.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(session.user.id) },
      { items: dbItems },
      { upsert: true, new: true, runValidators: true },
    );

    // Return the updated populated list
    const populated = await getPopulatedCart(session.user.id);
    return NextResponse.json({ success: true, items: populated });
  } catch (error) {
    console.error("[POST /api/cart]", error);
    return NextResponse.json({ success: false, error: "Failed to sync cart" }, { status: 500 });
  }
}
