"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center justify-center gap-2 py-10"
      aria-label="Pagination Navigation"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex size-10 items-center justify-center rounded-full border border-[--color-border] bg-[--color-card] text-[--color-foreground] transition-all hover:bg-[--color-muted] disabled:pointer-events-none disabled:opacity-40"
        aria-label="Go to previous page"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex size-10 items-center justify-center rounded-full text-xs font-semibold font-sans tracking-wide transition-all border",
              isActive
                ? "bg-[--color-foreground] text-[--color-background] border-[--color-foreground]"
                : "bg-[--color-card] text-[--color-muted-foreground] border-[--color-border] hover:border-[--color-charcoal-400] hover:text-[--color-foreground]"
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex size-10 items-center justify-center rounded-full border border-[--color-border] bg-[--color-card] text-[--color-foreground] transition-all hover:bg-[--color-muted] disabled:pointer-events-none disabled:opacity-40"
        aria-label="Go to next page"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
