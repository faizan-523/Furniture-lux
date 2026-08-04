// ─── app/cart/page.tsx ────────────────────────────────────────────────────────
// Cart page — Server Component shell with metadata.
// All interaction logic lives in CartContent (client component).

import type { Metadata } from "next";
import { CartContent } from "@/components/cart";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review your selected FurnitureLux pieces, adjust quantities, apply promo codes, and proceed to checkout.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartContent />;
}
