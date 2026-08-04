// ─── app/contact/page.tsx ─────────────────────────────────────────────────────
// Contact page — Server Component.
// All layout logic delegated to focused components.

import type { Metadata } from "next";
import {
  ContactHero,
  ContactForm,
  ContactInfo,
  MapPlaceholder,
  FaqSection,
} from "@/components/contact";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Connect with the FurnitureLux team. Book a private showroom consultation, ask about custom dimensions, or reach our white-glove support concierge.",
  keywords: [
    "furniture showroom NYC",
    "luxury furniture consultation",
    "contact FurnitureLux",
    "bespoke furniture inquiry",
  ],
  openGraph: {
    title: "Contact Us | FurnitureLux",
    description:
      "Reach the FurnitureLux design concierge team for showroom bookings and inquiries.",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      {/* Form + Info side-by-side */}
      <section className="py-20 md:py-28" aria-labelledby="contact-form-heading">
        <Container size="lg">
          <SectionHeading
            title="Send Us a Message"
            subtitle="Get in Touch"
            align="left"
            divider
          />
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
            <ContactForm />
            <ContactInfo />
          </div>
        </Container>
      </section>

      <MapPlaceholder />
      <FaqSection />
    </>
  );
}