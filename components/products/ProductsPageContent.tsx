// ─── components/products/ProductsPageContent.tsx ──────────────────────────────
// Client-aware listing: fetches from /api/products and renders a filterable grid.

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/common/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { type Product } from "@/models";
import { ROUTES } from "@/constants/routes";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: { url: string; alt: string; width: number; height: number }[];
  category: string;
  tags: string[];
  inStock: boolean;
  stock: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

function toProduct(p: ApiProduct): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    images: p.images,
    category: p.category,
    tags: p.tags,
    inStock: p.inStock,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Living Room", value: "living" },
  { label: "Dining Room", value: "dining" },
  { label: "Bedroom", value: "bedroom" },
  { label: "Lighting", value: "lighting" },
  { label: "Outdoor", value: "outdoor" },
  { label: "Workspace", value: "workspace" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductsPageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "48", sortBy: "createdAt" });
      if (search) params.set("search", search);
      if (category !== "all") params.set("category", category);
      if (inStockOnly) params.set("inStock", "true");
      if (featuredOnly) params.set("featured", "true");

      const res = await fetch(`/api/products?${params}`);
      if (!res.ok) throw new Error("Failed to load products");
      const json = await res.json() as { data: ApiProduct[]; meta: { total: number } };
      setProducts(json.data.map(toProduct));
      setTotal(json.meta.total);
    } catch {
      setError("Could not load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search, category, inStockOnly, featuredOnly]);

  useEffect(() => {
    const t = setTimeout(fetchProducts, search ? 350 : 0);
    return () => clearTimeout(t);
  }, [fetchProducts, search]);

  const hasFilters = category !== "all" || inStockOnly || featuredOnly || search;

  return (
    <Container size="lg" className="py-16">
      {/* Filters bar */}
      <div className="flex flex-col gap-4 mb-10 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[--color-muted-foreground] pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="h-10 w-full rounded-xl border border-[--color-border] bg-[--color-card] pl-10 pr-4 text-sm focus:border-[--color-ring] focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[--color-muted-foreground]">
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`h-8 rounded-full px-4 text-xs font-semibold font-sans transition-colors ${
                category === c.value
                  ? "bg-[--color-foreground] text-[--color-background]"
                  : "border border-[--color-border] text-[--color-muted-foreground] hover:border-[--color-foreground] hover:text-[--color-foreground]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Toggle filters */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer text-xs font-sans text-[--color-muted-foreground]">
            <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="rounded" />
            In Stock
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-xs font-sans text-[--color-muted-foreground]">
            <input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} className="rounded" />
            Featured
          </label>
          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setCategory("all"); setInStockOnly(false); setFeaturedOnly(false); }}
              className="flex items-center gap-1 text-xs text-[--color-accent] hover:opacity-80 font-sans"
            >
              <X className="size-3" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      {!loading && (
        <p className="text-xs text-[--color-muted-foreground] font-sans mb-6">
          {total} {total === 1 ? "product" : "products"} found
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="skeleton aspect-square w-full rounded-2xl" />
              <div className="skeleton h-3 w-1/4 rounded" />
              <div className="skeleton h-4 w-2/3 rounded" />
              <div className="skeleton h-4 w-1/3 rounded" />
            </div>
          ))}
        </div>
      ) : error ? (
        <EmptyState
          icon={<SlidersHorizontal className="size-6" />}
          title="Something went wrong"
          description={error}
          action={<Button onClick={fetchProducts} variant="outline" size="md" className="rounded-full">Retry</Button>}
        />
      ) : products.length === 0 ? (
        <EmptyState
          icon={<Search className="size-6" />}
          title="No products found"
          description={hasFilters ? "Try adjusting your filters or search term." : "No products have been added yet."}
          action={hasFilters ? (
            <Button onClick={() => { setSearch(""); setCategory("all"); setInStockOnly(false); setFeaturedOnly(false); }} variant="outline" size="md" className="rounded-full">
              Clear Filters
            </Button>
          ) : (
            <Link href={ROUTES.SHOP}><Button variant="primary" size="md" className="rounded-full">Browse Shop</Button></Link>
          )}
        />
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}
