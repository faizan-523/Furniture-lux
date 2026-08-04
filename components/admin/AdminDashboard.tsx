"use client";

// ─── components/admin/AdminDashboard.tsx ──────────────────────────────────────
// Main admin product list panel with search, edit/delete actions, and quick stats.

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Pencil, Trash2, Loader2, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

interface ProductRow {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  stock: number;
  inStock: boolean;
  featured: boolean;
  images: { url: string; alt: string }[];
}

export function AdminDashboard() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products?limit=100");
      if (!res.ok) throw new Error("Failed to load products.");
      const json = await res.json();
      setProducts(json.data);
    } catch {
      setError("Error connecting to catalog database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this product?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete the product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container size="lg" className="py-10">
      {/* Heading Block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[--color-border] pb-6 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-light tracking-tight text-[--color-foreground]">
            Products Catalogue
          </h1>
          <p className="text-xs text-[--color-muted-foreground] font-sans mt-1">
            Manage, update, and publish inventory items.
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button variant="primary" className="rounded-full gap-1.5" size="sm">
            <Plus className="size-4" /> Add Product
          </Button>
        </Link>
      </div>

      {/* Search & Actions Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[--color-muted-foreground] pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or category..."
            className="h-10 w-full pl-10 pr-4 rounded-xl border border-[--color-border] bg-[--color-card] text-sm focus:border-[--color-ring] focus:outline-none"
          />
        </div>
        <div className="text-xs text-[--color-muted-foreground] font-sans ml-auto">
          {filtered.length} products total
        </div>
      </div>

      {/* Catalogue Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="size-8 animate-spin text-[--color-accent]" />
          <p className="text-sm text-[--color-muted-foreground] font-sans">Syncing database...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 border border-dashed border-[--color-border] rounded-2xl bg-[--color-card]">
          <p className="text-sm text-[--color-destructive] font-sans mb-3">{error}</p>
          <Button onClick={fetchProducts} variant="outline" size="sm">Retry Connection</Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[--color-border] rounded-2xl bg-[--color-card]">
          <p className="text-sm text-[--color-muted-foreground] font-sans">No products match your query.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[--color-border] bg-[--color-card] shadow-[--shadow-soft]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[--color-border] bg-[--color-muted]/30 font-sans text-xs font-bold uppercase tracking-wider text-[--color-muted-foreground]">
                  <th className="p-4 pl-6">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--color-border] font-sans">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-[--color-muted]/10 transition-colors">
                    {/* Thumbnail & Name */}
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 overflow-hidden rounded-lg bg-[--color-muted] shrink-0">
                          {product.images[0]?.url ? (
                            <Image
                              src={product.images[0].url}
                              alt={product.images[0].alt || product.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="size-full flex items-center justify-center text-xs">No image</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[--color-foreground] truncate max-w-[200px]">
                            {product.name}
                          </p>
                          <Link
                            href={ROUTES.PRODUCT(product.slug)}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-[10px] text-[--color-accent] hover:underline mt-0.5"
                          >
                            View Product <ExternalLink className="size-2.5" />
                          </Link>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4 capitalize text-[--color-muted-foreground]">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="p-4 font-semibold text-[--color-foreground]">
                      {formatPrice(product.price)}
                    </td>

                    {/* Stock count */}
                    <td className="p-4 text-[--color-muted-foreground] font-medium">
                      {product.stock} pcs
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      {product.inStock ? (
                        <Badge variant="success" size="sm">Active</Badge>
                      ) : (
                        <Badge variant="secondary" size="sm">Sold Out</Badge>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-1.5">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-lg text-[--color-muted-foreground] hover:text-[--color-foreground]"
                            aria-label="Edit product"
                          >
                            <Pencil className="size-3.5" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="size-8 rounded-lg text-[--color-muted-foreground] hover:text-red-600 disabled:opacity-50"
                          aria-label="Delete product"
                        >
                          {deletingId === product.id ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="size-3.5" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Container>
  );
}
