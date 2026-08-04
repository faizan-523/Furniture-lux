// ─── app/(auth)/layout.tsx ─────────────────────────────────────────────────────
// Shared layout for all authentication pages (sign-in, sign-up).
// Renders a centered card with the brand logo above it.
// Does NOT include the global Header/Footer — auth pages are standalone.

import type { ReactNode } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { SITE_CONFIG } from "@/constants/site";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[--color-background] px-4 py-12">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[--color-brand-100] opacity-40 blur-3xl" />
        <div className="absolute -bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[--color-gold-300] opacity-20 blur-3xl" />
      </div>

      {/* Brand Logo */}
      <Link
        href={ROUTES.HOME}
        className="mb-8 flex items-center gap-2.5 transition-opacity hover:opacity-80"
        aria-label={`${SITE_CONFIG.name} — Home`}
      >
        <div className="flex size-9 items-center justify-center rounded-xl bg-[--color-primary] shadow-[--shadow-card]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[--color-primary-foreground]"
            aria-hidden="true"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <span className="font-serif text-2xl font-semibold tracking-tight text-[--color-foreground]">
          {SITE_CONFIG.name}
        </span>
      </Link>

      {/* Auth card */}
      <div className="w-full max-w-md animate-fade-in">
        <div className="surface rounded-2xl p-8 shadow-[--shadow-elevated]">
          {children}
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-6 text-center text-xs text-[--color-muted-foreground]">
        By continuing, you agree to our{" "}
        <Link
          href={ROUTES.TERMS_OF_SERVICE}
          className="underline underline-offset-2 hover:text-[--color-primary] transition-colors"
        >
          Terms
        </Link>{" "}
        &{" "}
        <Link
          href={ROUTES.PRIVACY_POLICY}
          className="underline underline-offset-2 hover:text-[--color-primary] transition-colors"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
