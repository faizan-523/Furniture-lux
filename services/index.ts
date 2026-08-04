// ─── services/index.ts ────────────────────────────────────────────────────────
// Service layer for external API calls and data fetching.
// Each service encapsulates a specific domain (products, categories, etc.)

/**
 * Base fetch wrapper with error handling.
 * Use this for all API calls to ensure consistent error handling.
 *
 * @example
 * const products = await apiFetch<Product[]>("/api/products");
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ?? `API error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}
