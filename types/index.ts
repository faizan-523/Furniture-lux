import type { ComponentType } from "react";

// Global TypeScript types for the FurnitureLux application


// ─── Utility Types ────────────────────────────────────────────────────────────

/** Make all properties of T optional recursively */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

/** Extract the value types from an object */
export type ValueOf<T> = T[keyof T];

/** Make specific keys required */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Nullable helper */
export type Nullable<T> = T | null;

/** Optional helper */
export type Maybe<T> = T | null | undefined;

/** Awaited return type helper */
export type AsyncReturnType<T extends (...args: unknown[]) => Promise<unknown>> = Awaited<
  ReturnType<T>
>;

// ─── API Types ────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: Record<string, string[]>;
}

// ─── UI Types ─────────────────────────────────────────────────────────────────

export type ColorScheme = "light" | "dark" | "system";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive";

export type Align = "left" | "center" | "right";

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

// ─── Navigation Types ─────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
  children?: NavItem[];
  isExternal?: boolean;
  badge?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ─── Form Types ───────────────────────────────────────────────────────────────

export type FormStatus = "idle" | "loading" | "success" | "error";

export interface FormState<T = unknown> {
  status: FormStatus;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}
