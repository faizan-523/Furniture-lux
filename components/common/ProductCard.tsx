"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";
import { type Product } from "@/models";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCartContext } from "@/components/cart/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartContext();
  const mainImage = product.images[0] || { url: "", alt: product.name, width: 800, height: 800 };
  const hoverImage = product.images[1] || mainImage; // fallback to main if only 1 image
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: mainImage.url,
      imageAlt: mainImage.alt,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
    >
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-[--color-muted] transition-all">
        {/* Product Images */}
        <Link href={ROUTES.PRODUCT(product.slug)} className="absolute inset-0">
          <Image
            src={mainImage.url}
            alt={mainImage.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered && product.images[1] ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
          />
          {product.images[1] && (
            <Image
              src={hoverImage.url}
              alt={hoverImage.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-all duration-700 ease-out ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            />
          )}
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {hasDiscount && (
            <span className="rounded-full bg-[--color-accent] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[--color-accent-foreground] shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
          {!product.inStock && (
            <span className="rounded-full bg-[--color-foreground] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[--color-background] shadow-sm">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Hover Overlay Actions */}
        <AnimatePresence>
          {isHovered && product.inStock && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-20 flex items-end justify-center bg-black/15 p-6 backdrop-blur-[2px]"
            >
              <div className="flex w-full gap-2.5">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 rounded-full shadow-lg bg-black text-white hover:bg-neutral-900 border border-neutral-800"
                  leftIcon={<ShoppingBag className="size-4" />}
                  onClick={handleQuickAdd}
                >
                  Quick Add
                </Button>
                <Link href={ROUTES.PRODUCT(product.slug)}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="size-9 rounded-full p-0 shadow-lg bg-white/90 text-black hover:bg-white border-0"
                    aria-label="View Details"
                  >
                    <Eye className="size-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="mt-4 flex flex-col">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[--color-muted-foreground] font-sans">
          {product.category}
        </span>
        <h3 className="mt-1 font-serif text-base font-semibold text-[--color-foreground] hover:text-[--color-accent] transition-colors">
          <Link href={ROUTES.PRODUCT(product.slug)}>{product.name}</Link>
        </h3>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="font-sans text-sm font-medium text-[--color-foreground]">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="font-sans text-xs text-[--color-muted-foreground] line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

