"use client";

// ─── providers/index.tsx ──────────────────────────────────────────────────────
// Root client-side providers wrapper.
// Add context providers here — they wrap the entire app.

import { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/components/cart";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Root providers wrapper.
 * All client-side context providers should be added here.
 *
 * @example
 * // In app/layout.tsx:
 * <Providers>
 *   {children}
 * </Providers>
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  );
}
