import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    // Attempt database connection
    await connectToDatabase();

    return NextResponse.json(
      {
        success: true,
        database: "connected",
        status: "ok",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Health check database connection failed:", error);

    return NextResponse.json(
      {
        success: false,
        database: "disconnected",
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
