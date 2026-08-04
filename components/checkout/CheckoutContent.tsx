"use client";

// ─── components/checkout/CheckoutContent.tsx ──────────────────────────────────
// Main checkout page orchestrator.
// Reads cart from useCart, shows redirect guards, composes form + summary.

import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartContext } from "@/components/cart";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSummary } from "./CheckoutSummary";
import { ROUTES } from "@/constants/routes";

export function CheckoutContent() {
  const router = useRouter();
  const { items, hydrated, subtotal, shipping, tax, total } = useCartContext();

  const handleOrderSuccess = (orderId: string) => {
    router.push(ROUTES.ORDER_CONFIRMATION(orderId));
  };

  // Skeleton while cart hydrates
  if (!hydrated) {
    return (
      <Container size="lg" className="py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
          <div className="flex flex-col gap-4">
            <div className="skeleton h-8 w-48 rounded" />
            <div className="skeleton h-64 w-full rounded-3xl" />
          </div>
          <div className="skeleton h-96 w-full rounded-3xl" />
        </div>
      </Container>
    );
  }

  // Empty cart guard
  if (items.length === 0) {
    return (
      <Container size="sm" className="py-24 text-center">
        <div className="flex flex-col items-center gap-5">
          <div className="flex size-20 items-center justify-center rounded-full bg-[--color-muted]">
            <ShoppingBag className="size-8 text-[--color-muted-foreground]" />
          </div>
          <h1 className="font-serif text-2xl font-light text-[--color-foreground]">
            Your cart is empty
          </h1>
          <p className="text-sm text-[--color-muted-foreground] font-sans max-w-sm">
            Add pieces to your collection before proceeding to checkout.
          </p>
          <Link href={ROUTES.SHOP}>
            <Button variant="primary" size="md" className="rounded-full mt-2">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <section className="py-12 md:py-20" aria-label="Checkout">
      <Container size="lg">
        {/* Page heading */}
        <div className="border-b border-[--color-border] pb-6 mb-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[--color-accent] font-sans">
            Secure Checkout
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[--color-foreground] mt-1">
            Complete Your Order
          </h1>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px] items-start">
          {/* Left: Shipping + Payment form */}
          <CheckoutForm onSuccess={handleOrderSuccess} />

          {/* Right: Sticky summary */}
          <CheckoutSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </Container>
    </section>
  );
}
