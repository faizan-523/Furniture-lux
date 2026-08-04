"use client";

// ─── app/admin/products/new/page.tsx ──────────────────────────────────────────
// Route page to add new products to the catalog.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductForm, type ProductFormData } from "@/components/admin";

export default function NewProductPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data: ProductFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error ?? "Failed to publish product.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setSubmitting(false);
      throw err;
    }
  };

  return (
    <Container size="lg" className="py-10">
      {/* Back breadcrumb link */}
      <div className="mb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-xs font-semibold font-sans text-[--color-muted-foreground] hover:text-[--color-foreground] transition-colors"
        >
          <ChevronLeft className="size-3.5" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="font-serif text-3xl font-light tracking-tight text-[--color-foreground]">
          Publish New Design
        </h1>
        <p className="text-xs text-[--color-muted-foreground] font-sans mt-1">
          Complete the details below to add a new luxury handcrafted piece to the shop.
        </p>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        isSubmitting={submitting}
        submitLabel="Publish Product"
      />
    </Container>
  );
}
