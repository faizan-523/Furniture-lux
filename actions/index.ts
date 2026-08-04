// ─── actions/index.ts ─────────────────────────────────────────────────────────
// Next.js Server Actions.
// Each action is a "use server" async function that can be called from Client Components.

"use server";

import { type FormState } from "@/types";

/**
 * Example contact form server action.
 * Replace the body with your actual form submission logic.
 */
export async function submitContactForm(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Basic validation
  if (!name || !email || !message) {
    return {
      status: "error",
      error: "All fields are required.",
      fieldErrors: {
        ...(!name && { name: ["Name is required"] }),
        ...(!email && { email: ["Email is required"] }),
        ...(!message && { message: ["Message is required"] }),
      },
    };
  }

  // TODO: Implement actual form submission (email service, CRM, etc.)
  // await sendEmail({ name, email, message });

  return {
    status: "success",
    data: { name, email },
  };
}
