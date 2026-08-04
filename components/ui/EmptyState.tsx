// ─── components/ui/EmptyState.tsx ─────────────────────────────────────────────
// Displays a structured message, icon, and call-to-action button when content is missing.
// E.g., for empty carts, wishlist, search results, or order history.

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 py-14 md:p-16 md:py-20 border border-dashed border-[--color-border] rounded-2xl bg-[--color-card]/30",
        className,
      )}
    >
      {icon && (
        <div className="flex items-center justify-center size-14 md:size-16 rounded-full bg-[--color-muted] text-[--color-muted-foreground] mb-5">
          {icon}
        </div>
      )}
      <h3 className="font-serif text-lg md:text-xl font-semibold text-[--color-foreground] mb-2">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-[--color-muted-foreground] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {action && <div className="flex justify-center w-full">{action}</div>}
    </div>
  );
}
