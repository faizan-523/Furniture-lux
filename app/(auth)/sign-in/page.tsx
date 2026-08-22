// ─── app/(auth)/sign-in/page.tsx ───────────────────────────────────────────────
// Sign-in page — email + password credentials form.
// Uses useActionState for progressive enhancement + server-side validation.

"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { loginUser } from "@/actions/auth";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import type { AuthFormState } from "@/lib/validations/auth";

// ─── Metadata (Note: metadata cannot be exported from Client Components) ──────
// SEO is handled by the parent layout or a generateMetadata in a server wrapper.

// ─── Component ────────────────────────────────────────────────────────────────

export default function SignInPage() {
  const router = useRouter();
  const [state, action, isPending] = useActionState<AuthFormState, FormData>(
    loginUser,
    undefined,
  );
  const [showPassword, setShowPassword] = useState(false);

  // After a successful login the server action calls redirect(), which triggers
  // a soft navigation (no full reload). SessionProvider stays mounted and won't
  // re-fetch automatically. router.refresh() forces Next.js to re-fetch server
  // components AND re-sync the SessionProvider so the header updates immediately.
  const prevPendingRef = useRef(false);
  useEffect(() => {
    // Transition: was pending → now not pending and no error state returned
    // means the server action redirected (success path).
    if (prevPendingRef.current && !isPending && !state) {
      router.refresh();
    }
    prevPendingRef.current = isPending;
  }, [isPending, state, router]);


  return (
    <>
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="font-serif text-2xl font-semibold text-[--color-foreground]">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-[--color-muted-foreground]">
          Sign in to your FurnitureLux account
        </p>
      </div>

      {/* Global error banner */}
      {state?.success === false && !state.fieldErrors && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-xl border border-[--color-destructive]/30 bg-[--color-destructive]/8 px-4 py-3"
        >
          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[--color-destructive] text-[--color-destructive-foreground] text-[10px] font-bold">
            !
          </span>
          <p className="text-sm text-[--color-destructive]">{state.message}</p>
        </div>
      )}

      {/* Form */}
      <form action={action} noValidate className="space-y-5">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="signin-email"
            className="block text-sm font-medium text-[--color-foreground]"
          >
            Email address
          </label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[--color-muted-foreground]"
              aria-hidden="true"
            />
            <input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              aria-describedby={
                state?.success === false && state.fieldErrors?.email
                  ? "signin-email-error"
                  : undefined
              }
              aria-invalid={
                !!(
                  state?.success === false && state.fieldErrors?.email?.length
                )
              }
              className={cn(
                "w-full rounded-xl border bg-[--color-background] py-2.5 pl-10 pr-4 text-sm text-[--color-foreground] placeholder:text-[--color-muted-foreground]",
                "outline-none transition-all duration-150",
                "focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-ring]/30",
                state?.success === false && state.fieldErrors?.email
                  ? "border-[--color-destructive] focus:ring-[--color-destructive]/20"
                  : "border-[--color-border]",
              )}
            />
          </div>
          {state?.success === false && state.fieldErrors?.email && (
            <p
              id="signin-email-error"
              role="alert"
              className="text-xs text-[--color-destructive]"
            >
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="signin-password"
              className="block text-sm font-medium text-[--color-foreground]"
            >
              Password
            </label>
            {/* Forgot password (future feature) */}
            <span className="text-xs text-[--color-muted-foreground]">
              Forgot password?{" "}
              <span className="text-[--color-primary] opacity-50 cursor-not-allowed select-none">
                Coming soon
              </span>
            </span>
          </div>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[--color-muted-foreground]"
              aria-hidden="true"
            />
            <input
              id="signin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="••••••••"
              aria-describedby={
                state?.success === false && state.fieldErrors?.password
                  ? "signin-password-error"
                  : undefined
              }
              aria-invalid={
                !!(
                  state?.success === false &&
                  state.fieldErrors?.password?.length
                )
              }
              className={cn(
                "w-full rounded-xl border bg-[--color-background] py-2.5 pl-10 pr-11 text-sm text-[--color-foreground] placeholder:text-[--color-muted-foreground]",
                "outline-none transition-all duration-150",
                "focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-ring]/30",
                state?.success === false && state.fieldErrors?.password
                  ? "border-[--color-destructive] focus:ring-[--color-destructive]/20"
                  : "border-[--color-border]",
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors"
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {state?.success === false && state.fieldErrors?.password && (
            <p
              id="signin-password-error"
              role="alert"
              className="text-xs text-[--color-destructive]"
            >
              {state.fieldErrors.password[0]}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isPending}
          className="mt-2"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[--color-border]" />
        <span className="text-xs text-[--color-muted-foreground]">
          New to FurnitureLux?
        </span>
        <div className="h-px flex-1 bg-[--color-border]" />
      </div>

      {/* Sign-up link */}
      <Link
        href={ROUTES.SIGN_UP}
        className={cn(
          "flex w-full items-center justify-center rounded-xl border border-[--color-border] py-2.5 text-sm font-medium text-[--color-foreground]",
          "transition-all duration-150 hover:border-[--color-primary] hover:bg-[--color-muted] hover:text-[--color-primary]",
        )}
      >
        Create an account
      </Link>
    </>
  );
}
