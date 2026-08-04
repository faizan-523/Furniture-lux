"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { type Benefit } from "@/data/home";

interface FeatureCardProps {
  benefit: Benefit;
  index: number;
}

export function FeatureCard({ benefit, index }: FeatureCardProps) {
  // Dynamically resolve the Lucide icon from the name string
  const IconComponent = (Icons[benefit.iconName] || Icons.HelpCircle) as React.ComponentType<{
    className?: string;
  }>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      whileHover={{ y: -6 }}
      className="flex flex-col items-start rounded-2xl border border-[--color-border] bg-[--color-card] p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-[--color-muted] text-[--color-accent]">
        {IconComponent && <IconComponent className="size-6 stroke-[1.5]" />}
      </div>

      <h3 className="font-serif text-lg font-semibold text-[--color-foreground]">
        {benefit.title}
      </h3>

      <p className="mt-3 font-sans text-sm text-[--color-muted-foreground] leading-relaxed">
        {benefit.description}
      </p>
    </motion.div>
  );
}
