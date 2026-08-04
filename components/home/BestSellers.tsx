"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HOMEPAGE_PRODUCTS } from "@/data/home";
import { ProductCard } from "@/components/common/ProductCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/ui/Container";

const TABS = [
  { id: "all", name: "All Masterpieces" },
  { id: "living", name: "Living Room" },
  { id: "dining", name: "Dining Room" },
  { id: "lighting", name: "Lighting" },
];

export default function BestSellers() {
  const [activeTab, setActiveTab] = useState("all");

  // Filter best sellers by selected category
  const bestSellers = HOMEPAGE_PRODUCTS.filter((prod) => {
    const isBestSeller = prod.tags.includes("best-seller");
    if (!isBestSeller) return false;
    if (activeTab === "all") return true;
    return prod.category === activeTab;
  });

  return (
    <section className="py-20 md:py-28 bg-[--color-background]">
      <Container size="lg">
        {/* Section Heading */}
        <SectionHeading
          subtitle="Highly Coveted"
          title="Best Selling Classics"
          divider
        />

        {/* Tab Controls (Apple-style pill toggler or Zara-style text links) */}
        <div className="mb-12 flex justify-center border-b border-[--color-border]">
          <div className="flex gap-8 overflow-x-auto pb-px scrollbar-none">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-4 font-sans text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                    isActive ? "text-[--color-foreground]" : "text-[--color-muted-foreground] hover:text-[--color-foreground]"
                  }`}
                >
                  {tab.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[--color-accent]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of Products */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {bestSellers.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
