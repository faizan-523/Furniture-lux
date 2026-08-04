// ─── app/api/account/route.ts ─────────────────────────────────────────────────
// GET  /api/account — Return current user profile (no hashedPassword)
// PUT  /api/account — Update name (and optionally password)

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/lib/models/user.model";
import { z } from "zod";

const UpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .trim()
    .optional(),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
    .optional(),
});

// ─── GET /api/account ─────────────────────────────────────────────────────────

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const user = await UserModel.findById(session.user.id).lean();
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image ?? null,
        createdAt: user.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("[GET /api/account]", error);
    return NextResponse.json({ success: false, error: "Failed to load profile" }, { status: 500 });
  }
}

// ─── PUT /api/account ─────────────────────────────────────────────────────────

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: unknown = await req.json();
    const parsed = UpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten() },
        { status: 422 },
      );
    }

    const { name, currentPassword, newPassword } = parsed.data;

    await connectToDatabase();

    const updates: Record<string, string> = {};

    if (name) updates.name = name;

    // Password change — requires currentPassword verification
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { success: false, error: "Current password is required to set a new password" },
          { status: 400 },
        );
      }
      const user = await UserModel.findById(session.user.id).select("+hashedPassword");
      if (!user) {
        return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
      }
      const isValid = await bcrypt.compare(currentPassword, user.hashedPassword);
      if (!isValid) {
        return NextResponse.json(
          { success: false, error: "Current password is incorrect" },
          { status: 400 },
        );
      }
      updates.hashedPassword = await bcrypt.hash(newPassword, 12);
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ success: false, error: "No changes provided" }, { status: 400 });
    }

    const updated = await UserModel.findByIdAndUpdate(
      session.user.id,
      updates,
      { new: true, runValidators: true },
    ).lean();

    if (!updated) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: updated._id.toString(),
        name: updated.name,
        email: updated.email,
        role: updated.role,
      },
    });
  } catch (error) {
    console.error("[PUT /api/account]", error);
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 });
  }
}
