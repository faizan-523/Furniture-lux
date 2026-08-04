// ─── proxy.ts ─────────────────────────────────────────────────────────────────
// Next.js Proxy — wraps the NextAuth `auth` function for route protection.
// In Next.js 16, this replaces the deprecated "middleware" convention.

export { auth as proxy } from "@/auth";

// ─── Matcher ──────────────────────────────────────────────────────────────────
// Run proxy on all routes EXCEPT static files, images, and the NextAuth API.
export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
