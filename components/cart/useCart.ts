"use client";

// ─── components/cart/useCart.ts ───────────────────────────────────────────────
// Synchronized Cart State: LocalStorage (anonymous) & MongoDB (authenticated).
// Merges local items with database cart upon login.

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;        // product id
  name: string;
  slug: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  imageAlt: string;
  quantity: number;
}

const STORAGE_KEY = "furniturelux_cart";

export function useCart() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const isSyncing = useRef(false);

  // Helper: Sync full cart list to database
  const syncToDatabase = async (cartItems: CartItem[]) => {
    if (status !== "authenticated") return;
    try {
      isSyncing.current = true;
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((i) => ({ id: i.id, quantity: i.quantity })),
        }),
      });
      if (res.ok) {
        const json = await res.json();
        setItems(json.items);
      }
    } catch (err) {
      console.error("Failed to sync cart with database:", err);
    } finally {
      isSyncing.current = false;
    }
  };

  // Step 1: Initial hydration & session synchronization
  useEffect(() => {
    const initCart = async () => {
      // A. Load local items first (always handy)
      let localItems: CartItem[] = [];
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        localItems = raw ? JSON.parse(raw) : [];
      } catch {
        localItems = [];
      }

      if (status === "loading") return;

      if (status === "authenticated") {
        // B. Logged in: Load database cart
        try {
          const res = await fetch("/api/cart");
          if (res.ok) {
            const json = await res.json();
            const dbItems = json.items as CartItem[];

            if (localItems.length > 0) {
              // C. Merge local anonymous cart with remote database cart
              const merged = [...dbItems];
              localItems.forEach((local) => {
                const idx = merged.findIndex((m) => m.id === local.id);
                if (idx > -1) {
                  merged[idx]!.quantity = Math.max(merged[idx]!.quantity, local.quantity);
                } else {
                  merged.push(local);
                }
              });

              // D. Save merged cart to DB & clear local anonymous cart
              await syncToDatabase(merged);
              localStorage.removeItem(STORAGE_KEY);
            } else {
              setItems(dbItems);
            }
          }
        } catch (err) {
          console.error("Failed to load authenticated cart:", err);
        }
      } else {
        // E. Logged out: Use client localStorage items
        setItems(localItems);
      }
      setHydrated(true);
    };

    initCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Step 2: Persist anonymous changes to localStorage
  useEffect(() => {
    if (!hydrated || status === "authenticated" || isSyncing.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated, status]);

  // Mutations
  const addItem = useCallback(
    async (item: Omit<CartItem, "quantity">, qty = 1) => {
      let updated: CartItem[];
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          updated = prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
          );
        } else {
          updated = [...prev, { ...item, quantity: qty }];
        }
        return updated;
      });

      // Sync changes if logged in
      if (status === "authenticated") {
        // Compute the hypothetical update for instant db sync
        const nextCart = items.some((i) => i.id === item.id)
          ? items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i))
          : [...items, { ...item, quantity: qty }];
        await syncToDatabase(nextCart);
      }
    },
    [status, items]
  );

  const removeItem = useCallback(
    async (id: string) => {
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (status === "authenticated") {
        const nextCart = items.filter((i) => i.id !== id);
        await syncToDatabase(nextCart);
      }
    },
    [status, items]
  );

  const updateQuantity = useCallback(
    async (id: string, quantity: number) => {
      if (quantity < 1) return;
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
      if (status === "authenticated") {
        const nextCart = items.map((i) => (i.id === id ? { ...i, quantity } : i));
        await syncToDatabase(nextCart);
      }
    },
    [status, items]
  );

  const clearCart = useCallback(async () => {
    setItems([]);
    if (status === "authenticated") {
      await syncToDatabase([]);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [status]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 2000 ? 0 : 195;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return {
    items,
    hydrated,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
