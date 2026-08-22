// ─── auth.ts ───────────────────────────────────────────────────────────────────
// NextAuth v5 (Auth.js) core configuration for FurnitureLux.
// Exports: handlers, auth, signIn, signOut

// Fix: @auth/core's createActionURL reads AUTH_URL first; if absent it falls
// back to the request's x-forwarded-host header. On Vercel this can be the
// deployment-specific URL (e.g. furniturelux-abc123.vercel.app) instead of the
// production alias, causing sign-out to redirect to a 404 DEPLOYMENT_NOT_FOUND.
// Setting AUTH_URL here guarantees createActionURL always uses the correct origin.
if (!process.env.AUTH_URL && process.env.NEXT_PUBLIC_SITE_URL) {
  process.env.AUTH_URL = process.env.NEXT_PUBLIC_SITE_URL;
}

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/lib/models/user.model";
import { SignInSchema } from "@/lib/validations/auth";
import type { NextAuthConfig } from "next-auth";

// ─── Config ───────────────────────────────────────────────────────────────────

const config: NextAuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  // ─── Providers ──────────────────────────────────────────────────────────────
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // 1. Validate the incoming credentials shape
        const parsed = SignInSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const normalizedEmail = email.toLowerCase().trim();

        // 2. Find the user — explicitly select the hashedPassword field
        await connectToDatabase();
        const user = await UserModel.findOne({ email: normalizedEmail }).select("+hashedPassword");
        if (!user) return null;

        // 3. Compare password
        const isValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isValid) return null;

        // 4. Return the minimal user object that gets stored in the JWT
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image ?? null,
          role: user.role,
        };
      },
    }),
  ],

  // ─── Session ────────────────────────────────────────────────────────────────
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  // ─── Pages ──────────────────────────────────────────────────────────────────
  pages: {
    signIn: "/sign-in",
    error: "/sign-in", // Redirect auth errors to sign-in page
  },

  // ─── Callbacks ──────────────────────────────────────────────────────────────
  callbacks: {
    /**
     * Persist custom fields (id, role) into the JWT token.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // `user.role` is added via module augmentation below
        token.role = (user as { role?: string }).role ?? "user";
      }
      return token;
    },

    /**
     * Expose custom fields from the JWT to the client session.
     */
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },

    /**
     * Route-level authorization.
     * Called by the middleware — allows the request if the user is authenticated
     * for protected routes, or always for public routes.
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ["/account", "/checkout"];
      const isProtected = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path),
      );

      if (isProtected && !isLoggedIn) return false; // Triggers redirect to signIn page
      return true;
    },
  },
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(config);
