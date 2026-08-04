"use client";

// ─── components/cart/CartContext.tsx ──────────────────────────────────────────
// Shared cart context so all components (Header, ProductCard, CartContent, etc.)
// operate on the same cart state instance.

import { createContext, useContext, type ReactNode } from "react";
import { useCart, type CartItem } from "./useCart";

// ─── Context shape ────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCartContext must be used inside <CartProvider>");
  }
  return ctx;
}
