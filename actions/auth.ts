// ─── actions/auth.ts ───────────────────────────────────────────────────────────
// NextAuth v5 + Mongoose server actions for authentication.
// registerUser — creates a new account
// loginUser    — signs in with credentials
// logoutUser   — signs out the current session

"use server";

import { redirect } from "next/navigation";

// Next.js redirect() throws internally — detect it by its digest so we can re-throw.
function isNextRedirect(e: unknown): boolean {
  return (
    e instanceof Error &&
    (e as Error & { digest?: string }).digest?.startsWith("NEXT_REDIRECT") === true
  );
}
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/lib/models/user.model";
import { SignUpSchema, SignInSchema } from "@/lib/validations/auth";
import type { AuthFormState } from "@/lib/validations/auth";
import { AuthError } from "next-auth";
import { ROUTES } from "@/constants/routes";

// ─── Register ─────────────────────────────────────────────────────────────────

/**
 * Create a new user account.
 * Used with React's `useActionState` hook in the sign-up form.
 */
export async function registerUser(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  // 1. Validate input
  const parsed = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Partial<
        Record<string, string[]>
      >,
    };
  }

  const { name, email, password } = parsed.data;

  try {
    await connectToDatabase();

    // 2. Check for duplicate email
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return {
        success: false,
        message: "An account with this email already exists.",
        fieldErrors: { email: ["This email is already registered."] },
      };
    }

    // 3. Hash password & create user
    const hashedPassword = await bcrypt.hash(password, 12);
    await UserModel.create({ name, email, hashedPassword });
  } catch (error) {
    console.error("[registerUser]", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  // 4. Auto sign-in after registration
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (isNextRedirect(error)) throw error;

    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Account created but sign-in failed. Please sign in manually.",
      };
    }
  }

  // 5. Redirect outside of try/catch (redirect throws internally)
  redirect(ROUTES.ACCOUNT);
}

// ─── Login ────────────────────────────────────────────────────────────────────

/**
 * Sign in an existing user with email + password.
 * Used with React's `useActionState` hook in the sign-in form.
 */
export async function loginUser(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  // 1. Validate input
  const parsed = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Partial<
        Record<string, string[]>
      >,
    };
  }

  const { email, password } = parsed.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Invalid email or password. Please try again.",
          };
        default:
          return {
            success: false,
            message: "Sign in failed. Please try again.",
          };
      }
    }
    console.error("[loginUser]", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  // Redirect outside of try/catch
  redirect(ROUTES.ACCOUNT);
}

// ─── Logout ───────────────────────────────────────────────────────────────────

/**
 * Sign out the current user and redirect to the home page.
 * Safe to call from a Server Action form submit.
 */
export async function logoutUser(): Promise<void> {
  await signOut({ redirectTo: ROUTES.HOME });
}
