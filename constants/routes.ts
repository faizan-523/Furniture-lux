/**
 * Type-safe route constants.
 * Use these instead of hard-coding paths throughout the app.
 */
export const ROUTES = {
  // ─── Public ───────────────────────────────────────────────────────────────
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  BLOG: "/blog",
  FAQ: "/faq",

  // ─── Shop ─────────────────────────────────────────────────────────────────
  SHOP: "/shop",
  PRODUCTS: "/products",
  PRODUCT: (slug: string) => `/products/${slug}`,
  COLLECTIONS: "/collections",
  COLLECTION: (slug: string) => `/collections/${slug}`,

  // ─── Auth ─────────────────────────────────────────────────────────────────
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",

  // ─── Account ──────────────────────────────────────────────────────────────
  ACCOUNT: "/account",
  ORDERS: "/account/orders",
  WISHLIST: "/account/wishlist",
  SETTINGS: "/account/settings",

  // ─── Cart & Checkout ──────────────────────────────────────────────────────
  CART: "/cart",
  CHECKOUT: "/checkout",
  ORDER_CONFIRMATION: (id: string) => `/order-confirmation/${id}`,

  // ─── Legal ────────────────────────────────────────────────────────────────
  PRIVACY_POLICY: "/legal/privacy-policy",
  TERMS_OF_SERVICE: "/legal/terms-of-service",
  RETURNS: "/legal/returns",
} as const;

export type Routes = typeof ROUTES;
