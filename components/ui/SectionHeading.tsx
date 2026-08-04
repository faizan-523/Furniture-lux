// ─── components/ui/SectionHeading.tsx ─────────────────────────────────────────
// Elegant header style for sections, aligning with the luxury aesthetic.
// Offers alignment support (left/center/right) and an optional accent line.

import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  divider?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  divider = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 mb-10 md:mb-14",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        align === "right" && "items-end text-right",
        className,
      )}
    >
      {subtitle && (
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-[--color-accent] font-sans">
          {subtitle}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[--color-foreground] leading-tight">
        {title}
      </h2>
      {divider && (
        <div className="h-0.5 w-12 bg-[--color-accent] mt-1.5 rounded-full" />
      )}
    </div>
  );
}
