"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  divider?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  divider = false,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isLeft = align === "left";
  const isRight = align === "right";

  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 mb-12 md:mb-16",
        isCenter && "items-center text-center",
        isLeft && "items-start text-left",
        isRight && "items-end text-right",
        className,
      )}
    >
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="text-xs font-semibold tracking-[0.25em] uppercase text-[--color-accent] font-sans"
        >
          {subtitle}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[--color-foreground] leading-tight"
      >
        {title}
      </motion.h2>

      {divider && (
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "3rem" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="h-[2px] bg-[--color-accent] mt-2 rounded-full"
        />
      )}
    </div>
  );
}
