"use client";

import { ArrowRight } from "lucide-react";
import { HOMEPAGE_PRODUCTS } from "@/data/home";
import { ProductCard } from "@/components/common/ProductCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/ui/Container";
import NextLink from "next/link";
import { ROUTES } from "@/constants/routes";

export default function FeaturedProducts() {
  // Filter products by "featured" tag
  const featuredProducts = HOMEPAGE_PRODUCTS.filter((prod) =>
    prod.tags.includes("featured")
  ).slice(0, 4); // Limit to 4 for clean grid

  return (
    <section className="py-20 md:py-28 bg-[--color-muted]/30">
      <Container size="lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <SectionHeading
            subtitle="Flagship Pieces"
            title="The Autumn Masterpieces"
            align="left"
            className="mb-0 md:mb-0"
            divider
          />
          <NextLink
            href={ROUTES.SHOP}
            className="group mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[--color-accent] hover:text-[--color-foreground] transition-colors"
          >
            Explore Full Collection
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </NextLink>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
