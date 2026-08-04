"use client";

// ─── components/search/SearchHero.tsx ─────────────────────────────────────────
// Large, immersive search banner for the dedicated Search page.

import { Search, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ROUTES } from "@/constants/routes";

interface SearchHeroProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchHero({ value, onChange }: SearchHeroProps) {
  return (
    <section className="bg-[--color-foreground] text-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[--color-walnut-400] via-[--color-walnut-300] to-transparent opacity-60" />

      <Container size="lg" className="relative z-10 flex flex-col gap-6">
        <Breadcrumb
          items={[{ label: "Search", href: "/search" }]}
          className="text-white/50 [&_a]:text-white/50 [&_a:hover]:text-white/95 [&_svg]:text-white/30 py-0"
        />

        <div className="max-w-2xl mt-2 animate-slide-up">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[--color-walnut-300] font-sans">
            Search Catalogue
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mt-2 mb-6">
            Find Your Piece
          </h1>

          {/* Large Search Bar */}
          <div className="relative w-full max-w-xl font-sans">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/40">
              <Search className="size-5" />
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search by room, material, or color (e.g. Walnut, Sofa)..."
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 pl-12 pr-12 text-sm text-white placeholder-white/50 transition-all focus:border-[--color-walnut-300] focus:bg-white/15 focus:outline-none"
              autoFocus
            />
            {value && (
              <button
                onClick={() => onChange("")}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/50 hover:text-white"
                aria-label="Clear search"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
