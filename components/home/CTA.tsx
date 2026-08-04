"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

export default function CTA() {
  return (
    <section className="relative h-[65vh] min-h-[480px] w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-black/55 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop"
          alt="Bespoke luxury interior room"
          fill
          className="object-cover object-center transition-transform duration-1000"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center text-center text-white">
        <Container size="lg" className="w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="max-w-2xl"
          >
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[--color-walnut-300] font-sans">
              Bespoke Spaces
            </span>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
              Create Your Perfect Living Sanctuary
            </h2>

            <p className="mt-6 text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-md mx-auto">
              Collaborate with our design consultants to curate a space tailored to your exact lifestyle and aesthetic preferences.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href={ROUTES.SHOP}>
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-full bg-white text-black hover:bg-neutral-100 border-0 font-medium"
                  rightIcon={<ArrowRight className="size-4" />}
                >
                  Shop The Collections
                </Button>
              </Link>
              <Link href={ROUTES.CONTACT}>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/30 text-white hover:bg-white/10 hover:border-white font-medium"
                >
                  Book Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
