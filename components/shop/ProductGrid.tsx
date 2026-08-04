"use client";

import { AlertCircle } from "lucide-react";
import { type Product } from "@/models";
import { ProductCard } from "@/components/common/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-8">
        <EmptyState
          icon={<AlertCircle className="size-6" />}
          title="No products found"
          description="We couldn't find any products matching your current filters. Try resetting or adjusting them."
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
