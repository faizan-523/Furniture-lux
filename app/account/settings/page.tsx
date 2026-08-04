// ─── app/account/settings/page.tsx ───────────────────────────────────────────
// Account settings page (name + password update).

import type { Metadata } from "next";
import { auth } from "@/auth";
import { ProfileSettings } from "@/components/account";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Update your FurnitureLux profile information and password.",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const session = await auth();
  return (
    <ProfileSettings
      initialName={session!.user!.name ?? ""}
      email={session!.user!.email ?? ""}
    />
  );
}
