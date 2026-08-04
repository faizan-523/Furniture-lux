"use client";

// ─── components/collections/CollectionCard.tsx ────────────────────────────────
// Premium collection card with image, glassmorphism panel, hover animations,
// season / "New" badges, product count, and tag chips.

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { type CollectionEntry } from "@/data/collections";
import { ROUTES } from "@/constants/routes";

interface CollectionCardProps {
  collection: CollectionEntry;
  /** For staggered entrance animation */
  index?: number;
}

export function CollectionCard({ collection, index = 0 }: CollectionCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={ROUTES.COLLECTION(collection.slug)}
        className="group block relative h-[420px] md:h-[480px] w-full overflow-hidden rounded-3xl bg-[--color-muted] shadow-[--shadow-card] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] focus-visible:ring-offset-2"
        aria-label={`View ${collection.name} collection`}
      >
        {/* Background image */}
        <Image
          src={collection.cardImage}
          alt={collection.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

        {/* Hover tint overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/20"
            />
          )}
        </AnimatePresence>

        {/* Top badges */}
        <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
          {collection.isNew && (
            <Badge
              variant="accent"
              size="md"
              className="uppercase tracking-widest text-[10px] shadow-sm"
            >
              New
            </Badge>
          )}
          {collection.season && (
            <Badge
              variant="secondary"
              size="md"
              className="bg-white/15 backdrop-blur-md border-white/20 text-white text-[10px] tracking-widest uppercase"
            >
              {collection.season}
            </Badge>
          )}
        </div>

        {/* Product count badge — top right */}
        <div className="absolute top-5 right-5 z-10 flex items-center gap-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/15 px-3 py-1.5">
          <Package className="size-3 text-white/70" aria-hidden="true" />
          <span className="text-[10px] font-semibold text-white/80 font-sans tracking-wide">
            {collection.productCount} pieces
          </span>
        </div>

        {/* Bottom info panel */}
        <div className="absolute bottom-5 left-5 right-5 z-10">
          <motion.div
            animate={{ y: hovered ? -4 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="rounded-2xl border border-white/12 bg-white/10 p-5 backdrop-blur-md"
          >
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                {/* Tagline */}
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60 font-sans mb-1">
                  {collection.tagline}
                </p>

                {/* Name */}
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-white tracking-wide leading-tight">
                  {collection.name}
                </h3>

                {/* Tag chips */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {collection.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 px-2.5 py-0.5 text-[10px] text-white/65 font-sans capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow CTA */}
              <motion.div
                animate={{ x: hovered ? 3 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 flex size-10 items-center justify-center rounded-full bg-white text-black shadow-md"
                aria-hidden="true"
              >
                <ArrowRight className="size-4" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}
