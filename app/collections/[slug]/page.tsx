// ─── app/collections/[slug]/page.tsx ──────────────────────────────────────────
// Collection Detail Page — Server Component.
// Displays curated products belonging to a specific room collection.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { COLLECTIONS, COLLECTION_PRODUCTS } from "@/data/collections";
import { ProductCard } from "@/components/common/ProductCard";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ROUTES } from "@/constants/routes";

type Props = { params: Promise<{ slug: string }> };

// ─── Static params — pre-render all known slugs at build time ─────────────────

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

// ─── Helper to fetch collection by slug ───────────────────────────────────────

function getCollectionBySlug(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug) ?? null;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return { title: "Collection Not Found" };
  }

  return {
    title: `${collection.name} Collection`,
    description: collection.description.slice(0, 160),
    openGraph: {
      title: `${collection.name} Collection | FurnitureLux`,
      description: collection.description.slice(0, 160),
      images: [{ url: collection.heroImage, alt: collection.name }],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) notFound();

  const products = COLLECTION_PRODUCTS[collection.slug] ?? [];

  return (
    <div className="w-full">
      {/* Cinematic Hero */}
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden bg-[--color-foreground]">
        <Image
          src={collection.heroImage}
          alt={collection.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        {/* Layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end pb-8 md:pb-12">
          <Container size="lg">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[--color-walnut-300] font-sans">
              Collection Showcase
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mt-3">
              {collection.name}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-xl font-sans">
              {collection.tagline}
            </p>
          </Container>
        </div>
      </section>

      {/* Main Content */}
      <Container size="lg" className="py-10 md:py-16">
        {/* Navigation & Info */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-[--color-border] pb-8 mb-10">
          <div>
            <Breadcrumb
              items={[
                { label: "Collections", href: ROUTES.COLLECTIONS },
                { label: collection.name },
              ]}
              className="py-0 mb-4"
            />
            <p className="text-sm leading-relaxed text-[--color-muted-foreground] font-light max-w-3xl">
              {collection.description}
            </p>
          </div>
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-[--color-muted-foreground] font-sans bg-[--color-muted] px-4 py-2 rounded-full md:self-end">
            {products.length} {products.length === 1 ? "Piece" : "Pieces"}
          </span>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-[--color-muted-foreground] font-sans">
              No products found in this collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-16 pt-8 border-t border-[--color-border]">
          <Link
            href={ROUTES.COLLECTIONS}
            className="inline-flex items-center gap-1.5 text-xs font-semibold font-sans text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors"
          >
            <ChevronLeft className="size-3.5" /> Back to All Collections
          </Link>
        </div>
      </Container>
    </div>
  );
}
