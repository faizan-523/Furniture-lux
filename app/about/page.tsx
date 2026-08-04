// ─── app/about/page.tsx ───────────────────────────────────────────────────────
// Our story / about page — Server Component.
// High-end metadata layout composition.

import type { Metadata } from "next";
import {
  AboutHero,
  StorySection,
  ValuesSection,
  CraftsmenSection,
} from "@/components/about";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about the heritage of FurnitureLux. Discover our dedication to kiln-dried hardwood, organic travertine stone, and small European heritage workshops.",
  keywords: [
    "heirloom furniture makers",
    "solid walnut joinery",
    "FSC-certified timber",
    "handmade Italian upholstery",
  ],
  openGraph: {
    title: "Our Story & Heritage | FurnitureLux",
    description: "Designers of premium, sustainable heirloom furniture.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <CraftsmenSection />
    </>
  );
}
