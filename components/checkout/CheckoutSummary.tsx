"use client";

// ─── components/checkout/CheckoutSummary.tsx ──────────────────────────────────
// Read-only order summary sidebar shown during checkout.
// Receives pre-computed totals from useCart.

import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/components/cart/useCart";

interface CheckoutSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export function CheckoutSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
}: CheckoutSummaryProps) {
  return (
    <aside className="flex flex-col gap-6 bg-[--color-card] p-8 rounded-3xl border border-[--color-border] shadow-[--shadow-card] h-fit sticky top-6">
      <div>
        <h2 className="font-serif text-xl font-semibold text-[--color-foreground]">
          Order Summary
        </h2>
        <p className="text-xs text-[--color-muted-foreground] font-sans mt-0.5">
          {items.length} {items.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      {/* Item list */}
      <ul className="flex flex-col gap-4 max-h-72 overflow-y-auto pr-1">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3 items-center">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[--color-muted]">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.imageAlt || item.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[--color-foreground] truncate font-sans">
                {item.name}
              </p>
              <p className="text-[10px] text-[--color-muted-foreground] font-sans mt-0.5 capitalize">
                {item.category} · qty {item.quantity}
              </p>
            </div>
            <span className="text-xs font-semibold text-[--color-foreground] font-sans shrink-0">
              {formatPrice(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className="border-t border-[--color-border] pt-5 flex flex-col gap-2.5">
        <div className="flex justify-between text-xs font-sans text-[--color-muted-foreground]">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-xs font-sans text-[--color-muted-foreground]">
          <span>White-Glove Delivery</span>
          <span>
            {shipping === 0 ? (
              <span className="text-emerald-600 font-medium">Complimentary</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        <div className="flex justify-between text-xs font-sans text-[--color-muted-foreground]">
          <span>Tax (8%)</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <div className="flex justify-between text-sm font-bold font-sans text-[--color-foreground] mt-2 pt-3 border-t border-[--color-border]">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Free shipping badge */}
      {shipping === 0 && subtotal > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
          <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
            ✦ Complimentary delivery included
          </p>
        </div>
      )}
    </aside>
  );
}
