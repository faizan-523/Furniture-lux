"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/home";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/ui/Container";

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-[--color-muted]/30">
      <Container size="lg">
        {/* Section Heading */}
        <SectionHeading
          subtitle="Client Stories"
          title="Endorsed by Designers & Collectors"
          divider
        />

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
              className="relative flex flex-col justify-between rounded-3xl border border-[--color-border] bg-[--color-card] p-8 shadow-sm"
            >
              {/* Quote Mark / Floating Element */}
              <div className="absolute top-6 right-6 text-[--color-muted-foreground]/15">
                <Quote className="size-10 stroke-[1.5]" />
              </div>

              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 text-[--color-accent] mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current stroke-[1]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-serif text-base italic text-[--color-foreground] leading-relaxed mb-8">
                  &ldquo;{testimonial.review}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-[--color-border]/60 pt-6 mt-auto">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover border border-[--color-border]"
                />
                <div>
                  <h4 className="font-sans text-sm font-semibold text-[--color-foreground]">
                    {testimonial.name}
                  </h4>
                  <p className="font-sans text-xs text-[--color-muted-foreground]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
