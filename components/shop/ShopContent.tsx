"use client";

import { useState, useMemo } from "react";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Filters,
  SearchBar,
  SortDropdown,
  ProductGrid,
  Pagination,
} from "./index";
import {
  SHOP_PRODUCTS,
  DEFAULT_FILTERS,
  PRODUCTS_PER_PAGE,
  PRICE_RANGE,
  type ShopFilters,
  type SortOption,
} from "@/data/shop";
import { Container } from "@/components/ui/Container";

export function ShopContent() {
  const [filters, setFilters] = useState<ShopFilters>(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // ─── Calculate category counts based on entire dataset ─────────────────────
  const productCountsByCategory = useMemo(() => {
    const counts: Record<string, number> = { all: SHOP_PRODUCTS.length };
    SHOP_PRODUCTS.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, []);

  // ─── Filter & Sort Logic ───────────────────────────────────────────────────
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...SHOP_PRODUCTS];

    // Category
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price
    if (filters.priceMin > PRICE_RANGE.min) {
      result = result.filter((p) => p.price >= filters.priceMin);
    }
    if (filters.priceMax < PRICE_RANGE.max) {
      result = result.filter((p) => p.price <= filters.priceMax);
    }

    // In Stock
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Tags (AND filter: must have all selected tags)
    if (filters.tags.length > 0) {
      result = result.filter((p) =>
        filters.tags.every((tag) => p.tags.includes(tag))
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        // Featured items first (items with 'featured' tag)
        result.sort((a, b) => {
          const aFeatured = a.tags.includes("featured") ? 1 : 0;
          const bFeatured = b.tags.includes("featured") ? 1 : 0;
          return bFeatured - aFeatured;
        });
        break;
    }

    return result;
  }, [filters, searchQuery, sortBy]);

  // ─── Pagination ────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PRODUCTS_PER_PAGE
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredAndSortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  const handleFilterChange = (newFilters: ShopFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // reset to first page when filter changes
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1); // reset to first page when search changes
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <Container size="lg" className="py-12 md:py-16">
      {/* Search & Sort Controls Header */}
      <div className="flex flex-col gap-4 border-b border-[--color-border] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 max-w-md">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </div>
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex h-11 items-center gap-2 rounded-full border border-[--color-border] bg-[--color-card] px-5 text-xs font-semibold font-sans tracking-wide text-[--color-foreground] hover:bg-[--color-muted] lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            Filters
          </button>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mt-8 flex gap-10">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden w-[260px] shrink-0 lg:block">
          <div className="sticky top-24">
            <Filters
              filters={filters}
              onChange={handleFilterChange}
              onClear={handleClearFilters}
              productCountsByCategory={productCountsByCategory}
            />
          </div>
        </aside>

        {/* Product Grid and Pagination Area */}
        <main className="flex-1">
          <div className="mb-6 flex items-center justify-between text-xs text-[--color-muted-foreground] font-sans">
            <span>
              Showing {filteredAndSortedProducts.length === 0 ? 0 : (currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
              {Math.min(currentPage * PRODUCTS_PER_PAGE, filteredAndSortedProducts.length)} of{" "}
              {filteredAndSortedProducts.length} results
            </span>
          </div>

          <ProductGrid products={paginatedProducts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-black"
            />
            {/* Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed bottom-0 right-0 top-0 z-[110] flex w-full max-w-[320px] flex-col bg-[--color-card] p-6 shadow-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-serif text-lg font-semibold text-[--color-foreground]">
                  Filters
                </span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="rounded-full p-2 text-[--color-muted-foreground] hover:bg-[--color-muted] hover:text-[--color-foreground]"
                  aria-label="Close filters menu"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-2">
                <Filters
                  filters={filters}
                  onChange={handleFilterChange}
                  onClear={handleClearFilters}
                  productCountsByCategory={productCountsByCategory}
                />
              </div>
              <div className="mt-6 border-t border-[--color-border] pt-4">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full h-11 rounded-full bg-[--color-foreground] text-[--color-background] text-xs font-semibold tracking-wide"
                >
                  Apply Filters ({filteredAndSortedProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Container>
  );
}
