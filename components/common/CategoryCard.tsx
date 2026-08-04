"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type Category } from "@/models";
import { ROUTES } from "@/constants/routes";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const imageUrl = category.image?.url ?? "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600";
  const imageAlt = category.image?.alt ?? category.name;

  return (
    <Link
      href={ROUTES.COLLECTION(category.slug)}
      className={`group relative block h-[420px] w-full overflow-hidden rounded-3xl bg-[--color-muted] ${className}`}
    >
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Info Panel: Glassmorphism / Sleek Layout */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md transition-all duration-300 group-hover:bg-white/15">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-semibold text-white tracking-wide">
                {category.name}
              </h3>
              {category.description && (
                <p className="mt-1 font-sans text-xs text-white/80 line-clamp-1 max-w-[85%]">
                  {category.description}
                </p>
              )}
            </div>

            <motion.div
              whileHover={{ x: 3 }}
              className="flex size-9 items-center justify-center rounded-full bg-white text-black transition-colors"
            >
              <ArrowRight className="size-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </Link>
  );
}
