"use client";

// ─── components/cart/CartContent.tsx ──────────────────────────────────────────
// Main orchestrator for the cart page layout.
// Owns the useCart hook and wires CartList + CartSummary together.
// Client component.

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCartContext } from "./CartContext";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CartContent() {
  const {
    items,
    hydrated,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCartContext();

  return (
    <section className="py-12 md:py-20" aria-label="Shopping Cart">
      <Container size="lg">
        {/* Page header row */}
        <div className="flex items-center justify-between gap-4 border-b border-[--color-border] pb-6 mb-8">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[--color-accent] font-sans">
              Review Your Selection
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[--color-foreground] mt-1">
              Shopping Cart
              {hydrated && itemCount > 0 && (
                <span className="ml-3 font-sans text-base font-normal text-[--color-muted-foreground]">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </h1>
          </div>

          {hydrated && items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="rounded-full text-[--color-muted-foreground] hover:text-[--color-destructive] shrink-0"
            >
              <Trash2 className="size-4" />
              Clear Cart
            </Button>
          )}
        </div>

        {/* Two-column layout: items | summary */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left: item list */}
          <div>
            <CartList
              items={items}
              hydrated={hydrated}
              onRemove={removeItem}
              onQuantityChange={updateQuantity}
            />

            {/* Continue shopping link below items */}
            {hydrated && items.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[--color-border]">
                <Link
                  href="/shop"
                  className="text-xs font-semibold font-sans text-[--color-accent] hover:opacity-80 transition-opacity"
                >
                  ← Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Right: order summary */}
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            itemCount={itemCount}
          />
        </div>
      </Container>
    </section>
  );
}
