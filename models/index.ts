// ─── models/index.ts ──────────────────────────────────────────────────────────
// TypeScript interfaces / domain model shapes for FurnitureLux.
// These are data contracts — not ORM models.

// ─── Base ─────────────────────────────────────────────────────────────────────

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Image ────────────────────────────────────────────────────────────────────

export interface Image {
  url: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

// ─── Address ──────────────────────────────────────────────────────────────────

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// ─── Placeholder interfaces (to be expanded per feature) ─────────────────────

/** Placeholder — expand when building product features */
export interface Product extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: Image[];
  category: string;
  tags: string[];
  inStock: boolean;
}

/** Placeholder — expand when building category features */
export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  image?: Image;
  parentId?: string;
}

/** Placeholder — expand when building user/auth features */
export interface User extends BaseEntity {
  email: string;
  name: string;
  avatar?: string;
  addresses: Address[];
}
