"use client";

import { Check, RotateCcw } from "lucide-react";
import {
  SHOP_CATEGORIES,
  SHOP_TAGS,
  PRICE_RANGE,
  type ShopFilters,
} from "@/data/shop";
import { cn } from "@/lib/utils";

interface FiltersProps {
  filters: ShopFilters;
  onChange: (filters: ShopFilters) => void;
  onClear: () => void;
  productCountsByCategory: Record<string, number>;
}

export function Filters({
  filters,
  onChange,
  onClear,
  productCountsByCategory,
}: FiltersProps) {
  const handleCategoryChange = (category: string) => {
    onChange({ ...filters, category });
  };

  const handlePriceChange = (field: "priceMin" | "priceMax", value: number) => {
    onChange({ ...filters, [field]: value });
  };

  const handleInStockChange = (checked: boolean) => {
    onChange({ ...filters, inStockOnly: checked });
  };

  const handleTagToggle = (tag: string) => {
    const isSelected = filters.tags.includes(tag);
    const newTags = isSelected
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onChange({ ...filters, tags: newTags });
  };

  const activeFiltersCount =
    (filters.category !== "all" ? 1 : 0) +
    (filters.priceMin > PRICE_RANGE.min || filters.priceMax < PRICE_RANGE.max ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    filters.tags.length;

  return (
    <div className="flex flex-col gap-8">
      {/* Header with Clear Button */}
      <div className="flex items-center justify-between border-b border-[--color-border] pb-4">
        <h2 className="font-serif text-lg font-semibold tracking-tight text-[--color-foreground]">
          Filters
        </h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[--color-accent] hover:opacity-85 font-sans"
          >
            <RotateCcw className="size-3" />
            Reset ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Category List */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[--color-foreground] font-sans mb-4">
          Rooms
        </h3>
        <ul className="flex flex-col gap-2.5 font-sans text-sm" role="list">
          {SHOP_CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.value;
            const count = productCountsByCategory[cat.value] ?? 0;
            return (
              <li key={cat.value}>
                <button
                  onClick={() => handleCategoryChange(cat.value)}
                  className={cn(
                    "flex w-full items-center justify-between text-left transition-colors hover:text-[--color-foreground]",
                    isSelected
                      ? "font-semibold text-[--color-foreground]"
                      : "text-[--color-muted-foreground]"
                  )}
                >
                  <span>{cat.label}</span>
                  <span className="text-xs opacity-60">({count})</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[--color-foreground] font-sans mb-4">
          Price Range
        </h3>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[--color-muted-foreground]">
              $
            </span>
            <input
              type="number"
              min={PRICE_RANGE.min}
              max={PRICE_RANGE.max}
              value={filters.priceMin || ""}
              onChange={(e) =>
                handlePriceChange("priceMin", Number(e.target.value))
              }
              placeholder={`${PRICE_RANGE.min}`}
              className="h-10 w-full rounded-lg border border-[--color-border] bg-[--color-card] pl-7 pr-3 text-xs focus:border-[--color-ring] focus:outline-none"
            />
          </div>
          <span className="text-[--color-muted-foreground] text-xs">—</span>
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[--color-muted-foreground]">
              $
            </span>
            <input
              type="number"
              min={PRICE_RANGE.min}
              max={PRICE_RANGE.max}
              value={filters.priceMax || ""}
              onChange={(e) =>
                handlePriceChange("priceMax", Number(e.target.value))
              }
              placeholder={`${PRICE_RANGE.max}`}
              className="h-10 w-full rounded-lg border border-[--color-border] bg-[--color-card] pl-7 pr-3 text-xs focus:border-[--color-ring] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Availability Toggle */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[--color-foreground] font-sans mb-4">
          Availability
        </h3>
        <label className="flex items-center gap-3 font-sans text-sm text-[--color-muted-foreground] hover:text-[--color-foreground] cursor-pointer">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => handleInStockChange(e.target.checked)}
              className="peer size-5 cursor-pointer appearance-none rounded border border-[--color-border] bg-[--color-card] checked:bg-[--color-foreground] checked:border-[--color-foreground] focus:ring-0 focus:outline-none"
            />
            <Check className="absolute size-3.5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
          </div>
          <span className={cn(filters.inStockOnly && "font-medium text-[--color-foreground]")}>
            In Stock Only
          </span>
        </label>
      </div>

      {/* Materials & Attributes Tags */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[--color-foreground] font-sans mb-4">
          Material & Style
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {SHOP_TAGS.map((tag) => {
            const isSelected = filters.tags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={cn(
                  "h-8 rounded-full px-4 text-[11px] font-semibold tracking-wide font-sans capitalize transition-all border",
                  isSelected
                    ? "bg-[--color-foreground] text-[--color-background] border-[--color-foreground]"
                    : "bg-[--color-card] text-[--color-muted-foreground] border-[--color-border] hover:border-[--color-charcoal-400] hover:text-[--color-foreground]"
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
