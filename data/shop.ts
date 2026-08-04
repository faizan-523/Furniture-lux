// ─── data/shop.ts ─────────────────────────────────────────────────────────────
// Static product catalogue for the /shop page.
// Replace with API calls once the backend is wired up.

import type { Product } from "@/models";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "name-asc";

export interface ShopFilters {
  category: string;
  priceMin: number;
  priceMax: number;
  inStockOnly: boolean;
  tags: string[];
}

export interface SortConfig {
  label: string;
  value: SortOption;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const PRICE_RANGE = { min: 0, max: 5000 } as const;

export const SHOP_CATEGORIES: { label: string; value: string }[] = [
  { label: "All Rooms", value: "all" },
  { label: "Living Room", value: "living" },
  { label: "Dining Room", value: "dining" },
  { label: "Bedroom", value: "bedroom" },
  { label: "Lighting", value: "lighting" },
  { label: "Outdoor", value: "outdoor" },
  { label: "Workspace", value: "workspace" },
];

export const SORT_OPTIONS: SortConfig[] = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Name: A–Z", value: "name-asc" },
];

export const SHOP_TAGS: string[] = [
  "best-seller",
  "featured",
  "walnut",
  "bouclé",
  "travertine",
  "brass",
  "teak",
  "velvet",
  "leather",
  "oak",
];

export const PRODUCTS_PER_PAGE = 12;

// ─── Default filters ──────────────────────────────────────────────────────────

export const DEFAULT_FILTERS: ShopFilters = {
  category: "all",
  priceMin: PRICE_RANGE.min,
  priceMax: PRICE_RANGE.max,
  inStockOnly: false,
  tags: [],
};

// ─── Static product catalogue (20 items) ─────────────────────────────────────

export const SHOP_PRODUCTS: Product[] = [
  // ── Living ──────────────────────────────────────────────────────────────────
  {
    id: "shop-1",
    name: "Siena Walnut Lounge Chair",
    slug: "siena-walnut-lounge-chair",
    description:
      "Crafted from solid American Walnut and upholstered in luxurious bouclé. Ergonomically reclined for pure comfort.",
    price: 1249.0,
    compareAtPrice: 1599.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
        alt: "Siena Walnut Lounge Chair",
        width: 800,
        height: 800,
      },
      {
        url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
        alt: "Siena Chair detail",
        width: 800,
        height: 800,
      },
    ],
    category: "living",
    tags: ["featured", "best-seller", "walnut"],
    inStock: true,
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-01-10T00:00:00Z",
  },
  {
    id: "shop-2",
    name: "Aurelia Bouclé Curved Sofa",
    slug: "aurelia-boucle-curved-sofa",
    description:
      "Organic curves wrapped in extra-fine Italian bouclé with a low-profile brass base.",
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
        alt: "Sofa texture",
        width: 800,
        height: 800,
      },
    ],
    category: "living",
    tags: ["best-seller", "bouclé"],
    inStock: true,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
  {
    id: "shop-3",
    name: "Verona Travertine Coffee Table",
    slug: "verona-travertine-coffee-table",
    description:
      "Nesting pair sculpted from honed ivory travertine with unique natural pitting.",
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
    tags: ["travertine"],
    inStock: true,
    createdAt: "2026-02-01T00:00:00Z",
    updatedAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "shop-4",
    name: "Emilia Shearling Armchair",
    slug: "emilia-shearling-armchair",
    description:
      "Genuine Mongolian shearling with structural solid oak legs. The ultimate reading nook centrepiece.",
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
    tags: ["best-seller", "oak"],
    inStock: true,
    createdAt: "2026-02-10T00:00:00Z",
    updatedAt: "2026-02-10T00:00:00Z",
  },
  {
    id: "shop-5",
    name: "Porto Linen Floor Sofa",
    slug: "porto-linen-floor-sofa",
    description:
      "Low slung, modular 3-seater in stone-washed Belgian linen with beech legs.",
    price: 2199.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
        alt: "Porto Linen Floor Sofa",
        width: 800,
        height: 800,
      },
    ],
    category: "living",
    tags: ["featured"],
    inStock: true,
    createdAt: "2026-03-01T00:00:00Z",
    updatedAt: "2026-03-01T00:00:00Z",
  },

  // ── Dining ──────────────────────────────────────────────────────────────────
  {
    id: "shop-6",
    name: "Celine Oak Dining Table",
    slug: "celine-oak-dining-table",
    description:
      "Architectural fluted pedestal base in kiln-dried white oak. Seats up to 8.",
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
    tags: ["featured", "best-seller", "oak"],
    inStock: true,
    createdAt: "2026-01-20T00:00:00Z",
    updatedAt: "2026-01-20T00:00:00Z",
  },
  {
    id: "shop-7",
    name: "Porto Velvet Dining Chair",
    slug: "porto-velvet-dining-chair",
    description:
      "High-back dining chair in sage performance velvet with solid brass legs.",
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
    tags: ["velvet", "brass"],
    inStock: true,
    createdAt: "2026-02-05T00:00:00Z",
    updatedAt: "2026-02-05T00:00:00Z",
  },
  {
    id: "shop-8",
    name: "Milano Walnut Sideboard",
    slug: "milano-walnut-sideboard",
    description:
      "Solid walnut buffet with brass push-to-open drawers and recessed base.",
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
    tags: ["featured", "walnut", "brass"],
    inStock: true,
    createdAt: "2026-02-20T00:00:00Z",
    updatedAt: "2026-02-20T00:00:00Z",
  },

  // ── Bedroom ─────────────────────────────────────────────────────────────────
  {
    id: "shop-9",
    name: "Athena Velvet Platform Bed",
    slug: "athena-velvet-platform-bed",
    description:
      "Low-profile headboard in deep charcoal performance velvet. Pine slat base.",
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
    tags: ["featured", "velvet"],
    inStock: true,
    createdAt: "2026-01-25T00:00:00Z",
    updatedAt: "2026-01-25T00:00:00Z",
  },
  {
    id: "shop-10",
    name: "Lune Floating Nightstand",
    slug: "lune-floating-nightstand",
    description:
      "Wall-mounted nightstand in brushed brass with a single oak-fronted drawer.",
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
    tags: ["brass", "oak"],
    inStock: true,
    createdAt: "2026-02-14T00:00:00Z",
    updatedAt: "2026-02-14T00:00:00Z",
  },
  {
    id: "shop-11",
    name: "Serenova 6-Drawer Dresser",
    slug: "serenova-dresser",
    description:
      "White oak dresser with recessed brass pulls. Dovetail-jointed drawers.",
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
    tags: ["oak", "brass"],
    inStock: true,
    createdAt: "2026-03-05T00:00:00Z",
    updatedAt: "2026-03-05T00:00:00Z",
  },

  // ── Lighting ────────────────────────────────────────────────────────────────
  {
    id: "shop-12",
    name: "Lucent Alabaster Pendant",
    slug: "lucent-alabaster-pendant-lamp",
    description:
      "Hand-carved Spanish alabaster that diffuses a warm honeyed glow. Brushed brass canopy.",
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
    tags: ["featured", "best-seller", "brass"],
    inStock: true,
    createdAt: "2026-01-18T00:00:00Z",
    updatedAt: "2026-01-18T00:00:00Z",
  },
  {
    id: "shop-13",
    name: "Arc Brass Floor Lamp",
    slug: "arc-brass-floor-lamp",
    description:
      "Articulating matte-brass arc with a natural linen shade and marble weighted base.",
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
    tags: ["brass"],
    inStock: true,
    createdAt: "2026-02-28T00:00:00Z",
    updatedAt: "2026-02-28T00:00:00Z",
  },
  {
    id: "shop-14",
    name: "Ora Travertine Table Lamp",
    slug: "ora-travertine-table-lamp",
    description:
      "Sculptural travertine base topped with a pleated linen drum shade.",
    price: 319.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
        alt: "Ora Table Lamp",
        width: 800,
        height: 800,
      },
    ],
    category: "lighting",
    tags: ["travertine"],
    inStock: false,
    createdAt: "2026-03-12T00:00:00Z",
    updatedAt: "2026-03-12T00:00:00Z",
  },

  // ── Outdoor ─────────────────────────────────────────────────────────────────
  {
    id: "shop-15",
    name: "Majorca Teak Sun Lounger",
    slug: "majorca-teak-sun-lounger",
    description:
      "Grade-A plantation teak with mineral grey all-weather cushions. Adjustable backrest.",
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
    tags: ["teak"],
    inStock: false,
    createdAt: "2026-01-30T00:00:00Z",
    updatedAt: "2026-01-30T00:00:00Z",
  },
  {
    id: "shop-16",
    name: "Ibiza Teak Sectional",
    slug: "ibiza-teak-sectional",
    description:
      "5-piece weather-resistant teak sectional with dove-grey outdoor fabric.",
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
    tags: ["featured", "teak"],
    inStock: true,
    createdAt: "2026-03-18T00:00:00Z",
    updatedAt: "2026-03-18T00:00:00Z",
  },

  // ── Workspace ───────────────────────────────────────────────────────────────
  {
    id: "shop-17",
    name: "Scholar Walnut Writing Desk",
    slug: "scholar-walnut-writing-desk",
    description:
      "Solid walnut top with an integrated cable-management groove and brass-tipped legs.",
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
        alt: "Desk detail view",
        width: 800,
        height: 800,
      },
    ],
    category: "workspace",
    tags: ["featured", "walnut", "brass"],
    inStock: true,
    createdAt: "2026-02-22T00:00:00Z",
    updatedAt: "2026-02-22T00:00:00Z",
  },
  {
    id: "shop-18",
    name: "Forma Cognac Task Chair",
    slug: "forma-task-chair",
    description:
      "Ergonomic task chair upholstered in full-grain cognac leather with polished aluminium base.",
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
    tags: ["leather"],
    inStock: true,
    createdAt: "2026-03-08T00:00:00Z",
    updatedAt: "2026-03-08T00:00:00Z",
  },
  {
    id: "shop-19",
    name: "Modulo Oak Bookcase",
    slug: "modulo-oak-bookcase",
    description:
      "Modular freestanding bookcase in white-oiled oak with adjustable shelves.",
    price: 1149.0,
    compareAtPrice: 1349.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?q=80&w=800&auto=format&fit=crop",
        alt: "Modulo Oak Bookcase",
        width: 800,
        height: 800,
      },
    ],
    category: "workspace",
    tags: ["oak"],
    inStock: true,
    createdAt: "2026-03-25T00:00:00Z",
    updatedAt: "2026-03-25T00:00:00Z",
  },
  {
    id: "shop-20",
    name: "Atelier Leather Desk Mat",
    slug: "atelier-leather-desk-mat",
    description:
      "Full-grain vegetable-tanned leather desk mat with hand-stitched edge.",
    price: 189.0,
    images: [
      {
        url: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=800&auto=format&fit=crop",
        alt: "Atelier Leather Desk Mat",
        width: 800,
        height: 800,
      },
    ],
    category: "workspace",
    tags: ["leather"],
    inStock: true,
    createdAt: "2026-04-01T00:00:00Z",
    updatedAt: "2026-04-01T00:00:00Z",
  },
];
