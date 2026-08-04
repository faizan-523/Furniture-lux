"use client";

// ─── components/cart/CartList.tsx ─────────────────────────────────────────────
// Animated list of CartLineItems, or EmptyState when cart is empty.
// Client component.

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { CartLineItem } from "./CartLineItem";
import { type CartItem } from "./useCart";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

interface CartListProps {
  items: CartItem[];
  hydrated: boolean;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
}

export function CartList({ items, hydrated, onRemove, onQuantityChange }: CartListProps) {
  // Loading skeleton
  if (!hydrated) {
    return (
      <ul className="flex flex-col divide-y divide-[--color-border]">
        {[1, 2, 3].map((n) => (
          <li key={n} className="flex gap-5 py-6">
            <div className="skeleton size-24 sm:size-28 rounded-2xl shrink-0" />
            <div className="flex flex-1 flex-col gap-3">
              <div className="skeleton h-4 w-1/3 rounded" />
              <div className="skeleton h-5 w-2/3 rounded" />
              <div className="skeleton h-8 w-28 rounded-full mt-auto" />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag className="size-6" />}
        title="Your cart is empty"
        description="Looks like you haven't added anything yet. Explore our curated collections to find your perfect piece."
        action={
          <Link href={ROUTES.SHOP}>
            <Button variant="primary" size="md" className="rounded-full">
              Browse the Shop
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <ul role="list" aria-label="Shopping cart items">
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <CartLineItem
            key={item.id}
            item={item}
            onRemove={onRemove}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
