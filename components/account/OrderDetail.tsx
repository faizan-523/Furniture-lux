"use client";

// ─── components/account/OrderDetail.tsx ──────────────────────────────────────
// Detailed invoice/receipt panel for a specific order.

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Package, MapPin, CreditCard, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface OrderDetailProps {
  order: {
    id: string;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    createdAt: string;
  };
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

export function OrderDetail({ order }: OrderDetailProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex flex-col gap-3 border-b border-[--color-border] pb-6">
        <Link
          href={ROUTES.ORDERS}
          className="inline-flex items-center gap-1.5 text-xs font-semibold font-sans text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors"
        >
          <ChevronLeft className="size-3.5" /> Back to Orders
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div>
            <h1 className="font-serif text-2xl font-light tracking-tight text-[--color-foreground]">
              Order Details
            </h1>
            <p className="text-xs font-mono text-[--color-muted-foreground] mt-0.5">
              ID: #{order.id.toUpperCase()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={STATUS_BADGE[order.status] ?? "default"} size="md">
              Fulfilment: {STATUS_LABEL[order.status] ?? order.status}
            </Badge>
            <Badge variant="success" size="md">
              Payment: {order.paymentStatus}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left: Items list */}
        <div className="bg-[--color-card] rounded-3xl border border-[--color-border] p-6 shadow-[--shadow-card]">
          <div className="flex items-center gap-2 mb-5">
            <Package className="size-4 text-[--color-accent]" />
            <h2 className="text-xs font-bold uppercase tracking-wider font-sans text-[--color-foreground]">
              Items Snapshot
            </h2>
          </div>
          <ul className="flex flex-col divide-y divide-[--color-border]">
            {order.items.map((item) => (
              <li key={item.productId} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[--color-muted]">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[--color-foreground] font-sans truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-[--color-muted-foreground] font-sans mt-0.5">
                      Qty: {item.quantity} · {formatPrice(item.price)} each
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[--color-foreground] font-sans shrink-0 ml-3">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Summary cards */}
        <div className="flex flex-col gap-6">
          {/* Metadata Card */}
          <div className="bg-[--color-card] rounded-3xl border border-[--color-border] p-6 shadow-[--shadow-card]">
            <h2 className="text-xs font-bold uppercase tracking-wider font-sans text-[--color-foreground] mb-4 flex items-center gap-1.5">
              <Calendar className="size-3.5" /> Order Timeline
            </h2>
            <div className="flex flex-col gap-3 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-[--color-muted-foreground]">Date Placed</span>
                <span className="font-semibold text-[--color-foreground]">
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[--color-muted-foreground]">Payment Method</span>
                <span className="font-semibold text-[--color-foreground] capitalize">
                  {order.paymentMethod.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Address Card */}
          <div className="bg-[--color-card] rounded-3xl border border-[--color-border] p-6 shadow-[--shadow-card]">
            <h2 className="text-xs font-bold uppercase tracking-wider font-sans text-[--color-foreground] mb-4 flex items-center gap-1.5">
              <MapPin className="size-3.5" /> Delivery Address
            </h2>
            <address className="not-italic text-xs text-[--color-muted-foreground] font-sans leading-relaxed">
              {order.shippingAddress.line1}<br />
              {order.shippingAddress.line2 && <>{order.shippingAddress.line2}<br /></>}
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}
            </address>
          </div>

          {/* Invoice Summary Card */}
          <div className="bg-[--color-card] rounded-3xl border border-[--color-border] p-6 shadow-[--shadow-card]">
            <h2 className="text-xs font-bold uppercase tracking-wider font-sans text-[--color-foreground] mb-4 flex items-center gap-1.5">
              <CreditCard className="size-3.5" /> Invoice Totals
            </h2>
            <div className="flex flex-col gap-2 text-xs font-sans border-b border-[--color-border] pb-4">
              <div className="flex justify-between text-[--color-muted-foreground]">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[--color-muted-foreground]">
                <span>Delivery</span>
                <span>
                  {order.shipping === 0 ? (
                    <span className="text-emerald-600 font-semibold">Complimentary</span>
                  ) : (
                    formatPrice(order.shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-[--color-muted-foreground]">
                <span>Tax (8%)</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm font-bold font-sans text-[--color-foreground] pt-4">
              <span>Grand Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
