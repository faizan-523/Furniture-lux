// ─── app/shop/page.tsx ────────────────────────────────────────────────────────
// Shop catalog listing page — server component.
// Metadata definition and composition only.

import type { Metadata } from "next";
import { ShopHero, ShopContent } from "@/components/shop";
import { SHOP_PRODUCTS } from "@/data/shop";

export const metadata: Metadata = {
  title: "Shop All Pieces",
  description:
    "Explore the FurnitureLux catalog of handcrafted modern walnut furniture, sculptural bouclé seating, travertine coffee tables, and alabaster lighting.",
  keywords: [
    "buy luxury furniture",
    "modern walnut desk",
    "curved bouclé sofa",
    "designer travertine table",
    "mid-century dining table",
  ],
  openGraph: {
    title: "Shop All Handcrafted Pieces | FurnitureLux",
    description:
      "Timeless designer furniture collections crafted for comfort and luxury.",
  },
};

export default function ShopPage() {
  return (
    <>
      <ShopHero totalProducts={SHOP_PRODUCTS.length} />
      <ShopContent />
    </>
  );
}
