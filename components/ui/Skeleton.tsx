// ─── components/ui/Skeleton.tsx ───────────────────────────────────────────────
// Loading placeholder component with shimmer animation.
// Used for displaying state transitions and placeholders during data fetching.

import { cn } from "@/lib/utils";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton bg-[--color-muted] w-full h-4 rounded-md",
        className,
      )}
      {...props}
    />
  );
}
