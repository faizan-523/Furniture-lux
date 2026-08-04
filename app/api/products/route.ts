// ─── app/api/products/route.ts ─────────────────────────────────────────────────
// GET  /api/products — list products (with filtering, sorting, pagination)
// POST /api/products — create a new product

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/lib/models/product.model";
import { z } from "zod";

// ─── Validation schemas ────────────────────────────────────────────────────────

const CreateProductSchema = z.object({
  name: z.string().min(2).max(200).trim(),
  slug: z
    .string()
    .min(2)
    .max(200)
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/),
  description: z.string().min(1).max(5000).trim(),
  price: z.number().min(0),
  compareAtPrice: z.number().min(0).optional().nullable(),
  images: z
    .array(
      z.object({
        url: z.string().url(),
        alt: z.string().min(1),
        width: z.number().int().positive().default(800),
        height: z.number().int().positive().default(800),
        blurDataURL: z.string().optional().nullable(),
      }),
    )
    .min(1),
  category: z.enum(["living", "dining", "bedroom", "lighting", "outdoor", "workspace"]),
  tags: z.array(z.string()).default([]),
  stock: z.number().int().min(0).default(0),
  featured: z.boolean().default(false),
});

// ─── GET /api/products ─────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const inStock = searchParams.get("inStock");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") ?? "createdAt";
    const order = searchParams.get("order") === "asc" ? 1 : -1;
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? "20")));

    // Build filter
    const filter: Record<string, unknown> = {};
    if (category && category !== "all") filter.category = category;
    if (featured === "true") filter.featured = true;
    if (inStock === "true") filter.inStock = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Allowed sort fields
    const allowedSort = ["createdAt", "price", "name", "featured"];
    const sortField = allowedSort.includes(sortBy) ? sortBy : "createdAt";

    const [products, total] = await Promise.all([
      ProductModel.find(filter)
        .sort({ [sortField]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      ProductModel.countDocuments(filter),
    ]);

    // Normalize _id → id for client consumption
    const data = products.map(({ _id, ...p }) => ({ id: _id.toString(), ...p }));

    return NextResponse.json({
      success: true,
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// ─── POST /api/products ────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ success: false, error: "Forbidden: Admins only" }, { status: 403 });
  }

  try {
    await connectToDatabase();

    const body: unknown = await req.json();
    const parsed = CreateProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten() },
        { status: 422 },
      );
    }

    // Strip nulls — Mongoose schema uses undefined, not null, for optional fields
    const createData = {
      ...parsed.data,
      compareAtPrice: parsed.data.compareAtPrice ?? undefined,
      inStock: parsed.data.stock > 0,
      images: parsed.data.images.map((img) => ({
        ...img,
        blurDataURL: img.blurDataURL ?? undefined,
      })),
    };

    const inserted = await ProductModel.create(createData);
    const doc = await ProductModel.findById(inserted._id).lean();
    if (!doc) throw new Error("Document not found after insert");

    const { _id, ...rest } = doc as unknown as { _id: mongoose.Types.ObjectId } & Record<string, unknown>;
    return NextResponse.json(
      { success: true, data: { id: _id.toString(), ...rest } },
      { status: 201 },
    );

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
    console.error("[POST /api/products]", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 },
    );
  }
}
