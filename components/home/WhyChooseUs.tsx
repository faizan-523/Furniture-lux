"use client";

import { BENEFITS_DATA } from "@/data/home";
import { FeatureCard } from "@/components/common/FeatureCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/ui/Container";

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-[--color-background]">
      <Container size="lg">
        {/* Section Heading */}
        <SectionHeading
          subtitle="Our Standards of Luxury"
          title="Exceptional Materiality & Service"
          divider
        />

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS_DATA.map((benefit, index) => (
            <FeatureCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
