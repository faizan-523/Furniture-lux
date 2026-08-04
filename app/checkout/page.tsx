// ─── app/checkout/page.tsx ────────────────────────────────────────────────────
// Checkout page. Auth guard is handled server-side; client state via useCart.

import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { CheckoutContent } from "@/components/checkout";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your FurnitureLux order with secure, white-glove delivery.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) {
    redirect(`${ROUTES.SIGN_IN}?callbackUrl=/checkout`);
  }

  return <CheckoutContent />;
}
