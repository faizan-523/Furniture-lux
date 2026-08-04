// ─── data/collections.ts ──────────────────────────────────────────────────────
// Static data for the Collections page.
// Each CollectionEntry enriches the base Category model with curated content.

import type { Product } from "@/models";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CollectionTheme =
  | "all"
  | "living"
  | "dining"
  | "bedroom"
  | "lighting"
  | "outdoor"
  | "workspace";

export interface CollectionEntry {
  id: string;
  slug: CollectionTheme;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  cardImage: string;
  accentColor: string;
  productCount: number;
  season?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  tags: string[];
}

export interface CollectionStat {
  value: string;
  label: string;
}

// ─── Collections ─────────────────────────────────────────────────────────────

export const COLLECTIONS: CollectionEntry[] = [
  {
    id: "col-living",
    slug: "living",
    name: "Living Room",
    tagline: "Where life unfolds.",
    description:
      "Sculptural sofas with organic curves, hand-hewn walnut lounge chairs, and honed travertine table sets — all curated to transform your living space into an artful sanctuary.",
    heroImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2400&auto=format&fit=crop",
    cardImage:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&auto=format&fit=crop",
    accentColor: "oklch(0.42 0.08 55)",
    productCount: 48,
    isFeatured: true,
    tags: ["sofas", "chairs", "tables", "shelving"],
  },
  {
    id: "col-dining",
    slug: "dining",
    name: "Dining Room",
    tagline: "Set the scene for connection.",
    description:
      "Solid white-oak tables with architectural pedestal bases, upholstered high-back chairs, and elegant walnut sideboards crafted for conversations that flow into the night.",
    heroImage:
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=2400&auto=format&fit=crop",
    cardImage:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop",
    accentColor: "oklch(0.38 0.06 55)",
    productCount: 32,
    isFeatured: true,
    tags: ["dining tables", "chairs", "sideboards", "bar carts"],
  },
  {
    id: "col-bedroom",
    slug: "bedroom",
    name: "Bedroom",
    tagline: "Drift into pure luxury.",
    description:
      "Platform beds wrapped in performance velvet, floating nightstands in brushed brass, and refined dressers — designed for the ultimate restorative retreat.",
    heroImage:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2400&auto=format&fit=crop",
    cardImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    accentColor: "oklch(0.28 0.04 55)",
    productCount: 27,
    tags: ["beds", "nightstands", "wardrobes", "benches"],
  },
  {
    id: "col-lighting",
    slug: "lighting",
    name: "Lighting",
    tagline: "Cast the perfect atmosphere.",
    description:
      "Alabaster pendants that diffuse honeyed warmth, architectural floor lamps in matte brass, and statement wall sconces — illuminating your space with quiet drama.",
    heroImage:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2400&auto=format&fit=crop",
    cardImage:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop",
    accentColor: "oklch(0.55 0.12 80)",
    productCount: 21,
    isNew: true,
    season: "AW 2026",
    tags: ["pendants", "floor lamps", "table lamps", "sconces"],
  },
  {
    id: "col-outdoor",
    slug: "outdoor",
    name: "Outdoor Lounge",
    tagline: "Luxury beyond four walls.",
    description:
      "Grade-A plantation teak sectionals, weather-resistant bouclé lounge beds, and powder-coated steel side tables — elevating your terrace into a Mediterranean escape.",
    heroImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2400&auto=format&fit=crop",
    cardImage:
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=1200&auto=format&fit=crop",
    accentColor: "oklch(0.50 0.10 140)",
    productCount: 18,
    season: "SS 2026",
    tags: ["sectionals", "sun loungers", "dining sets", "planters"],
  },
  {
    id: "col-workspace",
    slug: "workspace",
    name: "Workspace",
    tagline: "Designed for deep focus.",
    description:
      "Solid walnut writing desks with hidden cable management, ergonomic upholstered task chairs, and modular shelving systems — productivity meets quiet elegance.",
    heroImage:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=2400&auto=format&fit=crop",
    cardImage:
      "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?q=80&w=1200&auto=format&fit=crop",
    accentColor: "oklch(0.35 0.05 260)",
    productCount: 15,
    isNew: true,
    season: "AW 2026",
    tags: ["desks", "chairs", "shelving", "accessories"],
  },
];

// ─── Featured hero collection ─────────────────────────────────────────────────

export const COLLECTIONS_HERO = {
  eyebrow: "2026 Catalogue",
  title: "Curated Collections",
  subtitle:
    "Every room. Every mood. Every detail — thoughtfully crafted to build living spaces that endure beyond trends.",
  heroImage:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2400&auto=format&fit=crop",
};

// ─── Stats strip ──────────────────────────────────────────────────────────────

export const COLLECTION_STATS: CollectionStat[] = [
  { value: "6", label: "Curated Rooms" },
  { value: "160+", label: "Bespoke Pieces" },
  { value: "25+", label: "Artisan Makers" },
  { value: "15", label: "Years of Heritage" },
];

// ─── Filter tabs ──────────────────────────────────────────────────────────────

export const COLLECTION_FILTERS: { label: string; value: CollectionTheme }[] = [
  { label: "All Collections", value: "all" },
  { label: "Living Room", value: "living" },
  { label: "Dining Room", value: "dining" },
  { label: "Bedroom", value: "bedroom" },
  { label: "Lighting", value: "lighting" },
  { label: "Outdoor", value: "outdoor" },
  { label: "Workspace", value: "workspace" },
];

// ─── Curated products per collection ─────────────────────────────────────────

export const COLLECTION_PRODUCTS: Record<string, Product[]> = {
  living: [
    {
      id: "prod-1",
      name: "Siena Walnut Lounge Chair",
      slug: "siena-walnut-lounge-chair",
      description: "Ergonomically reclined walnut-framed bouclé chair.",
      price: 1249.0,
      compareAtPrice: 1599.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
          alt: "Siena Lounge Chair",
          width: 800,
          height: 800,
        },
        {
          url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
          alt: "Siena Lounge Chair Detail",
          width: 800,
          height: 800,
        },
      ],
      category: "living",
      tags: ["featured", "best-seller"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-2",
      name: "Aurelia Bouclé Curved Sofa",
      slug: "aurelia-boucle-curved-sofa",
      description: "Sculptural low-profile sofa in Italian bouclé.",
      price: 3499.0,
      compareAtPrice: 4200.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
          alt: "Aurelia Curved Sofa",
          width: 800,
          height: 800,
        },
        {
          url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
          alt: "Aurelia Sofa Texture",
          width: 800,
          height: 800,
        },
      ],
      category: "living",
      tags: ["best-seller"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-3",
      name: "Verona Travertine Coffee Table",
      slug: "verona-travertine-coffee-table",
      description: "Honed ivory travertine nesting tables.",
      price: 899.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
          alt: "Verona Travertine Tables",
          width: 800,
          height: 800,
        },
      ],
      category: "living",
      tags: ["living"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-6",
      name: "Emilia Shearling Armchair",
      slug: "emilia-shearling-armchair",
      description: "Genuine Mongolian shearling with solid oak legs.",
      price: 949.0,
      compareAtPrice: 1199.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
          alt: "Emilia Shearling Armchair",
          width: 800,
          height: 800,
        },
      ],
      category: "living",
      tags: ["best-seller"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  dining: [
    {
      id: "prod-4",
      name: "Celine Oak Dining Table",
      slug: "celine-oak-dining-table",
      description: "Fluted pedestal kiln-dried white oak table, seats 8.",
      price: 2199.0,
      compareAtPrice: 2499.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=800&auto=format&fit=crop",
          alt: "Celine Oak Dining Table",
          width: 800,
          height: 800,
        },
      ],
      category: "dining",
      tags: ["featured", "best-seller"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-d2",
      name: "Porto Velvet Dining Chair",
      slug: "porto-velvet-dining-chair",
      description: "High-back dining chair in sage performance velvet.",
      price: 449.0,
      compareAtPrice: 549.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800&auto=format&fit=crop",
          alt: "Porto Velvet Dining Chair",
          width: 800,
          height: 800,
        },
      ],
      category: "dining",
      tags: ["dining"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-d3",
      name: "Milano Walnut Sideboard",
      slug: "milano-walnut-sideboard",
      description: "Solid walnut buffet with brass push-to-open drawers.",
      price: 1799.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
          alt: "Milano Walnut Sideboard",
          width: 800,
          height: 800,
        },
      ],
      category: "dining",
      tags: ["featured"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  bedroom: [
    {
      id: "prod-7",
      name: "Athena Velvet Platform Bed",
      slug: "athena-velvet-platform-bed",
      description: "Low-profile charcoal velvet headboard, pine slat base.",
      price: 1899.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
          alt: "Athena Platform Bed",
          width: 800,
          height: 800,
        },
      ],
      category: "bedroom",
      tags: ["bedroom", "featured"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-b2",
      name: "Lune Floating Nightstand",
      slug: "lune-floating-nightstand",
      description: "Wall-mounted nightstand in brushed brass with oak drawer.",
      price: 349.0,
      compareAtPrice: 419.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop",
          alt: "Lune Floating Nightstand",
          width: 800,
          height: 800,
        },
      ],
      category: "bedroom",
      tags: ["bedroom"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-b3",
      name: "Serenova Dresser",
      slug: "serenova-dresser",
      description: "6-drawer white oak dresser with recessed brass handles.",
      price: 1299.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
          alt: "Serenova Dresser",
          width: 800,
          height: 800,
        },
      ],
      category: "bedroom",
      tags: ["bedroom"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  lighting: [
    {
      id: "prod-5",
      name: "Lucent Alabaster Pendant Lamp",
      slug: "lucent-alabaster-pendant-lamp",
      description: "Spanish alabaster pendant with brushed brass accents.",
      price: 489.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop",
          alt: "Lucent Alabaster Pendant",
          width: 800,
          height: 800,
        },
      ],
      category: "lighting",
      tags: ["featured", "best-seller"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-l2",
      name: "Arc Brass Floor Lamp",
      slug: "arc-brass-floor-lamp",
      description: "Matte brass arc lamp with articulating arm and linen shade.",
      price: 629.0,
      compareAtPrice: 799.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=800&auto=format&fit=crop",
          alt: "Arc Brass Floor Lamp",
          width: 800,
          height: 800,
        },
      ],
      category: "lighting",
      tags: ["lighting"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  outdoor: [
    {
      id: "prod-8",
      name: "Majorca Teak Sun Lounger",
      slug: "majorca-teak-sun-lounger",
      description: "Grade-A teak lounger with mineral grey all-weather cushion.",
      price: 799.0,
      compareAtPrice: 949.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=800&auto=format&fit=crop",
          alt: "Majorca Teak Sun Lounger",
          width: 800,
          height: 800,
        },
      ],
      category: "outdoor",
      tags: ["outdoor"],
      inStock: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-o2",
      name: "Ibiza Teak Sectional",
      slug: "ibiza-teak-sectional",
      description: "5-piece weather-resistant teak outdoor sectional.",
      price: 4299.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop",
          alt: "Ibiza Teak Sectional",
          width: 800,
          height: 800,
        },
      ],
      category: "outdoor",
      tags: ["outdoor", "featured"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  workspace: [
    {
      id: "prod-w1",
      name: "Scholar Walnut Writing Desk",
      slug: "scholar-walnut-writing-desk",
      description: "Solid walnut desk with integrated cable management groove.",
      price: 1499.0,
      compareAtPrice: 1799.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=800&auto=format&fit=crop",
          alt: "Scholar Walnut Writing Desk",
          width: 800,
          height: 800,
        },
        {
          url: "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?q=80&w=800&auto=format&fit=crop",
          alt: "Scholar Desk Detail",
          width: 800,
          height: 800,
        },
      ],
      category: "workspace",
      tags: ["workspace", "featured"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-w2",
      name: "Forma Task Chair",
      slug: "forma-task-chair",
      description: "Ergonomic task chair in cognac full-grain leather.",
      price: 899.0,
      images: [
        {
          url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
          alt: "Forma Task Chair",
          width: 800,
          height: 800,
        },
      ],
      category: "workspace",
      tags: ["workspace"],
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};
