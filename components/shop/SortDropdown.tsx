"use client";

import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS, type SortOption } from "@/data/shop";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative inline-block w-full sm:w-[200px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="h-11 w-full appearance-none rounded-full border border-[--color-border] bg-[--color-card] pl-5 pr-10 text-xs font-semibold font-sans tracking-wide text-[--color-foreground] focus:border-[--color-ring] focus:outline-none"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[--color-muted-foreground]">
        <ChevronDown className="size-4" />
      </div>
    </div>
  );
}
