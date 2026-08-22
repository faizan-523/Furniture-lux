"use client";

// ─── components/layout/Header.tsx ───────────────────────────────────────────────
// Sticky Header Navigation with search, cart, and account options.
// Fully responsive. Integrates Framer Motion for smooth menu dropdown and drawer animations.

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  Heart,
  User,
  LogOut,
  Settings,
  Package,
  ChevronDown,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ROUTES } from "@/constants/routes";
import { SITE_CONFIG } from "@/constants/site";
import { useCartContext } from "@/components/cart";


// ─── Nav Links ────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Shop", href: ROUTES.SHOP },
  { label: "Collections", href: ROUTES.COLLECTIONS },
  { label: "About", href: ROUTES.ABOUT },
  { label: "Contact", href: ROUTES.CONTACT },
];

// ─── User Avatar ──────────────────────────────────────────────────────────────
function UserAvatar({ name, image }: { name?: string | null; image?: string | null }) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name ?? "User avatar"}
        width={32}
        height={32}
        unoptimized
        className="size-full rounded-full object-cover"
      />
    );
  }
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <span className="text-[11px] font-semibold text-[--color-primary-foreground]">
      {initials}
    </span>
  );
}

// ─── Auth Menu (desktop dropdown with Framer Motion) ─────────────────────────
function AuthMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Loading state skeleton
  if (status === "loading") {
    return <div className="skeleton size-9 rounded-full" aria-hidden="true" />;
  }

  // Unauthenticated — Sign In button
  if (!session?.user) {
    return (
      <Link href={ROUTES.SIGN_IN}>
        <Button variant="primary" size="sm" className="gap-1.5 bg-[--color-primary] text-[--color-primary-foreground] hover:opacity-90">
          <LogIn className="size-3.5" aria-hidden="true" />
          Sign In
        </Button>
      </Link>
    );
  }

  // Authenticated — User Avatar and Dropdown Menu
  const { user } = session;

  return (
    <div ref={menuRef} className="relative">
      <button
        id="user-menu-button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="user-menu"
        className="flex items-center gap-2 rounded-xl p-1 pr-2.5 hover:bg-[--color-muted] transition-colors"
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-[--color-primary] overflow-hidden">
          <UserAvatar name={user.name} image={user.image} />
        </div>
        <span className="hidden xl:block max-w-[120px] truncate text-sm font-medium text-[--color-foreground]">
          {user.name}
        </span>
        <ChevronDown
          className={cn(
            "size-3.5 text-[--color-muted-foreground] transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            id="user-menu"
            role="menu"
            aria-labelledby="user-menu-button"
            className="absolute right-0 top-full mt-2 w-52 origin-top-right rounded-2xl border border-[--color-border] bg-[--color-card] p-1.5 shadow-[--shadow-elevated] z-50"
          >
            {/* User profile details */}
            <div className="mb-1 px-3 py-2">
              <p className="truncate text-sm font-semibold text-[--color-foreground]">
                {user.name}
              </p>
              <p className="truncate text-xs text-[--color-muted-foreground]">
                {user.email}
              </p>
            </div>
            <div className="my-1 h-px bg-[--color-border]/50" />

            {/* Menu options */}
            <Link
              href={ROUTES.ACCOUNT}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-[--color-foreground] hover:bg-[--color-muted] transition-colors"
            >
              <User className="size-4 text-[--color-muted-foreground]" aria-hidden="true" />
              My Account
            </Link>
            <Link
              href={ROUTES.ORDERS}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-[--color-foreground] hover:bg-[--color-muted] transition-colors"
            >
              <Package className="size-4 text-[--color-muted-foreground]" aria-hidden="true" />
              Orders
            </Link>
            <Link
              href={ROUTES.WISHLIST}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-[--color-foreground] hover:bg-[--color-muted] transition-colors"
            >
              <Heart className="size-4 text-[--color-muted-foreground]" aria-hidden="true" />
              Wishlist
            </Link>
            <Link
              href={ROUTES.SETTINGS}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-[--color-foreground] hover:bg-[--color-muted] transition-colors"
            >
              <Settings className="size-4 text-[--color-muted-foreground]" aria-hidden="true" />
              Settings
            </Link>

            <div className="my-1 h-px bg-[--color-border]/50" />

            {/* Sign out Option */}
            <button
              role="menuitem"
              onClick={async () => {
                setOpen(false);
                await signOut({ redirect: false });
                window.location.href = "/";
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-[--color-destructive] hover:bg-[--color-destructive]/8 transition-colors text-left"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Header Main Component ───────────────────────────────────────────────────
export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { itemCount: cartItemCount, hydrated: cartHydrated } = useCartContext();
  const [hydratedCart, setHydratedCart] = useState(false);

  useEffect(() => {
    setHydratedCart(true);
  }, []);


  // Monitor scroll positioning to update transparency & border
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer menu on navigation changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "bg-[--color-card]/90 backdrop-blur-md shadow-[--shadow-soft] border-b border-[--color-border]"
          : "bg-[--color-card] border-b border-transparent",
      )}
    >
      {/* Keyboard Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[--color-primary] focus:text-[--color-primary-foreground] focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Container>
        <nav
          className="flex h-16 items-center justify-between gap-8 lg:h-20"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo Brand Title */}
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2.5 shrink-0"
            aria-label={`${SITE_CONFIG.name} — Home`}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[--color-primary]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[--color-primary-foreground]"
                  aria-hidden="true"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="font-serif text-xl font-semibold tracking-tight text-[--color-foreground]">
                {SITE_CONFIG.name}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Link items */}
          <ul className="hidden lg:flex items-center gap-1.5" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all rounded-lg duration-200",
                    "hover:text-[--color-primary] hover:bg-[--color-muted]",
                    pathname === link.href
                      ? "text-[--color-primary] bg-[--color-muted]"
                      : "text-[--color-muted-foreground]",
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-[--color-accent] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href={ROUTES.SHOP}
              className="flex size-10 items-center justify-center rounded-xl text-[--color-muted-foreground] hover:text-[--color-foreground] hover:bg-[--color-muted] transition-colors"
              aria-label="Search"
            >
              <Search className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href={ROUTES.WISHLIST}
              className="flex size-10 items-center justify-center rounded-xl text-[--color-muted-foreground] hover:text-[--color-foreground] hover:bg-[--color-muted] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href={ROUTES.CART}
              className="relative flex size-10 items-center justify-center rounded-xl text-[--color-muted-foreground] hover:text-[--color-foreground] hover:bg-[--color-muted] transition-colors"
              aria-label={`Shopping bag (${hydratedCart && cartHydrated ? cartItemCount : 0} items)`}
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
              {(hydratedCart && cartHydrated && cartItemCount > 0) ? (
                <span
                  className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-[--color-accent] text-[8px] font-bold text-[--color-accent-foreground]"
                  aria-hidden="true"
                >
                  {cartItemCount}
                </span>
              ) : null}
            </Link>


            {/* Auth Dropdown or SignIn CTA */}
            <div className="ml-2">
              <AuthMenu />
            </div>
          </div>

          {/* Mobile Menu Action Toggle */}
          <button
            className="flex size-10 items-center justify-center rounded-xl text-[--color-foreground] hover:bg-[--color-muted] transition-colors lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </Container>

      {/* Animated Mobile Dropdown Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden border-t border-[--color-border] bg-[--color-card]"
            aria-hidden={!isMobileMenuOpen}
          >
            <Container>
              <div className="py-5">
                <ul className="flex flex-col gap-1" role="list">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center px-4 py-3 text-base font-medium rounded-xl transition-colors",
                          pathname === link.href
                            ? "bg-[--color-muted] text-[--color-primary]"
                            : "text-[--color-muted-foreground] hover:bg-[--color-muted] hover:text-[--color-foreground]",
                        )}
                        aria-current={pathname === link.href ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Mobile Auth Actions */}
                <div className="mt-4 flex flex-col gap-2.5 px-4 pt-4 border-t border-[--color-border]/60">
                  {session?.user ? (
                    <>
                      {/* Authenticated info display */}
                      <div className="flex items-center gap-3 rounded-xl bg-[--color-muted] px-4 py-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-[--color-primary] overflow-hidden shrink-0">
                          <UserAvatar
                            name={session.user.name}
                            image={session.user.image}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[--color-foreground]">
                            {session.user.name}
                          </p>
                          <p className="truncate text-xs text-[--color-muted-foreground]">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                      <Link href={ROUTES.ACCOUNT} className="w-full">
                        <Button variant="outline" size="md" fullWidth>
                          My Account
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="md"
                        fullWidth
                        onClick={async () => {
                          await signOut({ redirect: false });
                          window.location.href = "/";
                        }}
                        className="text-[--color-destructive] hover:bg-[--color-destructive]/5"
                      >
                        <LogOut className="size-4" aria-hidden="true" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      {/* Unauthenticated CTAs */}
                      <Link href={ROUTES.SIGN_IN} className="w-full">
                        <Button variant="outline" size="md" fullWidth>
                          Sign In
                        </Button>
                      </Link>
                      <Link href={ROUTES.SIGN_UP} className="w-full">
                        <Button variant="primary" size="md" fullWidth>
                          Create Account
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
