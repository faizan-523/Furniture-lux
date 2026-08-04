import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS class names safely, resolving conflicts.
 * This is the primary utility for conditional class composition.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-primary", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a price number to a localized currency string.
 *
 * @example
 * formatPrice(1299.99) // "$1,299.99"
 * formatPrice(1299.99, "EUR", "de-DE") // "1.299,99 €"
 */
export function formatPrice(
  price: number,
  currency: string = "USD",
  locale: string = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Format a date to a human-readable string.
 *
 * @example
 * formatDate(new Date()) // "January 1, 2025"
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  locale: string = "en-US",
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

/**
 * Truncate a string to a specified length with an ellipsis.
 *
 * @example
 * truncate("Hello World", 5) // "Hello..."
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength).trimEnd()}...`;
}

/**
 * Convert a string to a URL-safe slug.
 *
 * @example
 * slugify("Hello World!") // "hello-world"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Capitalize the first letter of each word.
 *
 * @example
 * titleCase("hello world") // "Hello World"
 */
export function titleCase(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Generate a random string ID.
 * Not cryptographically secure — use for UI keys only.
 */
export function generateId(length: number = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * Delay execution for a given number of milliseconds.
 * Useful for simulating async operations in development.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
