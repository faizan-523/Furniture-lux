// ─── app/api/products/[id]/route.ts ───────────────────────────────────────────
// GET    /api/products/:id — fetch single product by MongoDB _id
// PUT    /api/products/:id — update a product
// DELETE /api/products/:id — delete a product

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/lib/models/product.model";
import { z } from "zod";

type RouteContext = { params: Promise<{ id: string }> };

// ─── Validation ───────────────────────────────────────────────────────────────

const UpdateProductSchema = z.object({
  name: z.string().min(2).max(200).trim().optional(),
  slug: z
    .string()
    .min(2)
    .max(200)
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  description: z.string().min(1).max(5000).trim().optional(),
  price: z.number().min(0).optional(),
  compareAtPrice: z.number().min(0).nullable().optional(),
  images: z
    .array(
      z.object({
        url: z.string().url(),
        alt: z.string().min(1),
        width: z.number().int().positive().default(800),
        height: z.number().int().positive().default(800),
        blurDataURL: z.string().nullable().optional(),
      }),
    )
    .min(1)
    .optional(),
  category: z
    .enum(["living", "dining", "bedroom", "lighting", "outdoor", "workspace"])
    .optional(),
  tags: z.array(z.string()).optional(),
  stock: z.number().int().min(0).optional(),
  featured: z.boolean().optional(),
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

function toClientProduct(doc: mongoose.Document & { _id: mongoose.Types.ObjectId }) {
  const obj = doc.toObject();
  const { _id, ...rest } = obj;
  return { id: (_id as mongoose.Types.ObjectId).toString(), ...rest };
}

// ─── GET /api/products/:id ────────────────────────────────────────────────────

export async function GET(_req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const product = await ProductModel.findById(id);
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: toClientProduct(product) });
  } catch (error) {
    console.error("[GET /api/products/:id]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 });
  }
}

// ─── PUT /api/products/:id ────────────────────────────────────────────────────

export async function PUT(req: NextRequest, ctx: RouteContext) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ success: false, error: "Forbidden: Admins only" }, { status: 403 });
  }

  const { id } = await ctx.params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const body: unknown = await req.json();
    const parsed = UpdateProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten() },
        { status: 422 },
      );
    }

    // Sync inStock when stock is provided
    const updateData: Record<string, unknown> = { ...parsed.data };
    if (typeof updateData.stock === "number") {
      updateData.inStock = (updateData.stock as number) > 0;
    }

    const product = await ProductModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: toClientProduct(product) });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: number }).code === 11000
    ) {
      return NextResponse.json(
        { success: false, error: "A product with this slug already exists" },
        { status: 409 },
      );
    }
    console.error("[PUT /api/products/:id]", error);
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
  }
}

// ─── DELETE /api/products/:id ─────────────────────────────────────────────────

export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ success: false, error: "Forbidden: Admins only" }, { status: 403 });
  }

  const { id } = await ctx.params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("[DELETE /api/products/:id]", error);
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
  }
}
