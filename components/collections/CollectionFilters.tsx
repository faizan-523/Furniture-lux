"use client";

// ─── components/collections/CollectionFilters.tsx ─────────────────────────────
// Horizontal scrollable filter tabs for filtering collections by room category.
// Client component — manages active filter state.

import { COLLECTION_FILTERS, type CollectionTheme } from "@/data/collections";
import { cn } from "@/lib/utils";

interface CollectionFiltersProps {
  active: CollectionTheme;
  onChange: (value: CollectionTheme) => void;
}

export function CollectionFilters({ active, onChange }: CollectionFiltersProps) {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide"
      role="tablist"
      aria-label="Filter by room"
    >
      {COLLECTION_FILTERS.map((filter) => {
        const isActive = active === filter.value;
        return (
          <button
            key={filter.value}
            role="tab"
            aria-selected={isActive}
            id={`filter-${filter.value}`}
            onClick={() => onChange(filter.value)}
            className={cn(
              "relative shrink-0 h-9 px-5 rounded-full text-xs font-semibold font-sans tracking-wide transition-all duration-200 whitespace-nowrap",
              isActive
                ? "bg-[--color-foreground] text-[--color-background] shadow-sm"
                : "bg-[--color-muted] text-[--color-muted-foreground] border border-[--color-border] hover:bg-[--color-charcoal-100] hover:text-[--color-foreground]",
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
