// ─── app/order-confirmation/[id]/page.tsx ─────────────────────────────────────
// Order success page — fetches the just-placed order from MongoDB and displays it.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { OrderModel } from "@/lib/models/order.model";
import { ROUTES } from "@/constants/routes";
import { OrderConfirmation } from "@/components/orders";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your FurnitureLux order has been placed successfully.",
  robots: { index: false, follow: false },
};

export default async function OrderConfirmationPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect(ROUTES.SIGN_IN);

  const { id } = await params;

  await connectToDatabase();
  const order = await OrderModel.findById(id).lean().catch(() => null);

  if (!order || order.userId.toString() !== session.user.id) {
    notFound();
  }

  const orderData = {
    id: order._id.toString(),
    status: order.status,
    paymentStatus: order.paymentStatus,
    items: order.items.map((item) => ({
      productId: item.productId.toString(),
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
    shippingAddress: order.shippingAddress,
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total,
    createdAt: order.createdAt.toISOString(),
  };

  return <OrderConfirmation order={orderData} />;
}
