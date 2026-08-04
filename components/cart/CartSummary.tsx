"use client";

// ─── components/cart/CartSummary.tsx ──────────────────────────────────────────
// Order summary panel: subtotal, shipping, tax, promo code, and checkout CTA.
// Client component.

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

export function CartSummary({ subtotal, shipping, tax, total, itemCount }: CartSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "LUXE10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try LUXE10.");
      setPromoApplied(false);
    }
  };

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const finalTotal = total - discount;

  return (
    <div className="rounded-3xl border border-[--color-border] bg-[--color-card] p-7 flex flex-col gap-5 sticky top-24">
      <h2 className="font-serif text-xl font-semibold text-[--color-foreground] tracking-tight">
        Order Summary
      </h2>

      {/* Line Items */}
      <dl className="flex flex-col gap-3 font-sans text-sm">
        <div className="flex justify-between text-[--color-muted-foreground]">
          <dt>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        {promoApplied && (
          <div className="flex justify-between text-emerald-600">
            <dt>Promo (LUXE10 −10%)</dt>
            <dd>−{formatPrice(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between text-[--color-muted-foreground]">
          <dt>White-Glove Delivery</dt>
          <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        {shipping === 0 && subtotal > 0 && (
          <p className="text-[10px] text-emerald-600 font-medium -mt-1">
            ✓ Complimentary on orders over $2,000
          </p>
        )}
        <div className="flex justify-between text-[--color-muted-foreground]">
          <dt>Estimated Tax (8%)</dt>
          <dd>{formatPrice(tax)}</dd>
        </div>

        <div className="border-t border-[--color-border] pt-3 mt-1 flex justify-between font-semibold text-[--color-foreground]">
          <dt className="font-serif text-base">Order Total</dt>
          <dd className="font-serif text-base">{formatPrice(finalTotal)}</dd>
        </div>
      </dl>

      {/* Promo Code */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[--color-muted-foreground] font-sans flex items-center gap-1.5">
          <Tag className="size-3" /> Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); setPromoApplied(false); }}
            placeholder="e.g. LUXE10"
            disabled={promoApplied}
            className="h-10 flex-1 rounded-lg border border-[--color-border] bg-[--color-background] px-4 text-xs focus:border-[--color-ring] focus:outline-none disabled:opacity-50"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleApplyPromo}
            disabled={!promoCode.trim() || promoApplied}
            className="rounded-lg shrink-0"
          >
            Apply
          </Button>
        </div>
        {promoError && <p className="text-[11px] text-[--color-destructive] font-sans">{promoError}</p>}
        {promoApplied && <p className="text-[11px] text-emerald-600 font-sans">✓ Promo code applied!</p>}
      </div>

      {/* CTA */}
      <Link href={ROUTES.CHECKOUT} className="mt-1">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          className="rounded-full"
          rightIcon={<ArrowRight className="size-4" />}
          disabled={itemCount === 0}
        >
          Proceed to Checkout
        </Button>
      </Link>

      <p className="text-center text-[11px] text-[--color-muted-foreground] font-sans">
        Secure checkout · Encrypted with SSL
      </p>
    </div>
  );
}
