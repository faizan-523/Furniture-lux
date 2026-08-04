"use client";

// ─── components/account/ProfileOverview.tsx ──────────────────────────────────
// Summary dashboard shown on /account — recent orders, quick stats, welcome.

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice, formatDate } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: { name: string }[];
}

interface ProfileOverviewProps {
  name: string;
  email: string;
  memberSince: string;
}

const STATUS_BADGE: Record<string, "success" | "warning" | "secondary" | "destructive" | "default"> = {
  pending: "warning",
  processing: "warning",
  shipped: "default",
  delivered: "success",
  cancelled: "destructive",
};

export function ProfileOverview({ name, email, memberSince }: ProfileOverviewProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((j) => { setOrders((j.data ?? []).slice(0, 3)); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome banner */}
      <div className="bg-[--color-foreground] text-white rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[--color-walnut-800] to-[--color-foreground] opacity-60" />
        <div className="relative z-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60 font-sans">
            Welcome back
          </span>
          <h1 className="font-serif text-2xl md:text-3xl font-light mt-1 mb-2">{name}</h1>
          <p className="text-xs text-white/60 font-sans">{email}</p>
          <p className="text-[10px] text-white/40 font-sans mt-1">
            Member since {formatDate(memberSince, { year: "numeric", month: "long" })}
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[
          { icon: Package, label: "Total Orders", value: loading ? "—" : orders.length.toString(), sub: "lifetime", href: ROUTES.ORDERS },
          { icon: Heart, label: "Wishlist", value: "—", sub: "saved items", href: ROUTES.WISHLIST },
          { icon: ShoppingBag, label: "Cart", value: "—", sub: "items added", href: ROUTES.CART },
        ].map(({ icon: Icon, label, value, sub, href }) => (
          <Link
            key={label}
            href={href}
            className="group bg-[--color-card] rounded-2xl border border-[--color-border] p-5 hover:border-[--color-charcoal-400] transition-colors shadow-[--shadow-soft]"
          >
            <Icon className="size-5 text-[--color-accent] mb-3" />
            <p className="font-serif text-2xl font-light text-[--color-foreground]">{value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[--color-muted-foreground] font-sans mt-0.5">{label}</p>
            <p className="text-[10px] text-[--color-muted-foreground] font-sans">{sub}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-[--color-card] rounded-3xl border border-[--color-border] shadow-[--shadow-card] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-[--color-border]">
          <h2 className="font-serif text-lg font-semibold text-[--color-foreground]">
            Recent Orders
          </h2>
          <Link href={ROUTES.ORDERS}>
            <Button variant="ghost" size="sm" className="text-xs rounded-full" rightIcon={<ArrowRight className="size-3.5" />}>
              View All
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="p-6 flex flex-col gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="skeleton h-10 w-10 rounded-xl shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="skeleton h-3 w-2/3 rounded" />
                  <div className="skeleton h-3 w-1/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-[--color-muted-foreground] font-sans">No orders yet.</p>
            <Link href={ROUTES.SHOP} className="mt-3 inline-block">
              <Button variant="outline" size="sm" className="rounded-full">Browse Shop</Button>
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-[--color-border]">
            {orders.map((order) => (
              <li key={order.id}>
                <Link
                  href={ROUTES.ORDER_CONFIRMATION(order.id)}
                  className="flex items-center justify-between px-6 py-4 hover:bg-[--color-muted]/10 transition-colors gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-[--color-muted-foreground] mb-1">
                      #{order.id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-xs font-semibold text-[--color-foreground] font-sans truncate max-w-xs">
                      {order.items.map((i) => i.name).join(", ")}
                    </p>
                    <p className="text-[10px] text-[--color-muted-foreground] font-sans mt-0.5">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant={STATUS_BADGE[order.status] ?? "default"} size="sm">
                      {order.status}
                    </Badge>
                    <span className="text-sm font-semibold text-[--color-foreground] font-sans">
                      {formatPrice(order.total)}
                    </span>
                    <ArrowRight className="size-4 text-[--color-muted-foreground]" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
