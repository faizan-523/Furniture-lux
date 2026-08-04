"use client";

// ─── components/search/SearchResults.tsx ──────────────────────────────────────
// Displays search results grid or empty/starting prompt.

import { Search } from "lucide-react";
import { type Product } from "@/models";
import { ProductCard } from "@/components/common/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Container } from "@/components/ui/Container";

interface SearchResultsProps {
  query: string;
  results: Product[];
  onSuggestedClick: (val: string) => void;
}

const POPULAR_SEARCHES = ["Walnut", "Bouclé", "Sofa", "Chair", "Dining", "Lighting"];

export function SearchResults({ query, results, onSuggestedClick }: SearchResultsProps) {
  const trimmedQuery = query.trim();

  // Starting state
  if (!trimmedQuery) {
    return (
      <Container size="lg" className="py-16 text-center">
        <h2 className="font-serif text-lg font-semibold text-[--color-foreground] mb-4">
          Popular Suggestions
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => onSuggestedClick(term)}
              className="h-9 px-5 rounded-full border border-[--color-border] bg-[--color-card] text-xs font-semibold font-sans tracking-wide text-[--color-muted-foreground] transition-colors hover:border-[--color-charcoal-400] hover:text-[--color-foreground]"
            >
              {term}
            </button>
          ))}
        </div>
      </Container>
    );
  }

  // No matches
  if (results.length === 0) {
    return (
      <Container size="lg" className="py-16">
        <EmptyState
          icon={<Search className="size-6" />}
          title="No pieces found"
          description={`We couldn't find any results for "${trimmedQuery}". Try checking the spelling or searching for general rooms.`}
        />
      </Container>
    );
  }

  return (
    <Container size="lg" className="py-16">
      <div className="flex items-center justify-between text-xs text-[--color-muted-foreground] font-sans mb-8">
        <span>
          Found {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{trimmedQuery}&rdquo;
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
