"use client";

// ─── components/ui/Card.tsx ───────────────────────────────────────────────────
// Premium luxury card layout.
// Modular subcomponents (CardImage, CardHeader, CardContent, CardFooter)
// support flexible content configurations with elegant hover animations.

import { type ReactNode, type HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverEffect?: "lift" | "border" | "none";
  variant?: "default" | "flat" | "outline";
}

export function Card({
  className,
  children,
  hoverEffect = "lift",
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col relative rounded-2xl overflow-hidden transition-all duration-300",
        // Variant configurations
        variant === "default" &&
          "bg-[--color-card] border border-[--color-border] shadow-[--shadow-soft]",
        variant === "flat" && "bg-[--color-muted]",
        variant === "outline" && "bg-transparent border border-[--color-border]",
        // Hover effects
        hoverEffect === "lift" &&
          "hover:-translate-y-1 hover:shadow-[--shadow-card]",
        hoverEffect === "border" && "hover:border-[--color-accent]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Card Image subcomponent ──────────────────────────────────────────────────
export function CardImage({
  className,
  src,
  alt,
  zoom = true,
  aspectRatio = "aspect-square",
}: {
  className?: string;
  src: string;
  alt: string;
  zoom?: boolean;
  aspectRatio?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden w-full bg-[--color-muted] group/card-img",
        aspectRatio,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn(
          "object-cover transition-transform duration-500 ease-out",
          zoom && "group-hover/card-img:scale-105",
        )}
      />
    </div>
  );
}

// ─── Card Header subcomponent ─────────────────────────────────────────────────
export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("p-5 pb-3 flex flex-col gap-1", className)}>
      {children}
    </div>
  );
}

// ─── Card Content subcomponent ────────────────────────────────────────────────
export function CardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-5 py-2 flex-1 flex flex-col", className)}>
      {children}
    </div>
  );
}

// ─── Card Footer subcomponent ─────────────────────────────────────────────────
export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "p-5 pt-3 border-t border-[--color-border]/30 flex items-center justify-between gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
