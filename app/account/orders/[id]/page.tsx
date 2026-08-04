// ─── app/account/orders/[id]/page.tsx ─────────────────────────────────────────
// Order detail invoice viewer route. Auth-protected server component.

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { OrderModel } from "@/lib/models/order.model";
import { ROUTES } from "@/constants/routes";
import { OrderDetail } from "@/components/account";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Order Details",
  description: "View specific FurnitureLux order invoice and delivery information.",
  robots: { index: false, follow: false },
};

export default async function OrderDetailPage({ params }: Props) {
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
    paymentMethod: order.paymentMethod,
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

  return <OrderDetail order={orderData} />;
}
