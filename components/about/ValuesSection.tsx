// ─── components/about/ValuesSection.tsx ───────────────────────────────────────
// Core values / brand pillars section using the UI Card component.
// Server Component.

import { Award, ShieldCheck, Trees, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";

interface ValueItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const VALUES: ValueItem[] = [
  {
    icon: <Trees className="size-6 text-[--color-accent]" />,
    title: "Sustainably Forested Wood",
    description:
      "All wooden structures are crafted from FSC-certified American Walnut and White Oak, harvested from managed forests that prioritize biodiversity.",
  },
  {
    icon: <Award className="size-6 text-[--color-accent]" />,
    title: "Artisanal Execution",
    description:
      "Every single joint, stitching line, and finishing stroke is completed by hand in small heritage European workshops keeping the craft alive.",
  },
  {
    icon: <Truck className="size-6 text-[--color-accent]" />,
    title: "White-Glove Assembly",
    description:
      "We assemble your furniture in your room of choice, position it precisely, and clear away all packaging materials cleanly.",
  },
  {
    icon: <ShieldCheck className="size-6 text-[--color-accent]" />,
    title: "Lifetime Warranty",
    description:
      "We stand behind our craftsmanship. Enjoy a lifetime structural warranty on the frame of all sofas, lounge chairs, and dining tables.",
  },
];

export function ValuesSection() {
  return (
    <section className="py-20 md:py-28 bg-[--color-muted]/40 border-y border-[--color-border]" aria-labelledby="values-heading">
      <Container size="lg">
        <SectionHeading
          title="The Core Pillars of FurnitureLux"
          subtitle="Brand Philosophy"
          divider
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((item) => (
            <Card key={item.title} hoverEffect="lift" variant="default" className="bg-[--color-card]">
              <CardContent className="flex flex-col items-center text-center p-8">
                <div className="flex items-center justify-center size-12 rounded-full bg-[--color-muted] mb-6">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-[--color-foreground] mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[--color-muted-foreground] font-light leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
