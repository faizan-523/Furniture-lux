// ─── components/about/AboutHero.tsx ──────────────────────────────────────────
// High-impact cinematic hero section for the /about page.
// Server Component.

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ROUTES } from "@/constants/routes";

export function AboutHero() {
  return (
    <section
      className="relative h-[75vh] min-h-[500px] w-full overflow-hidden bg-[--color-foreground]"
      aria-label="About Hero"
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop"
        alt="Artisan workspace detailing premium wood craft"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-45"
      />

      {/* Luxury layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[--color-walnut-400] via-[--color-walnut-300] to-transparent opacity-60" />

      {/* Main Hero Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Navigation Breadcrumbs */}
        <Container size="lg" className="pt-6">
          <Breadcrumb
            items={[{ label: "Our Story", href: ROUTES.ABOUT }]}
            className="text-white/50 [&_a]:text-white/50 [&_a:hover]:text-white/90 [&_svg]:text-white/30"
          />
        </Container>

        {/* Story Intro Header */}
        <Container size="lg" className="flex flex-1 items-center">
          <div className="max-w-3xl animate-slide-up">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.3em] text-[--color-walnut-300] font-sans mb-5">
              Our Heritage & Philosophy
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.03] text-white">
              Sanctuaries Crafted <br />
              For Generations.
            </h1>
            <p className="mt-6 font-sans text-base sm:text-lg text-white/75 font-light leading-relaxed max-w-xl">
              We reject the ephemeral. At FurnitureLux, every curve of walnut, every joint of white oak, and every slice of honed travertine is selected to transcend temporary trends.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
