// ─── components/collections/CollectionsHero.tsx ───────────────────────────────
// Cinematic full-bleed hero for the /collections page.
// Server component — no client JS needed.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { COLLECTIONS_HERO } from "@/data/collections";
import { ROUTES } from "@/constants/routes";

export function CollectionsHero() {
  return (
    <section
      className="relative h-[68vh] min-h-[480px] w-full overflow-hidden bg-[--color-foreground]"
      aria-label="Collections hero"
    >
      {/* Background image */}
      <Image
        src={COLLECTIONS_HERO.heroImage}
        alt="FurnitureLux Collections"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-55"
      />

      {/* Layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Breadcrumb row */}
        <Container size="lg" className="pt-6">
          <Breadcrumb
            items={[{ label: "Collections", href: ROUTES.COLLECTIONS }]}
            className="text-white/60 [&_a]:text-white/60 [&_a:hover]:text-white [&_svg]:text-white/40"
          />
        </Container>

        {/* Hero copy */}
        <Container size="lg" className="flex flex-1 items-center">
          <div className="max-w-2xl animate-slide-up">
            {/* Eyebrow */}
            <span className="inline-block text-[11px] font-semibold tracking-[0.3em] uppercase text-[--color-walnut-300] font-sans mb-5">
              {COLLECTIONS_HERO.eyebrow}
            </span>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.04] text-white">
              {COLLECTIONS_HERO.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl font-sans">
              {COLLECTIONS_HERO.subtitle}
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={ROUTES.SHOP}
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-white text-black text-sm font-medium font-sans tracking-wide transition-all hover:bg-[--color-walnut-100] hover:gap-3"
              >
                Shop All Pieces
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href="#collections-grid"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full border border-white/25 text-white text-sm font-medium font-sans tracking-wide transition-all hover:bg-white/10 hover:border-white/50"
              >
                Browse Collections
              </a>
            </div>
          </div>
        </Container>

        {/* Bottom decorative bar */}
        <div className="relative z-10 h-1 w-full">
          <div className="h-full w-full bg-gradient-to-r from-[--color-walnut-400] via-[--color-walnut-300] to-transparent opacity-70" />
        </div>
      </div>
    </section>
  );
}
