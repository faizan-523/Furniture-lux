"use client";

// ─── components/wishlist/WishlistGrid.tsx ────────────────────────────────────
// Lists items inside the user's wishlist or renders EmptyState.

import Link from "next/link";
import { Heart } from "lucide-react";
import { type Product } from "@/models";
import { ProductCard } from "@/components/common/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ROUTES } from "@/constants/routes";

interface WishlistGridProps {
  items: Product[];
  hydrated: boolean;
}

export function WishlistGrid({ items, hydrated }: WishlistGridProps) {
  if (!hydrated) {
    return (
      <Container size="lg" className="py-16">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-col gap-4">
              <div className="skeleton aspect-square rounded-2xl w-full" />
              <div className="skeleton h-3 w-1/4 rounded" />
              <div className="skeleton h-4 w-1/2 rounded" />
              <div className="skeleton h-4 w-1/3 rounded" />
            </div>
          ))}
        </div>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container size="lg" className="py-16">
        <EmptyState
          icon={<Heart className="size-6" />}
          title="Your wishlist is empty"
          description="Save handcrafted designs you love to your personal curation to review or purchase later."
          action={
            <Link href={ROUTES.SHOP}>
              <Button variant="primary" size="md" className="rounded-full">
                Explore the Shop
              </Button>
            </Link>
          }
        />
      </Container>
    );
  }

  return (
    <Container size="lg" className="py-16">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
