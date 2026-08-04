/**
 * Site-wide configuration constants.
 * Update these values to match your deployment environment.
 */
export const SITE_CONFIG = {
  name: "FurnitureLux",
  tagline: "Elevate Your Living Space",
  description:
    "Discover premium, handcrafted furniture curated for modern homes. From timeless classics to contemporary designs, FurnitureLux transforms every room into a sanctuary.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://furniturelux.com",
  ogImage: "/og-image.png",
  twitterHandle: "@furniturelux",
  locale: "en_US",
  themeColor: "#1a1a2e",

  // ─── Contact ──────────────────────────────────────────────────────────────
  contact: {
    email: "hello@furniturelux.com",
    phone: "+1 (800) 123-4567",
    address: "123 Design District, New York, NY 10001",
  },

  // ─── Social Links ─────────────────────────────────────────────────────────
  social: {
    instagram: "https://instagram.com/furniturelux",
    facebook: "https://facebook.com/furniturelux",
    pinterest: "https://pinterest.com/furniturelux",
    twitter: "https://twitter.com/furniturelux",
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
