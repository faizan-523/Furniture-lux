// ─── components/collections/CollectionStatsStrip.tsx ─────────────────────────
// A horizontal stats strip rendered between the hero and the collection grid.
// Server component.

import { Container } from "@/components/ui/Container";
import { COLLECTION_STATS } from "@/data/collections";

export function CollectionStatsStrip() {
  return (
    <div className="border-y border-[--color-border] bg-[--color-muted]/60 py-8">
      <Container size="lg">
        <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-4" role="list">
          {COLLECTION_STATS.map((stat, i) => (
            <li
              key={stat.label}
              className={`flex flex-col items-center text-center gap-1.5 ${
                i > 0
                  ? "border-l border-[--color-border]"
                  : ""
              }`}
            >
              <span className="font-serif text-3xl md:text-4xl font-semibold text-[--color-foreground] leading-none">
                {stat.value}
              </span>
              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-[--color-muted-foreground] font-sans">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
