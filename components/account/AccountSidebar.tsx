"use client";

// ─── components/account/AccountSidebar.tsx ───────────────────────────────────
// Persistent navigation sidebar for the account section.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { ROUTES } from "@/constants/routes";

const NAV_ITEMS = [
  { href: ROUTES.ACCOUNT, label: "Overview", icon: User, exact: true },
  { href: ROUTES.ORDERS, label: "My Orders", icon: Package, exact: false },
  { href: ROUTES.WISHLIST, label: "Wishlist", icon: Heart, exact: false },
  { href: `${ROUTES.ACCOUNT}/settings`, label: "Settings", icon: Settings, exact: false },
];

interface AccountSidebarProps {
  user: { name: string; email: string; image: string | null };
}

export function AccountSidebar({ user }: AccountSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="flex flex-col gap-6">
      {/* Avatar + Name */}
      <div className="bg-[--color-card] rounded-3xl border border-[--color-border] p-6 text-center shadow-[--shadow-card]">
        <div className="flex size-16 items-center justify-center rounded-full bg-[--color-foreground] text-white font-serif text-2xl font-light mx-auto mb-3 select-none">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <p className="font-serif text-base font-semibold text-[--color-foreground] truncate">
          {user.name}
        </p>
        <p className="text-[11px] text-[--color-muted-foreground] font-sans truncate mt-0.5">
          {user.email}
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-[--color-card] rounded-3xl border border-[--color-border] p-3 shadow-[--shadow-card]">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-xs font-semibold font-sans transition-colors ${
                    active
                      ? "bg-[--color-foreground] text-white"
                      : "text-[--color-muted-foreground] hover:bg-[--color-muted]/40 hover:text-[--color-foreground]"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                </Link>
              </li>
            );
          })}

          {/* Sign out */}
          <li className="mt-2 border-t border-[--color-border] pt-2">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-xs font-semibold font-sans text-[--color-muted-foreground] hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="size-4 shrink-0" />
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
