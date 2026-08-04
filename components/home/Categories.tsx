"use client";

import { motion } from "framer-motion";
import { HOMEPAGE_CATEGORIES } from "@/data/home";
import { CategoryCard } from "@/components/common/CategoryCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/ui/Container";

export default function Categories() {
  // We have 5 categories in HOMEPAGE_CATEGORIES
  const firstRow = HOMEPAGE_CATEGORIES.slice(0, 2); // 2 items
  const secondRow = HOMEPAGE_CATEGORIES.slice(2, 5); // 3 items

  return (
    <section className="py-20 md:py-28 bg-[--color-background]">
      <Container size="lg">
        {/* Section Heading */}
        <SectionHeading
          subtitle="Design Collections"
          title="Shop by Curated Spaces"
          divider
        />

        {/* Categories Grid */}
        <div className="flex flex-col gap-6">
          {/* Row 1: Asymmetrical 7-5 split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {firstRow.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className={idx === 0 ? "md:col-span-7" : "md:col-span-5"}
              >
                <CategoryCard category={cat} />
              </motion.div>
            ))}
          </div>

          {/* Row 2: Symmetric 4-4-4 split */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondRow.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
              >
                <CategoryCard category={cat} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
