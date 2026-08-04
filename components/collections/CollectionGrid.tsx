"use client";

// ─── components/collections/CollectionGrid.tsx ────────────────────────────────
// Manages filter state and renders the responsive collection card grid.
// Client component.

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Layers } from "lucide-react";
import { CollectionFilters } from "./CollectionFilters";
import { CollectionCard } from "./CollectionCard";
import { COLLECTIONS, type CollectionTheme } from "@/data/collections";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export function CollectionGrid() {
  const [activeFilter, setActiveFilter] = useState<CollectionTheme>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return COLLECTIONS;
    return COLLECTIONS.filter((c) => c.slug === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="collections-grid"
      aria-label="Collections"
      className="py-16 md:py-24"
    >
      <Container size="lg">
        {/* Section heading */}
        <div className="flex flex-col gap-8 mb-10 md:mb-14">
          <SectionHeading
            title="All Collections"
            subtitle="Browse by Room"
            align="left"
            divider
            className="mb-0"
          />

          {/* Filters + count row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CollectionFilters
              active={activeFilter}
              onChange={setActiveFilter}
            />
            <span className="shrink-0 text-xs text-[--color-muted-foreground] font-sans">
              {filtered.length === 0
                ? "No collections"
                : filtered.length === 1
                ? "1 collection"
                : `${filtered.length} collections`}
            </span>
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState
                icon={<Layers className="size-6" />}
                title="No collections found"
                description="We couldn't find a match for that filter. Try selecting a different room category."
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Bento hero row — first two featured collections get full height */}
              {activeFilter === "all" && filtered.length >= 2 ? (
                <>
                  {/* Featured bento: 1 large + 1 medium side-by-side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    {filtered.slice(0, 2).map((col, i) => (
                      <CollectionCard
                        key={col.id}
                        collection={col}
                        index={i}
                      />
                    ))}
                  </div>

                  {/* Remaining — 3-col grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.slice(2).map((col, i) => (
                      <CollectionCard
                        key={col.id}
                        collection={col}
                        index={i + 2}
                      />
                    ))}
                  </div>
                </>
              ) : (
                /* Filtered view — uniform 3-col grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((col, i) => (
                    <CollectionCard
                      key={col.id}
                      collection={col}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
