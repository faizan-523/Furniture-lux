"use client";

// ─── components/layout/PageWrapper.tsx ─────────────────────────────────────────
// Animates page entrances and exits using Framer Motion.
// Wrap page content inside this component to achieve smooth page transitions.

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Apple-like ease-out curve
      className={className}
    >
      {children}
    </motion.div>
  );
}
