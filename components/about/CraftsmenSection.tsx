// ─── components/about/CraftsmenSection.tsx ────────────────────────────────────
// Showcases the regional European workshops and artisans behind the brand.
// Server Component.

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ArtisanStudio {
  name: string;
  location: string;
  specialty: string;
  image: string;
  desc: string;
}

const STUDIOS: ArtisanStudio[] = [
  {
    name: "Crespi Upholstery Studio",
    location: "Monza, Italy",
    specialty: "Fine Textiles & Bouclé Work",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
    desc: "Led by three generations of the Crespi family, this studio performs all the hand-tufting and texturized bouclé upholstery wrapping on our sofas and lounge seating.",
  },
  {
    name: "The Miller Brother Mill",
    location: "Oregon, USA",
    specialty: "Kiln-Dried American Walnut",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop",
    desc: "Supplies and mills our solid American Walnut. Every board is graded for straightness of grain and finished using custom organic plant-based oils.",
  },
  {
    name: "Benedetti Stone Carvers",
    location: "Verona, Italy",
    specialty: "Travertine & Marble Sculpting",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
    desc: "Master stonemasons who carve and hone our Verona nesting table sets. Each piece displays natural cavities and characteristics unique to Verona quarries.",
  },
];

export function CraftsmenSection() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="craftsmen-heading">
      <Container size="lg">
        <SectionHeading
          title="Meet the Master Workshops"
          subtitle="Regional Artisans"
          divider
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STUDIOS.map((studio) => (
            <article
              key={studio.name}
              className="group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[--color-muted] mb-5 shadow-sm">
                <Image
                  src={studio.image}
                  alt={studio.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-103"
                />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[--color-accent] font-sans">
                {studio.specialty}
              </span>
              <h3 className="font-serif text-lg font-semibold text-[--color-foreground] mt-1.5 mb-2">
                {studio.name}
              </h3>
              <p className="text-[11px] text-[--color-muted-foreground] font-sans font-medium mb-3">
                {studio.location}
              </p>
              <p className="font-sans text-xs text-[--color-muted-foreground] font-light leading-relaxed">
                {studio.desc}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
