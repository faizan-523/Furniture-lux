"use client";

// ─── app/admin/products/[id]/edit/page.tsx ────────────────────────────────────
// Route page to edit existing catalog products.

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductForm, type ProductFormData } from "@/components/admin";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [initialData, setInitialData] = useState<Partial<ProductFormData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Could not find product data.");
        const json = await res.json();
        setInitialData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Sync error.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (data: ProductFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error ?? "Failed to save product updates.");
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
          Update Inventory Profile
        </h1>
        <p className="text-xs text-[--color-muted-foreground] font-sans mt-1">
          Modify details, pricing, stock levels, or images for this product.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="size-8 animate-spin text-[--color-accent]" />
          <p className="text-sm text-[--color-muted-foreground] font-sans">Syncing product profile...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-[--color-card] border border-dashed border-[--color-border] rounded-2xl max-w-3xl mx-auto">
          <p className="text-sm text-red-500 font-sans">{error}</p>
        </div>
      ) : (
        initialData && (
          <ProductForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isSubmitting={submitting}
            submitLabel="Save Changes"
          />
        )
      )}
    </Container>
  );
}
