"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 py-14 border border-[--color-border] rounded-2xl bg-[--color-muted]/20 animate-fade-in">
        <div className="flex items-center justify-center size-14 rounded-full bg-emerald-50 text-emerald-600 mb-5">
          <CheckCircle2 className="size-7" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-[--color-foreground] mb-2">
          Message Sent Successfully
        </h3>
        <p className="font-sans text-xs text-[--color-muted-foreground] max-w-sm mb-6 leading-relaxed">
          Thank you for reaching out. Our design concierge team has received your inquiry and will contact you within 24 business hours.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStatus("idle")}
          className="rounded-full"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-[--color-muted-foreground] font-sans">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Victoria Sterling"
            className="h-11 rounded-lg border border-[--color-border] bg-[--color-card] px-4 text-sm focus:border-[--color-ring] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-[--color-muted-foreground] font-sans">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="victoria@sterling.com"
            className="h-11 rounded-lg border border-[--color-border] bg-[--color-card] px-4 text-sm focus:border-[--color-ring] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-[--color-muted-foreground] font-sans">
          Subject / Inquiry Type
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="Showroom Consultation Booking"
          className="h-11 rounded-lg border border-[--color-border] bg-[--color-card] px-4 text-sm focus:border-[--color-ring] focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-[--color-muted-foreground] font-sans">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please specify any dimensions, fabric choices, or general spaces you are looking to design."
          className="rounded-lg border border-[--color-border] bg-[--color-card] p-4 text-sm focus:border-[--color-ring] focus:outline-none resize-none font-sans"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={status === "loading"}
        className="rounded-full mt-2"
        rightIcon={<Send className="size-4" />}
      >
        Send Message
      </Button>
    </form>
  );
}
