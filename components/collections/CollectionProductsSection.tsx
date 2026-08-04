// ─── components/collections/CollectionProductsSection.tsx ────────────────────
// Editorial "Picks from the Collection" strip below the main grid.
// Showcases curated products from the flagship Living Room collection.
// Server component.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/common/ProductCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COLLECTION_PRODUCTS, COLLECTIONS } from "@/data/collections";
import { ROUTES } from "@/constants/routes";

export function CollectionProductsSection() {
  // Showcase the Living Room collection as editorial feature
  const featured = COLLECTIONS.find((c) => c.slug === "living")!;
  const products = COLLECTION_PRODUCTS[featured.slug] ?? [];

  return (
    <section
      aria-labelledby="featured-picks-heading"
      className="py-16 md:py-24 bg-[--color-muted]/40 border-t border-[--color-border]"
    >
      <Container size="lg">
        {/* Heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 md:mb-14">
          <SectionHeading
            title={`Picks from ${featured.name}`}
            subtitle="Editor's Selection"
            align="left"
            divider
            className="mb-0"
          />
          <Link
            href={ROUTES.COLLECTION(featured.slug)}
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[--color-accent] font-sans hover:gap-3 transition-all"
            aria-label={`View all ${featured.name} pieces`}
          >
            View All {featured.productCount} Pieces
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
