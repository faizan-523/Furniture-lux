// ─── app/account/page.tsx ─────────────────────────────────────────────────────
// Account overview / dashboard page.

import type { Metadata } from "next";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/lib/models/user.model";
import { ProfileOverview } from "@/components/account";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your FurnitureLux account, orders, and preferences.",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await auth();
  // Layout already guards auth — session is always present here
  await connectToDatabase();
  const user = await UserModel.findById(session!.user!.id).lean();

  return (
    <ProfileOverview
      name={user?.name ?? session!.user!.name ?? "Member"}
      email={user?.email ?? session!.user!.email ?? ""}
      memberSince={user?.createdAt?.toISOString() ?? new Date().toISOString()}
    />
  );
}
