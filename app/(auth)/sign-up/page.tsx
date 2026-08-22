// ─── app/(auth)/sign-up/page.tsx ───────────────────────────────────────────────
// Sign-up page — name, email, password, confirm password.
// Uses useActionState for progressive enhancement + server-side validation.

"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  CheckCircle2,
} from "lucide-react";
import { registerUser } from "@/actions/auth";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import type { AuthFormState } from "@/lib/validations/auth";

// ─── Component ────────────────────────────────────────────────────────────────

export default function SignUpPage() {
  const router = useRouter();
  const [state, action, isPending] = useActionState<AuthFormState, FormData>(
    registerUser,
    undefined,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Same as sign-in: after registerUser redirects, soft navigation leaves
  // SessionProvider stale. router.refresh() re-syncs it immediately.
  const prevPendingRef = useRef(false);
  useEffect(() => {
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
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-[--color-muted-foreground]">
          Join FurnitureLux and elevate your living space
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

      {/* Success banner (edge case if redirect fails) */}
      {state?.success === true && (
        <div
          role="status"
          className="mb-5 flex items-center gap-3 rounded-xl border border-green-300 bg-green-50 px-4 py-3"
        >
          <CheckCircle2
            className="size-4 shrink-0 text-green-600"
            aria-hidden="true"
          />
          <p className="text-sm text-green-700">
            Account created! Signing you in…
          </p>
        </div>
      )}

      {/* Form */}
      <form action={action} noValidate className="space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-name"
            className="block text-sm font-medium text-[--color-foreground]"
          >
            Full name
          </label>
          <div className="relative">
            <User
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[--color-muted-foreground]"
              aria-hidden="true"
            />
            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Jane Smith"
              aria-describedby={
                state?.success === false && state.fieldErrors?.name
                  ? "signup-name-error"
                  : undefined
              }
              aria-invalid={
                !!(state?.success === false && state.fieldErrors?.name?.length)
              }
              className={cn(
                "w-full rounded-xl border bg-[--color-background] py-2.5 pl-10 pr-4 text-sm text-[--color-foreground] placeholder:text-[--color-muted-foreground]",
                "outline-none transition-all duration-150",
                "focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-ring]/30",
                state?.success === false && state.fieldErrors?.name
                  ? "border-[--color-destructive] focus:ring-[--color-destructive]/20"
                  : "border-[--color-border]",
              )}
            />
          </div>
          {state?.success === false && state.fieldErrors?.name && (
            <p
              id="signup-name-error"
              role="alert"
              className="text-xs text-[--color-destructive]"
            >
              {state.fieldErrors.name[0]}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-email"
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
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              aria-describedby={
                state?.success === false && state.fieldErrors?.email
                  ? "signup-email-error"
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
              id="signup-email-error"
              role="alert"
              className="text-xs text-[--color-destructive]"
            >
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-password"
            className="block text-sm font-medium text-[--color-foreground]"
          >
            Password
          </label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[--color-muted-foreground]"
              aria-hidden="true"
            />
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              placeholder="Min. 8 characters"
              aria-describedby={cn(
                state?.success === false && state.fieldErrors?.password
                  ? "signup-password-error"
                  : "",
                "signup-password-hint",
              )}
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
          {state?.success === false && state.fieldErrors?.password ? (
            <ul
              id="signup-password-error"
              role="alert"
              className="space-y-0.5 text-xs text-[--color-destructive]"
            >
              {state.fieldErrors.password.map((err) => (
                <li key={err}>• {err}</li>
              ))}
            </ul>
          ) : (
            <p
              id="signup-password-hint"
              className="text-xs text-[--color-muted-foreground]"
            >
              Must be 8+ characters with a letter, number, and symbol.
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-confirm-password"
            className="block text-sm font-medium text-[--color-foreground]"
          >
            Confirm password
          </label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[--color-muted-foreground]"
              aria-hidden="true"
            />
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              placeholder="Repeat your password"
              aria-describedby={
                state?.success === false && state.fieldErrors?.confirmPassword
                  ? "signup-confirm-password-error"
                  : undefined
              }
              aria-invalid={
                !!(
                  state?.success === false &&
                  state.fieldErrors?.confirmPassword?.length
                )
              }
              className={cn(
                "w-full rounded-xl border bg-[--color-background] py-2.5 pl-10 pr-11 text-sm text-[--color-foreground] placeholder:text-[--color-muted-foreground]",
                "outline-none transition-all duration-150",
                "focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-ring]/30",
                state?.success === false && state.fieldErrors?.confirmPassword
                  ? "border-[--color-destructive] focus:ring-[--color-destructive]/20"
                  : "border-[--color-border]",
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {state?.success === false && state.fieldErrors?.confirmPassword && (
            <p
              id="signup-confirm-password-error"
              role="alert"
              className="text-xs text-[--color-destructive]"
            >
              {state.fieldErrors.confirmPassword[0]}
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
              <Loader2
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[--color-border]" />
        <span className="text-xs text-[--color-muted-foreground]">
          Already have an account?
        </span>
        <div className="h-px flex-1 bg-[--color-border]" />
      </div>

      {/* Sign-in link */}
      <Link
        href={ROUTES.SIGN_IN}
        className={cn(
          "flex w-full items-center justify-center rounded-xl border border-[--color-border] py-2.5 text-sm font-medium text-[--color-foreground]",
          "transition-all duration-150 hover:border-[--color-primary] hover:bg-[--color-muted] hover:text-[--color-primary]",
        )}
      >
        Sign in instead
      </Link>
    </>
  );
}
