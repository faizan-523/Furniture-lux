"use client";

// ─── components/layout/Footer.tsx ───────────────────────────────────────────────
// Storefront Footer featuring social media icons, structured links, legal policy,
// and a premium newsletter subscription UI with walnut highlights.

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { SITE_CONFIG } from "@/constants/site";

// ─── Footer Link Groups ────────────────────────────────────────────────────────
const linkGroups = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: ROUTES.SHOP },
      { label: "New Arrivals", href: `${ROUTES.SHOP}?sort=newest` },
      { label: "Best Sellers", href: `${ROUTES.SHOP}?sort=popular` },
      { label: "Sale", href: `${ROUTES.SHOP}?sale=true` },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Living Room", href: `${ROUTES.SHOP}?category=living-room` },
      { label: "Bedroom", href: `${ROUTES.SHOP}?category=bedroom` },
      { label: "Dining Room", href: `${ROUTES.SHOP}?category=dining-room` },
      { label: "Office", href: `${ROUTES.SHOP}?category=office` },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: ROUTES.ABOUT },
      { label: "Blog", href: ROUTES.BLOG },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: ROUTES.CONTACT },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: ROUTES.FAQ },
      { label: "Returns", href: ROUTES.RETURNS },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Care Instructions", href: "/care-guide" },
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: SITE_CONFIG.social.instagram,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm-12-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: SITE_CONFIG.social.facebook,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: SITE_CONFIG.social.twitter,
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Perform newsletter registration action or set simple state
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-[--color-border] bg-[--color-charcoal-950] text-[--color-charcoal-300]">
      <Container>
        {/* Main Grid */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            
            {/* Brand + Newsletter Block */}
            <div className="flex flex-col gap-6 lg:col-span-4">
              <Link
                href={ROUTES.HOME}
                className="inline-flex items-center gap-2.5"
                aria-label={`${SITE_CONFIG.name} — Home`}
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-[--color-accent]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[--color-accent-foreground]"
                    aria-hidden="true"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <span className="font-serif text-xl font-semibold text-white">
                  {SITE_CONFIG.name}
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-[--color-charcoal-400] max-w-sm">
                {SITE_CONFIG.description}
              </p>

              {/* Newsletter Subscription UI */}
              <div className="mt-2 w-full max-w-sm">
                <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                  Subscribe to our Newsletter
                </p>
                {subscribed ? (
                  <div className="text-sm text-[--color-accent] bg-[--color-accent]/10 border border-[--color-accent]/20 rounded-xl px-4 py-3">
                    Thank you for subscribing!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[--color-charcoal-800] border border-[--color-charcoal-700] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[--color-charcoal-500] focus:outline-none focus:border-[--color-accent] w-full"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      className="bg-[--color-accent] text-[--color-accent-foreground] hover:bg-[--color-accent]/90 whitespace-nowrap"
                    >
                      Subscribe
                    </Button>
                  </form>
                )}
              </div>

              {/* Social Media Link Icons */}
              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map(({ label, href, svg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-lg bg-[--color-charcoal-800] text-[--color-charcoal-400] transition-colors hover:bg-[--color-charcoal-700] hover:text-white"
                    aria-label={`Follow us on ${label}`}
                  >
                    {svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links / Navigation Grid columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
              {linkGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white font-sans">
                    {group.title}
                  </h3>
                  <ul className="flex flex-col gap-3" role="list">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-xs md:text-sm text-[--color-charcoal-400] transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </Container>

      {/* Footer Bottom copyright / legal bar */}
      <div className="border-t border-[--color-charcoal-800]">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-[--color-charcoal-500] sm:flex-row">
            <p>
              &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href={ROUTES.PRIVACY_POLICY} className="hover:underline hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href={ROUTES.TERMS_OF_SERVICE} className="hover:underline hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
