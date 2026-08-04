"use client";

// ─── components/contact/FaqSection.tsx ────────────────────────────────────────
// Animated accordion FAQ section.
// Client Component.

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Do you offer worldwide shipping?",
    answer:
      "Yes. We partner with white-glove freight specialists to deliver to most countries worldwide. Shipping times and costs are calculated at checkout based on your location and the size of your order.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard white-glove delivery within the continental US takes 7–14 business days. International orders typically arrive within 3–5 weeks depending on customs and destination.",
  },
  {
    question: "Can I request custom dimensions or fabric choices?",
    answer:
      "Absolutely. We offer bespoke sizing and material customisation on most of our upholstered pieces. Book a design consultation via our showroom and our specialists will guide you through available options.",
  },
  {
    question: "What does the Lifetime Structural Warranty cover?",
    answer:
      "Our lifetime warranty covers the internal hardwood frame of all sofas, lounge chairs, and dining chairs. It does not cover fabric wear, surface scratches, or damage from misuse. The warranty is transferable to a new owner once.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "We accept returns within 30 days of delivery for items in their original, undamaged condition. Custom and bespoke orders are non-refundable. Please contact our support team to initiate a return.",
  },
  {
    question: "Do you have a physical showroom I can visit?",
    answer:
      "Yes — our flagship showroom is located at 142 Mercer Street, SoHo, New York. Open Monday–Saturday from 10:00 AM to 7:00 PM. Private design consultations are available by appointment on Sundays.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28" aria-labelledby="faq-heading">
      <Container size="lg" className="max-w-4xl">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="FAQs"
          divider
        />

        <div className="flex flex-col gap-3 mt-4">
          {FAQS.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div
                key={index}
                className={cn(
                  "rounded-2xl border bg-[--color-card] overflow-hidden transition-colors duration-200",
                  isOpen
                    ? "border-[--color-accent]/40 shadow-sm"
                    : "border-[--color-border]"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left font-sans"
                >
                  <span
                    className={cn(
                      "text-sm font-semibold leading-snug transition-colors",
                      isOpen
                        ? "text-[--color-foreground]"
                        : "text-[--color-foreground]"
                    )}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-[--color-muted-foreground] transition-transform duration-300",
                      isOpen && "rotate-180 text-[--color-accent]"
                    )}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 font-sans text-xs md:text-sm text-[--color-muted-foreground] font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}