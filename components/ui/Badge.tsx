import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-sans font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[--color-primary] text-[--color-primary-foreground]",
        secondary: "bg-[--color-muted] text-[--color-foreground] border border-[--color-border]",
        accent: "bg-[--color-accent] text-[--color-accent-foreground]",
        outline: "border border-[--color-border] text-[--color-foreground]",
        destructive: "bg-[--color-destructive] text-[--color-destructive-foreground]",
        success: "bg-emerald-100 text-emerald-800",
        warning: "bg-amber-100 text-amber-800",
      },
      size: {
        sm: "h-5 px-2 text-[10px] rounded-full",
        md: "h-6 px-2.5 text-xs rounded-full",
        lg: "h-7 px-3 text-sm rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </span>
  );
}
