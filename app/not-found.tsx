import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { generateMetadata as genMeta } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = genMeta({
  title: "Page Not Found",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="flex min-h-[70dvh] items-center py-20" aria-label="Page not found">
      <Container size="sm" className="text-center">
        <p className="font-serif text-[9rem] font-bold leading-none text-[--color-muted] select-none">
          404
        </p>
        <h1 className="mt-4 font-serif text-3xl font-bold text-[--color-foreground] sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-[--color-muted-foreground]">
          We couldn&apos;t find the page you&apos;re looking for. It may have been moved, renamed,
          or it simply doesn&apos;t exist.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="javascript:history.back()" className="inline-flex">
            <Button
              variant="outline"
              size="md"
              leftIcon={<ArrowLeft className="size-4" aria-hidden="true" />}
            >
              Go Back
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Home className="size-4" aria-hidden="true" />}
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
