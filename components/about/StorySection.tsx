// ─── components/about/StorySection.tsx ────────────────────────────────────────
// Brand story and heritage split section.
// Server Component.

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function StorySection() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="story-heading">
      <Container size="lg">
        {/* First Story Block: The Genesis */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6 animate-fade-in">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[--color-accent] font-sans">
              Est. 2011
            </span>
            <h2 id="story-heading" className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[--color-foreground] mt-2.5 mb-6 leading-tight">
              An Obsession with Material Integrity
            </h2>
            <div className="flex flex-col gap-4 font-sans text-sm md:text-base text-[--color-muted-foreground] font-light leading-relaxed">
              <p>
                FurnitureLux was founded out of frustration with the compromise of modern mass production. We watched heirloom joinery be replaced by veneer, and solid hardwoods swapped for fiberboard. We decided to chart a different course.
              </p>
              <p>
                Our search took us from the sustainably managed walnut forests of North America to heritage upholstery studios in the outskirts of Milan. We sought workshops that still measure in lifetimes rather than quarters.
              </p>
              <p className="font-serif italic text-[--color-foreground] border-l-2 border-[--color-accent] pl-4 my-2">
                "We do not design furniture simply to fill a room. We design furniture to anchor the memories that unfold within it."
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[--color-muted] lg:col-span-6 shadow-[--shadow-card]">
            <Image
              src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&auto=format&fit=crop"
              alt="Hand-crafted walnut joinery processes"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-103"
            />
          </div>
        </div>

        {/* Second Story Block: The Craft (Inverted Layout) */}
        <div className="mt-20 grid grid-cols-1 items-center gap-12 lg:mt-32 lg:grid-cols-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[--color-muted] lg:col-span-6 order-last lg:order-first shadow-[--shadow-card]">
            <Image
              src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop"
              alt="Honing travertine surfaces by hand"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-103"
            />
          </div>

          <div className="lg:col-span-6">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[--color-accent] font-sans">
              The Process
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[--color-foreground] mt-2.5 mb-6 leading-tight">
              Kiln-Dried hard wood & Travertine Stone
            </h2>
            <div className="flex flex-col gap-4 font-sans text-sm md:text-base text-[--color-muted-foreground] font-light leading-relaxed">
              <p>
                Every piece of wood is dried in specialized kilns to a precise 6-8% moisture level. This prevents splitting, warping, and shrinkage when the wood moves into different climates, ensuring the joint remains intact forever.
              </p>
              <p>
                Our travertine stone is sourced from historic Italian quarries. Hand-selected slabs are finished using a honed technique that preserves the natural surface voids, giving each console and nesting table a unique organic identity.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
