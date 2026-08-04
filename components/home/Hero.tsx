"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HERO_SLIDES } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Auto-play slideshow
  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide]!;

  // Framer Motion variants
  const slideVariants = {
    enter: () => ({
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 1.0,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: customDelay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-black">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 h-full w-full"
          >
            {/* Dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/30 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
            {/* The Image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover object-center animate-[kenburns_40s_ease-out_infinite]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <Container size="lg" className="w-full">
          <div className="max-w-2xl text-white">
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide} initial="hidden" animate="visible" exit="hidden">
                <motion.span
                  variants={textVariants}
                  custom={0}
                  className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-[--color-walnut-300] font-sans"
                >
                  {slide.subtitle}
                </motion.span>

                <motion.h1
                  variants={textVariants}
                  custom={0.15}
                  className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05]"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  variants={textVariants}
                  custom={0.3}
                  className="mt-6 text-base sm:text-lg text-charcoal-200 font-light leading-relaxed max-w-xl text-neutral-300"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  variants={textVariants}
                  custom={0.45}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  <Link href={slide.primaryCtaLink}>
                    <Button
                      variant="primary"
                      size="lg"
                      className="rounded-full bg-white text-black hover:bg-neutral-100 border-0 font-medium"
                    >
                      {slide.primaryCtaText}
                    </Button>
                  </Link>
                  <Link href={slide.secondaryCtaLink}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full border-white/30 text-white hover:bg-white/10 hover:border-white font-medium"
                    >
                      {slide.secondaryCtaText}
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 right-6 sm:right-12 z-20 flex items-center gap-3">
        <button
          onClick={prevSlide}
          className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black hover:border-white"
          aria-label="Previous slide"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          onClick={nextSlide}
          className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black hover:border-white"
          aria-label="Next slide"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>

      {/* Indicators and Stats Overlay (Descriptive, Modern, Zara Home vibe) */}
      <div className="absolute bottom-10 left-6 sm:left-12 z-20 hidden md:flex items-center gap-8 text-white/60 text-xs">
        <div className="flex gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentSlide ? 1 : -1);
                setCurrentSlide(idx);
              }}
              className={`h-1 transition-all rounded-full ${
                currentSlide === idx ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        
        <div className="h-4 w-px bg-white/20" />
        
        <div className="flex gap-6 font-sans tracking-wide">
          <div>
            <span className="font-semibold text-white">25K+</span> Happy Clients
          </div>
          <div>
            <span className="font-semibold text-white">500+</span> Bespoke Products
          </div>
          <div>
            <span className="font-semibold text-white">15+</span> Years Heritage
          </div>
        </div>
      </div>
    </section>
  );
}