// ─── utils/index.ts ───────────────────────────────────────────────────────────
// Pure utility functions (framework-agnostic)

/**
 * Check if a value is a non-null object.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Check if a value is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Clamp a number between min and max values.
 *
 * @example
 * clamp(150, 0, 100) // 100
 * clamp(-5, 0, 100)  // 0
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Round a number to a specified number of decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Group an array of objects by a key.
 *
 * @example
 * groupBy(products, "category")
 */
export function groupBy<T extends Record<string, unknown>>(
  array: T[],
  key: keyof T,
): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const groupKey = String(item[key]);
      return {
        ...groups,
        [groupKey]: [...(groups[groupKey] ?? []), item],
      };
    },
    {} as Record<string, T[]>,
  );
}

/**
 * Remove duplicate values from an array.
 *
 * @example
 * unique([1, 2, 2, 3]) // [1, 2, 3]
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Pick specific keys from an object.
 *
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ["a", "c"]) // { a: 1, c: 3 }
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
}

/**
 * Omit specific keys from an object.
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ["b"]) // { a: 1, c: 3 }
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result as Omit<T, K>;
}
