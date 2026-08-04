// ─── app/admin/layout.tsx ────────────────────────────────────────────────────
// Layout file to secure all admin routes.
// Checks user role from session. Redirects to sign-in if not authenticated or not an admin.

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Container } from "@/components/ui/Container";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  // Secure: check if logged in and if role is "admin"
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    redirect(ROUTES.SIGN_IN);
  }

  return (
    <div className="min-h-screen bg-[--color-muted]/10">
      {/* Sub-header for Admin Context */}
      <div className="bg-[--color-foreground] text-white py-4 border-b border-white/10">
        <Container size="lg" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-semibold tracking-tight text-white">
              FurnitureLux Admin
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/80">
              Management Portal
            </span>
          </div>
          <div className="text-xs text-white/60 font-sans">
            Logged in as <span className="text-white font-medium">{session.user.name}</span>
          </div>
        </Container>
      </div>
      <main>{children}</main>
    </div>
  );
}
