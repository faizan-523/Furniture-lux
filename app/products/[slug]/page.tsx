// ─── app/products/[slug]/page.tsx ─────────────────────────────────────────────
// Product detail page — Server Component.
// Queries MongoDB first, then falls back to static catalogue data.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/lib/models/product.model";
import { ProductDetail } from "@/components/products";
import { type Product } from "@/models";
import { SHOP_PRODUCTS } from "@/data/shop";
import { HOMEPAGE_PRODUCTS } from "@/data/home";

type Props = { params: Promise<{ slug: string }> };

// ─── Combined static catalogue (deduplicated by slug) ─────────────────────────

const STATIC_PRODUCTS: Product[] = [
  ...SHOP_PRODUCTS,
  ...HOMEPAGE_PRODUCTS.filter(
    (p) => !SHOP_PRODUCTS.some((s) => s.slug === p.slug),
  ),
];

// ─── Server-side product fetch ────────────────────────────────────────────────

async function getProductBySlug(slug: string): Promise<(Product & { stock: number; featured: boolean }) | null> {
  // 1. Try MongoDB first
  try {
    await connectToDatabase();
    const doc = await ProductModel.findOne({ slug }).lean();
    if (doc) {
      const { _id, createdAt, updatedAt, ...rest } = doc;
      return {
        ...rest,
        id: _id.toString(),
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
      } as Product & { stock: number; featured: boolean };
    }
  } catch {
    // DB unavailable — fall through to static data
  }

  // 2. Fall back to static catalogue data
  const staticProduct = STATIC_PRODUCTS.find((p) => p.slug === slug);
  if (staticProduct) {
    return {
      ...staticProduct,
      stock: staticProduct.inStock ? 10 : 0,
      featured: staticProduct.tags?.includes("featured") ?? false,
    };
  }

  return null;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | FurnitureLux`,
      description: product.description.slice(0, 160),
      images: product.images[0]
        ? [{ url: product.images[0].url, alt: product.images[0].alt }]
        : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}

