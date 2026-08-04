"use client";

// ─── components/wishlist/useWishlist.ts ───────────────────────────────────────
// Persistent client-side wishlist state via localStorage.

import { useState, useEffect, useCallback } from "react";
import { SHOP_PRODUCTS } from "@/data/shop";
import { type Product } from "@/models";

const STORAGE_KEY = "furniturelux_wishlist";

function buildSeedItems(): Product[] {
  return SHOP_PRODUCTS.filter((p) => ["shop-2", "shop-8"].includes(p.id));
}

export function useWishlist() {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setItems(JSON.parse(raw) as Product[]);
      } else {
        const seed = buildSeedItems();
        setItems(seed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      }
    } catch {
      setItems([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const toggleItem = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      if (exists) {
        return prev.filter((i) => i.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const hasItem = useCallback((id: string) => {
    return items.some((i) => i.id === id);
  }, [items]);

  return {
    items,
    hydrated,
    toggleItem,
    hasItem,
  };
}
