// ─── app/admin/page.tsx ──────────────────────────────────────────────────────
// Admin Dashboard portal entry page.

import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Catalogue Portal",
  description: "Products management portal for FurnitureLux administrators.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
