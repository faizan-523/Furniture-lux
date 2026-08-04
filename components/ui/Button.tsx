import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────
const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2",
    "font-sans font-medium tracking-wide",
    "border border-transparent",
    "transition-all duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[--color-primary] text-[--color-primary-foreground]",
          "hover:opacity-90 active:scale-[0.98]",
          "focus-visible:ring-[--color-ring]",
        ],
        secondary: [
          "bg-[--color-muted] text-[--color-foreground]",
          "border-[--color-border]",
          "hover:bg-[--color-charcoal-100] active:scale-[0.98]",
          "focus-visible:ring-[--color-ring]",
        ],
        outline: [
          "bg-transparent text-[--color-foreground]",
          "border-[--color-border]",
          "hover:bg-[--color-muted] active:scale-[0.98]",
          "focus-visible:ring-[--color-ring]",
        ],
        ghost: [
          "bg-transparent text-[--color-foreground]",
          "hover:bg-[--color-muted] active:scale-[0.98]",
          "focus-visible:ring-[--color-ring]",
        ],
        accent: [
          "bg-[--color-accent] text-[--color-accent-foreground]",
          "hover:opacity-90 active:scale-[0.98]",
          "focus-visible:ring-[--color-ring]",
        ],
        destructive: [
          "bg-[--color-destructive] text-[--color-destructive-foreground]",
          "hover:opacity-90 active:scale-[0.98]",
          "focus-visible:ring-[--color-destructive]",
        ],
      },
      size: {
        xs: "h-7 px-3 text-xs rounded-md",
        sm: "h-9 px-4 text-sm rounded-lg",
        md: "h-11 px-6 text-sm rounded-xl",
        lg: "h-12 px-8 text-base rounded-xl",
        xl: "h-14 px-10 text-lg rounded-2xl",
        icon: "size-10 rounded-xl",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled ?? isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="size-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";

// Re-export variants for external use
export { buttonVariants };
