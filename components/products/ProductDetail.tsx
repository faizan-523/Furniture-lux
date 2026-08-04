// ─── components/products/ProductDetail.tsx ────────────────────────────────────
// Rich product detail view rendered on the /products/[slug] page.
// Receives a pre-fetched product (from server component) as a prop.

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Heart, ChevronLeft, Tag, Package, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type Product } from "@/models";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useCartContext } from "@/components/cart/CartContext";

interface ProductDetailProps {
  product: Product & { stock: number; featured: boolean };
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartContext();

  // Always at least 1 image guaranteed by schema; guard for TS
  if (!product.images.length) return null;

  const mainImage = product.images[selectedImage] ?? product.images[0]!;

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  return (
    <section className="py-10 md:py-16" aria-label={product.name}>
      <Container size="lg">
        <Breadcrumb
          items={[
            { label: "Products", href: ROUTES.PRODUCTS },
            { label: product.category, href: `${ROUTES.PRODUCTS}?category=${product.category}` },
            { label: product.name },
          ]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* ── Images ────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[--color-muted]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={mainImage.url}
                    alt={mainImage.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {hasDiscount && (
                  <Badge variant="accent" size="sm">−{discountPct}% OFF</Badge>
                )}
                {product.featured && (
                  <Badge variant="default" size="sm">
                    <Star className="size-2.5 mr-0.5" /> Featured
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge variant="secondary" size="sm">Sold Out</Badge>
                )}
              </div>
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                      i === selectedImage
                        ? "border-[--color-accent]"
                        : "border-[--color-border] hover:border-[--color-charcoal-400]"
                    }`}
                  >
                    <Image src={img.url} alt={img.alt} fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ──────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[--color-accent] font-sans">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[--color-foreground] mt-2 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-sans text-2xl font-semibold text-[--color-foreground]">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="font-sans text-base text-[--color-muted-foreground] line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-sm font-sans">
              <Package className="size-4 text-[--color-muted-foreground]" />
              {product.inStock ? (
                <span className="text-emerald-600 font-medium">In Stock</span>
              ) : (
                <span className="text-[--color-muted-foreground]">Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <p className="font-sans text-sm leading-relaxed text-[--color-muted-foreground] font-light">
              {product.description}
            </p>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="size-3.5 text-[--color-muted-foreground]" />
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="h-6 rounded-full border border-[--color-border] px-3 text-[11px] font-semibold font-sans capitalize text-[--color-muted-foreground] flex items-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={!product.inStock}
                className="rounded-full"
                leftIcon={<ShoppingBag className="size-5" />}
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    category: product.category,
                    price: product.price,
                    compareAtPrice: product.compareAtPrice,
                    image: mainImage.url,
                    imageAlt: mainImage.alt,
                  })
                }
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                fullWidth
                className="rounded-full"
                leftIcon={<Heart className="size-5" />}
              >
                Save to Wishlist
              </Button>
            </div>

            {/* Back link */}
            <Link
              href={ROUTES.PRODUCTS}
              className="flex items-center gap-1.5 text-xs font-semibold font-sans text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors pt-2"
            >
              <ChevronLeft className="size-3.5" /> Back to Products
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
