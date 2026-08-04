// ─── app/account/layout.tsx ───────────────────────────────────────────────────
// Shared layout for all /account/* pages.
// Server-side auth guard + persistent sidebar navigation.

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { AccountSidebar } from "@/components/account/AccountSidebar";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect(ROUTES.SIGN_IN);

  const user = {
    name: session.user.name ?? "Member",
    email: session.user.email ?? "",
    image: session.user.image ?? null,
  };

  return (
    <div className="min-h-screen bg-[--color-muted]/10">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr] items-start">
          {/* Sidebar */}
          <AccountSidebar user={user} />
          {/* Page content */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
