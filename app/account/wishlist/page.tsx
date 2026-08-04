"use client";

// ─── app/account/wishlist/page.tsx ────────────────────────────────────────────
// Wishlist curation page.

import { useWishlist, WishlistHero, WishlistGrid } from "@/components/wishlist";

export default function WishlistPage() {
  const { items, hydrated } = useWishlist();

  return (
    <main>
      <WishlistHero itemCount={items.length} hydrated={hydrated} />
      <WishlistGrid items={items} hydrated={hydrated} />
    </main>
  );
}
