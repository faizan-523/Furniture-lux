"use client";

// ─── components/orders/OrderConfirmation.tsx ──────────────────────────────────
// Visual success page rendered after a successful order placement.

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Package, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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

interface OrderConfirmationProps {
  order: {
    id: string;
    status: string;
    paymentStatus: string;
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    createdAt: string;
  };
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function OrderConfirmation({ order }: OrderConfirmationProps) {
  return (
    <section className="py-16 md:py-24" aria-label="Order Confirmed">
      <Container size="md">
        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-5">
            <div className="flex size-20 items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-200">
              <CheckCircle2 className="size-10 text-emerald-600" />
            </div>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[--color-accent] font-sans">
            Order Confirmed
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[--color-foreground] mt-2 mb-3">
            Thank you for your order
          </h1>
          <p className="text-sm text-[--color-muted-foreground] font-sans max-w-md mx-auto">
            Your order has been placed and will be prepared by our craftsmen. Our logistics team will contact you to arrange white-glove delivery.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 bg-[--color-muted]/40 border border-[--color-border] rounded-full px-5 py-2">
            <span className="text-xs text-[--color-muted-foreground] font-sans">Order ID:</span>
            <span className="text-xs font-semibold font-mono text-[--color-foreground]">{order.id}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Items */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[--color-card] rounded-3xl border border-[--color-border] p-6 shadow-[--shadow-card]"
          >
            <div className="flex items-center gap-2 mb-5">
              <Package className="size-4 text-[--color-accent]" />
              <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-[--color-foreground]">
                Items Ordered
              </h2>
            </div>
            <ul className="flex flex-col divide-y divide-[--color-border]">
              {order.items.map((item) => (
                <li key={item.productId} className="flex gap-3 py-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[--color-muted]">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 items-center justify-between min-w-0">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[--color-foreground] font-sans truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[--color-muted-foreground] font-sans mt-0.5">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[--color-foreground] font-sans shrink-0 ml-3">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Price summary */}
            <div className="mt-4 pt-4 border-t border-[--color-border] flex flex-col gap-1.5">
              {[
                ["Subtotal", formatPrice(order.subtotal)],
                ["Delivery", order.shipping === 0 ? "Complimentary" : formatPrice(order.shipping)],
                ["Tax (8%)", formatPrice(order.tax)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-xs font-sans text-[--color-muted-foreground]">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-bold font-sans text-[--color-foreground] pt-2 mt-1 border-t border-[--color-border]">
                <span>Total Charged</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </motion.div>

          {/* Status + Address */}
          <div className="flex flex-col gap-6">
            {/* Status card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[--color-card] rounded-3xl border border-[--color-border] p-6 shadow-[--shadow-card]"
            >
              <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-[--color-foreground] mb-4">
                Order Status
              </h2>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[--color-muted-foreground] font-sans">Placed</span>
                <span className="text-xs font-semibold text-[--color-foreground] font-sans">
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[--color-muted-foreground] font-sans">Payment</span>
                <span className="text-xs font-semibold text-emerald-600 font-sans capitalize">
                  {order.paymentStatus}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[--color-muted-foreground] font-sans">Fulfilment</span>
                <span className="text-xs font-semibold text-[--color-foreground] font-sans">
                  {STATUS_LABELS[order.status] ?? order.status}
                </span>
              </div>
            </motion.div>

            {/* Address card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[--color-card] rounded-3xl border border-[--color-border] p-6 shadow-[--shadow-card]"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="size-4 text-[--color-accent]" />
                <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-[--color-foreground]">
                  Delivery Address
                </h2>
              </div>
              <address className="not-italic text-xs text-[--color-muted-foreground] font-sans leading-relaxed">
                {order.shippingAddress.line1}<br />
                {order.shippingAddress.line2 && <>{order.shippingAddress.line2}<br /></>}
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                {order.shippingAddress.country}
              </address>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-3"
            >
              <Link href={ROUTES.ORDERS}>
                <Button variant="primary" size="md" fullWidth className="rounded-full" rightIcon={<ArrowRight className="size-4" />}>
                  View Order History
                </Button>
              </Link>
              <Link href={ROUTES.SHOP}>
                <Button variant="outline" size="md" fullWidth className="rounded-full">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
