"use client";

// ─── components/cart/CartLineItem.tsx ─────────────────────────────────────────
// Single cart row: image · info · quantity controls · price · remove.
// < 200 lines. Client component.

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { type CartItem } from "./useCart";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

interface CartLineItemProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
}

export function CartLineItem({ item, onRemove, onQuantityChange }: CartLineItemProps) {
  const lineTotal = item.price * item.quantity;
  const hasDiscount = item.compareAtPrice && item.compareAtPrice > item.price;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="flex gap-5 py-6 border-b border-[--color-border] last:border-0"
    >
      {/* Product Image */}
      <Link
        href={ROUTES.PRODUCT(item.slug)}
        className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-[--color-muted] sm:size-28"
        aria-label={`View ${item.name}`}
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="112px"
          className="object-cover object-center transition-transform duration-500 hover:scale-105"
        />
      </Link>

      {/* Info + Controls */}
      <div className="flex flex-1 flex-col justify-between min-w-0 gap-3">
        {/* Top Row: name + price */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[--color-muted-foreground] font-sans capitalize">
              {item.category}
            </span>
            <h3 className="font-serif text-sm sm:text-base font-semibold text-[--color-foreground] leading-tight mt-0.5 truncate">
              <Link href={ROUTES.PRODUCT(item.slug)} className="hover:text-[--color-accent] transition-colors">
                {item.name}
              </Link>
            </h3>
            {hasDiscount && (
              <p className="mt-0.5 text-[11px] text-[--color-muted-foreground] line-through font-sans">
                {formatPrice(item.compareAtPrice!)}
              </p>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="font-sans text-sm font-semibold text-[--color-foreground]">
              {formatPrice(lineTotal)}
            </p>
            {item.quantity > 1 && (
              <p className="text-[10px] text-[--color-muted-foreground] font-sans">
                {formatPrice(item.price)} ea.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Row: quantity + remove */}
        <div className="flex items-center justify-between">
          {/* Quantity stepper */}
          <div className="flex items-center gap-1 rounded-full border border-[--color-border] bg-[--color-card] p-1">
            <button
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="flex size-7 items-center justify-center rounded-full text-[--color-muted-foreground] transition-colors hover:bg-[--color-muted] hover:text-[--color-foreground] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-8 text-center text-xs font-semibold font-sans text-[--color-foreground]">
              {item.quantity}
            </span>
            <button
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              className="flex size-7 items-center justify-center rounded-full text-[--color-muted-foreground] transition-colors hover:bg-[--color-muted] hover:text-[--color-foreground]"
              aria-label="Increase quantity"
            >
              <Plus className="size-3" />
            </button>
          </div>

          {/* Remove */}
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onRemove(item.id)}
            className="rounded-full text-[--color-muted-foreground] hover:text-[--color-destructive]"
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 className="size-3.5" />
            <span className="text-[11px]">Remove</span>
          </Button>
        </div>
      </div>
    </motion.li>
  );
}
