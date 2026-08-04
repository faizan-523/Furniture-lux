// ─── components/contact/MapPlaceholder.tsx ────────────────────────────────────
// Showroom location map section.
// Server Component.

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function MapPlaceholder() {
  return (
    <section
      className="py-20 md:py-28 bg-[--color-muted]/40 border-y border-[--color-border]"
      aria-label="Showroom location"
    >
      <Container size="lg">
        <SectionHeading
          title="Experience FurnitureLux"
          subtitle="Visit Our Showroom"
          divider
        />
        <p className="text-center font-sans text-sm text-[--color-muted-foreground] font-light -mt-8 mb-10 max-w-2xl mx-auto">
          Visit our SoHo flagship to experience the quality, craftsmanship, and comfort of our full collection. Private consultations available.
        </p>


        <div className="mt-10 h-[480px] w-full overflow-hidden rounded-3xl border border-[--color-border] shadow-[--shadow-card]">
          <iframe
            title="FurnitureLux Showroom Location"
            src="https://www.google.com/maps?q=SoHo,New+York,NY&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>
    </section>
  );
}