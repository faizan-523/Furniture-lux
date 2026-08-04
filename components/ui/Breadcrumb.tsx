// ─── components/ui/Breadcrumb.tsx ─────────────────────────────────────────────
// Accessible breadcrumb navigation.
// Standardizes navigation tracing across collections, pages, and products.

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center text-[11px] md:text-xs text-[--color-muted-foreground] py-4",
        className,
      )}
    >
      <ol className="flex items-center gap-1.5 md:gap-2 flex-wrap" role="list">
        {/* Home Root link */}
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[--color-foreground] transition-colors"
          >
            <Home className="size-3.5" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* Dynamic Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5 md:gap-2">
              <ChevronRight
                className="size-3 text-[--color-border] shrink-0"
                aria-hidden="true"
              />
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-medium text-[--color-foreground] truncate max-w-[120px] sm:max-w-none"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[--color-foreground] transition-colors truncate max-w-[120px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
