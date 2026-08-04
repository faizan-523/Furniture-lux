// ─── app/products/page.tsx ─────────────────────────────────────────────────────
// Products listing page — Server Component shell.

import type { Metadata } from "next";
import { ProductsHero, ProductsPageContent } from "@/components/products";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse the full FurnitureLux product catalogue — handcrafted luxury furniture for every room, filterable by category, stock status, and more.",
  openGraph: {
    title: "All Products | FurnitureLux",
    description: "Explore our curated catalogue of premium handcrafted furniture.",
  },
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductsPageContent />
    </>
  );
}
