"use client";

import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API registration
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-20 md:py-28 bg-[--color-background]">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-walnut-900 to-charcoal-950 px-8 py-16 md:py-24 text-center text-white shadow-xl"
        >
          {/* Subtle Ambient Background Detail */}
          <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-walnut-400 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-walnut-300 font-sans">
              Private Circle
            </span>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
              Design Inspiration. Direct to Your Inbox.
            </h2>

            <p className="mt-6 text-sm md:text-base text-neutral-300 font-light leading-relaxed max-w-md">
              Subscribe to receive private collection previews, exclusive interior design advice, and members-only invitations.
            </p>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 rounded-2xl border border-walnut-500/30 bg-walnut-500/10 p-6 text-center"
              >
                <h4 className="font-serif text-lg font-medium text-white">Thank you for subscribing</h4>
                <p className="mt-1 text-xs text-neutral-300">We will notify you about the next private showcase release.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 w-full max-w-md flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-full border border-white/20 bg-white/5 px-6 font-sans text-sm text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-white/50 focus:outline-none focus:ring-0"
                />
                <Button
                  type="submit"
                  isLoading={status === "loading"}
                  className="h-12 rounded-full bg-white text-black hover:bg-neutral-100 border-0 font-medium px-8 flex-shrink-0"
                >
                  Join Private List
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
