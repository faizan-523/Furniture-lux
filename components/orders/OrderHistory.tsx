"use client";

// ─── components/orders/OrderHistory.tsx ──────────────────────────────────────
// Client component listing all past orders for the authenticated user.

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, ChevronRight, Loader2, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice, formatDate } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

interface OrderSummary {
  id: string;
  status: string;
  paymentStatus: string;
  items: { name: string; quantity: number; image: string }[];
  total: number;
  createdAt: string;
}

const STATUS_BADGE: Record<string, "success" | "warning" | "secondary" | "destructive" | "default"> = {
  pending: "warning",
  processing: "warning",
  shipped: "default",
  delivered: "success",
  cancelled: "destructive",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function OrderHistory() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to load order history.");
        const json = await res.json();
        setOrders(json.data);
      } catch {
        setError("Could not load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container size="lg" className="py-16 flex justify-center">
        <Loader2 className="size-8 animate-spin text-[--color-accent]" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="md" className="py-16 text-center">
        <p className="text-sm text-[--color-destructive] font-sans mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline" size="sm">Retry</Button>
      </Container>
    );
  }

  return (
    <Container size="lg" className="py-12">
      {/* Heading */}
      <div className="border-b border-[--color-border] pb-6 mb-8">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[--color-accent] font-sans">
          Purchase History
        </span>
        <h1 className="font-serif text-3xl font-light tracking-tight text-[--color-foreground] mt-1">
          Your Orders
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-5 py-20 border border-dashed border-[--color-border] rounded-3xl text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-[--color-muted]">
            <ShoppingBag className="size-7 text-[--color-muted-foreground]" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-light text-[--color-foreground]">No orders yet</h2>
            <p className="text-sm text-[--color-muted-foreground] font-sans mt-1">
              Your completed orders will appear here.
            </p>
          </div>
          <Link href={ROUTES.SHOP}>
            <Button variant="primary" size="md" className="rounded-full">Browse Collections</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={ROUTES.ORDER_CONFIRMATION(order.id)}
              className="group block bg-[--color-card] rounded-3xl border border-[--color-border] p-6 shadow-[--shadow-soft] hover:border-[--color-charcoal-400] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Icon + Meta */}
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[--color-muted]">
                    <Package className="size-5 text-[--color-muted-foreground]" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-[--color-muted-foreground]">
                        #{order.id.slice(-8).toUpperCase()}
                      </span>
                      <Badge variant={STATUS_BADGE[order.status] ?? "default"} size="sm">
                        {STATUS_LABEL[order.status] ?? order.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-[--color-muted-foreground] font-sans">
                      {formatDate(order.createdAt)} · {order.items.length}{" "}
                      {order.items.length === 1 ? "piece" : "pieces"}
                    </p>
                    <p className="text-xs text-[--color-muted-foreground] font-sans mt-1 truncate max-w-sm">
                      {order.items.map((i) => i.name).join(", ")}
                    </p>
                  </div>
                </div>

                {/* Total + Arrow */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-serif text-lg font-semibold text-[--color-foreground]">
                    {formatPrice(order.total)}
                  </span>
                  <ChevronRight className="size-5 text-[--color-muted-foreground] group-hover:text-[--color-foreground] transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
