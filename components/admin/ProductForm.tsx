"use client";

// ─── components/admin/ProductForm.tsx ─────────────────────────────────────────
// Multi-field form for creating and updating products.
// Handles state for fields, auto-slugification, and dynamic image URLs.

import { useState } from "react";
import { Plus, Trash2, Loader2, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ImageInput {
  url: string;
  alt: string;
}

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  images: ImageInput[];
  category: "living" | "dining" | "bedroom" | "lighting" | "outdoor" | "workspace";
  tags: string[];
  stock: number;
  featured: boolean;
}

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
}

export function ProductForm({ initialData, onSubmit, isSubmitting, submitLabel }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [price, setPrice] = useState(initialData?.price?.toString() ?? "");
  const [compareAtPrice, setCompareAtPrice] = useState(initialData?.compareAtPrice?.toString() ?? "");
  const [category, setCategory] = useState<ProductFormData["category"]>(initialData?.category ?? "living");
  const [stock, setStock] = useState(initialData?.stock?.toString() ?? "10");
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(", ") ?? "");

  // Dynamic image list
  const [images, setImages] = useState<ImageInput[]>(
    initialData?.images?.length ? initialData.images : [{ url: "", alt: "" }]
  );

  const [validationError, setValidationError] = useState<string | null>(null);

  // Auto-slugify helper
  const handleAutoSlug = () => {
    const slugified = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(slugified);
  };

  const handleAddImage = () => {
    setImages([...images, { url: "", alt: "" }]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, key: keyof ImageInput, val: string) => {
    setImages(images.map((img, i) => (i === index ? { ...img, [key]: val } : img)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Basic validation
    if (!name.trim()) return setValidationError("Product Name is required.");
    if (!slug.trim() || !/^[a-z0-9-]+$/.test(slug)) {
      return setValidationError("Slug must contain only lowercase letters, numbers, and hyphens.");
    }
    if (Number(price) <= 0 || isNaN(Number(price))) {
      return setValidationError("Price must be a valid number greater than 0.");
    }
    const filteredImages = images.filter((img) => img.url.trim());
    if (filteredImages.length === 0) {
      return setValidationError("At least one image URL is required.");
    }

    const payload: ProductFormData = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
      images: filteredImages.map((img) => ({
        url: img.url.trim(),
        alt: img.alt.trim() || name.trim(),
      })),
      category,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      stock: parseInt(stock, 10) || 0,
      featured,
    };

    try {
      await onSubmit(payload);
    } catch (err) {
      setValidationError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-3xl mx-auto bg-[--color-card] p-8 rounded-3xl border border-[--color-border] shadow-[--shadow-card]">
      {validationError && (
        <div className="bg-red-50 text-red-700 text-xs px-4 py-3 rounded-xl border border-red-200">
          {validationError}
        </div>
      )}

      {/* Row: Name & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold font-sans text-[--color-foreground]">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Walnut Dining Table"
            className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold font-sans text-[--color-foreground]">Slug</label>
            <button
              type="button"
              onClick={handleAutoSlug}
              className="text-[10px] text-[--color-accent] font-semibold hover:opacity-85 font-sans"
            >
              Auto-generate
            </button>
          </div>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="walnut-dining-table"
            className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
          />
        </div>
      </div>

      {/* Row: Price, compare price & Stock */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold font-sans text-[--color-foreground]">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="2499"
            className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold font-sans text-[--color-foreground]">Compare At Price ($)</label>
          <input
            type="number"
            value={compareAtPrice}
            onChange={(e) => setCompareAtPrice(e.target.value)}
            placeholder="e.g. 2999"
            className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold font-sans text-[--color-foreground]">Initial Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="10"
            className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
          />
        </div>
      </div>

      {/* Category, Tags & Featured */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold font-sans text-[--color-foreground]">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductFormData["category"])}
            className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none bg-[--color-card]"
          >
            <option value="living">Living Room</option>
            <option value="dining">Dining Room</option>
            <option value="bedroom">Bedroom</option>
            <option value="lighting">Lighting</option>
            <option value="outdoor">Outdoor</option>
            <option value="workspace">Workspace</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold font-sans text-[--color-foreground]">Tags (comma separated)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="best-seller, walnut, featured"
            className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 mt-5">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="size-4 rounded"
          />
          <label htmlFor="featured" className="text-xs font-semibold font-sans text-[--color-foreground] cursor-pointer">
            Feature this product
          </label>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold font-sans text-[--color-foreground]">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe details, craft, materials..."
          rows={4}
          className="p-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
        />
      </div>

      {/* Dynamic Images */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold font-sans text-[--color-foreground]">Product Images</label>
          <button
            type="button"
            onClick={handleAddImage}
            className="flex items-center gap-1 text-[11px] text-[--color-accent] font-semibold hover:opacity-85 font-sans"
          >
            <Plus className="size-3" /> Add Image
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {images.map((img, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={img.url}
                  onChange={(e) => handleImageChange(i, "url", e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="h-10 px-4 rounded-xl border border-[--color-border] text-xs focus:border-[--color-ring] focus:outline-none flex-1"
                />
                <input
                  type="text"
                  value={img.alt}
                  onChange={(e) => handleImageChange(i, "alt", e.target.value)}
                  placeholder="Image description (Alt)"
                  className="h-10 px-4 rounded-xl border border-[--color-border] text-xs focus:border-[--color-ring] focus:outline-none"
                />
              </div>
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="text-red-500 hover:text-red-700 transition-colors shrink-0"
                  aria-label="Remove image URL"
                >
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4 border-t border-[--color-border] pt-6">
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Processing...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}
