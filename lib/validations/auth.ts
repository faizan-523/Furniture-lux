// ─── lib/validations/auth.ts ───────────────────────────────────────────────────
// Zod v4 schemas for authentication forms.
// Note: Zod v4 uses { error: "..." } instead of { message: "..." } in refinements.

import { z } from "zod";

// ─── Sign-Up Schema ───────────────────────────────────────────────────────────

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { error: "Name must be at least 2 characters." })
      .max(100, { error: "Name must be at most 100 characters." })
      .trim(),

    email: z
      .email({ error: "Please enter a valid email address." })
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters." })
      .max(100, { error: "Password must be at most 100 characters." })
      .regex(/[a-zA-Z]/, { error: "Password must contain at least one letter." })
      .regex(/[0-9]/, { error: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        error: "Password must contain at least one special character.",
      }),

    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof SignUpSchema>;

// ─── Sign-In Schema ───────────────────────────────────────────────────────────

export const SignInSchema = z.object({
  email: z
    .email({ error: "Please enter a valid email address." })
    .trim()
    .toLowerCase(),

  password: z.string().min(1, { error: "Password is required." }),
});

export type SignInInput = z.infer<typeof SignInSchema>;

// ─── Auth Form State (for useActionState) ─────────────────────────────────────

export type AuthFormState =
  | {
      success: true;
      message?: string;
    }
  | {
      success: false;
      message: string;
      fieldErrors?: Partial<Record<string, string[]>>;
    }
  | undefined;
