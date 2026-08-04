// ─── components/contact/ContactHero.tsx ───────────────────────────────────────
// Header component for the Contact page.
// Server Component.

import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ROUTES } from "@/constants/routes";

export function ContactHero() {
  return (
    <section className="bg-black text-white py-16 md:py-20 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[--color-walnut-400] via-[--color-walnut-300] to-transparent opacity-60" />

      <Container size="lg" className="relative z-10 flex flex-col gap-6">
        <Breadcrumb
          items={[{ label: "Contact Us", href: ROUTES.CONTACT }]}
          className="text-white/50 [&_a]:text-white/50 [&_a:hover]:text-white/90 [&_svg]:text-white/30 py-0"
        />

        <div className="max-w-2xl mt-4 animate-slide-up">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[--color-walnut-300] font-sans">
            Design Concierge & Support
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mt-3 mb-4">
            Connect With Us
          </h1>
          <p className="font-sans text-sm md:text-base text-white/70 font-light leading-relaxed">
            Whether you have questions about custom dimensions, white-glove logistics, or simply wish to book a consultation at our showroom, our team is here to assist.
          </p>
        </div>
      </Container>
    </section>
  );
}
