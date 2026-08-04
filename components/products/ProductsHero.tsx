// ─── components/products/ProductsHero.tsx ─────────────────────────────────────
// Header banner for the /products listing page.

import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ROUTES } from "@/constants/routes";

export function ProductsHero() {
  return (
    <section className="bg-[--color-foreground] text-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[--color-walnut-400] via-[--color-walnut-300] to-transparent opacity-60" />

      <Container size="lg" className="relative z-10 flex flex-col gap-5">
        <Breadcrumb
          items={[{ label: "Products", href: ROUTES.PRODUCTS }]}
          className="text-white/50 [&_a]:text-white/50 [&_a:hover]:text-white/95 [&_svg]:text-white/30 py-0"
        />
        <div className="max-w-2xl mt-2">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[--color-walnut-300] font-sans">
            Our Catalogue
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mt-2 mb-3">
            All Products
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70 font-light max-w-lg">
            Browse our full catalogue of handcrafted luxury furniture — filtered and sorted to your taste.
          </p>
        </div>
      </Container>
    </section>
  );
}
