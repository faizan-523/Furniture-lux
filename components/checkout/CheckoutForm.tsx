"use client";

// ─── components/checkout/CheckoutForm.tsx ────────────────────────────────────
// Shipping address and mock payment form for checkout submission.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CheckoutFormProps {
  onSuccess: (orderId: string) => void;
}

export function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Address states
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!line1.trim() || !city.trim() || !state.trim() || !postalCode.trim()) {
      setError("Please complete all shipping address fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingAddress: {
            line1: line1.trim(),
            line2: line2.trim() || undefined,
            city: city.trim(),
            state: state.trim(),
            postalCode: postalCode.trim(),
            country: "US",
          },
          paymentMethod: "credit_card",
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error ?? "Failed to place order.");
      }

      onSuccess(result.orderId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-[--color-card] p-8 rounded-3xl border border-[--color-border] shadow-[--shadow-card]">
      <div>
        <h2 className="font-serif text-xl font-semibold text-[--color-foreground]">
          Shipping Details
        </h2>
        <p className="text-xs text-[--color-muted-foreground] font-sans mt-0.5">
          Enter your delivery destination. White-glove logistics will contact you.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-xs px-4 py-3 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* Address Line 1 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold font-sans text-[--color-foreground]">Street Address</label>
        <input
          type="text"
          value={line1}
          onChange={(e) => setLine1(e.target.value)}
          placeholder="123 Mercer Street"
          className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
        />
      </div>

      {/* Address Line 2 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold font-sans text-[--color-foreground]">Suite / Apt (Optional)</label>
        <input
          type="text"
          value={line2}
          onChange={(e) => setLine2(e.target.value)}
          placeholder="Apt 4B"
          className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
        />
      </div>

      {/* Row: City, State, ZIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold font-sans text-[--color-foreground]">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="New York"
            className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold font-sans text-[--color-foreground]">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="NY"
            className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold font-sans text-[--color-foreground]">Postal Code</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="10012"
            className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
          />
        </div>
      </div>

      <div className="border-t border-[--color-border] pt-6">
        <h2 className="font-serif text-xl font-semibold text-[--color-foreground] mb-4">
          Payment Details
        </h2>
        <div className="p-4 rounded-xl border border-[--color-border] bg-[--color-muted]/25 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[--color-foreground] text-white">
            <CreditCard className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[--color-foreground]">Credit / Debit Card</p>
            <p className="text-[10px] text-[--color-muted-foreground] font-sans">Simulated Secure billing transaction</p>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Active
          </span>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={submitting}
        className="rounded-full mt-2"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 size-5 animate-spin" />
            Authorizing payment transaction...
          </>
        ) : (
          "Place Order & Authorize"
        )}
      </Button>
    </form>
  );
}
