// ─── app/collections/page.tsx ─────────────────────────────────────────────────
// Collections listing page — server component, metadata-driven.
// Composition only; all layout and logic live in dedicated components.

import type { Metadata } from "next";
import {
  CollectionsHero,
  CollectionStatsStrip,
  CollectionGrid,
  CollectionProductsSection,
} from "@/components/collections";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore FurnitureLux curated furniture collections — Living Room, Dining, Bedroom, Lighting, Outdoor, and Workspace. Handcrafted pieces for every room.",
  keywords: [
    "furniture collections",
    "luxury living room furniture",
    "dining room sets",
    "bedroom furniture",
    "designer lighting",
    "outdoor lounge furniture",
    "workspace furniture",
  ],
  openGraph: {
    title: "Collections | FurnitureLux",
    description:
      "Curated luxury furniture collections for every room in your home.",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CollectionsPage() {
  return (
    <>
      <CollectionsHero />
      <CollectionStatsStrip />
      <CollectionGrid />
      <CollectionProductsSection />
    </>
  );
}
