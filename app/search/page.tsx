"use client";

// ─── app/search/page.tsx ──────────────────────────────────────────────────────
// Search page — Client Component.

import { useState, useMemo } from "react";
import { SearchHero, SearchResults } from "@/components/search";
import { SHOP_PRODUCTS } from "@/data/shop";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return SHOP_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.description.toLowerCase().includes(trimmed) ||
        p.tags.some((t) => t.toLowerCase().includes(trimmed))
    );
  }, [query]);

  return (
    <main>
      <SearchHero value={query} onChange={setQuery} />
      <SearchResults
        query={query}
        results={filteredProducts}
        onSuggestedClick={setQuery}
      />
    </main>
  );
}
