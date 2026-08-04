// ─── components/shop/ShopHero.tsx ─────────────────────────────────────────────
// Compact banner section at the top of /shop.
// Server component — receives result count from parent for the live label.

import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { ROUTES } from "@/constants/routes";

interface ShopHeroProps {
  totalProducts: number;
}

export function ShopHero({ totalProducts }: ShopHeroProps) {
  return (
    <section
      className="relative h-[44vh] min-h-[320px] w-full overflow-hidden bg-[--color-foreground]"
      aria-label="Shop banner"
    >
      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2400&auto=format&fit=crop"
        alt="FurnitureLux Shop"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-40"
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Walnut accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[--color-walnut-400] via-[--color-walnut-300] to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        <Container size="lg" className="pt-6">
          <Breadcrumb
            items={[{ label: "Shop", href: ROUTES.SHOP }]}
            className="text-white/50 [&_a]:text-white/50 [&_a:hover]:text-white/90 [&_svg]:text-white/30"
          />
        </Container>

        <Container size="lg" className="flex flex-1 items-center">
          <div className="animate-slide-up">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.3em] text-[--color-walnut-300] font-sans mb-4">
              2026 Catalogue
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.05] text-white">
              Shop All Pieces
            </h1>
            <p className="mt-4 text-sm text-white/60 font-sans">
              {totalProducts} handcrafted pieces available
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
