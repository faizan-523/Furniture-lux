// ─── app/api/auth/[...nextauth]/route.ts ───────────────────────────────────────
// NextAuth v5 catch-all route handler.
// Handles all /api/auth/* endpoints (session, csrf, signin, signout, etc.)

export { GET, POST } from "@/auth";

export const runtime = "nodejs"; // Ensures Mongoose/bcrypt work (not Edge)
