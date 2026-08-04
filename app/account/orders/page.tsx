// ─── app/account/orders/page.tsx ──────────────────────────────────────────────
// User order history page. Auth-protected server component.

import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { OrderHistory } from "@/components/orders";

export const metadata: Metadata = {
  title: "Order History",
  description: "View all your past FurnitureLux orders and their delivery status.",
  robots: { index: false, follow: false },
};

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) redirect(ROUTES.SIGN_IN);

  return <OrderHistory />;
}
