"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to error reporting service (e.g., Sentry)
    console.error("Application error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[70dvh] items-center py-20" aria-label="Error occurred">
      <Container size="sm" className="text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-red-50">
          <AlertTriangle className="size-8 text-[--color-destructive]" aria-hidden="true" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[--color-foreground] sm:text-4xl">
          Something Went Wrong
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-[--color-muted-foreground]">
          We encountered an unexpected error. Our team has been notified. Please try again.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-[--color-muted-foreground]">
            Error ID: <code className="font-mono">{error.digest}</code>
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            size="md"
            leftIcon={<RefreshCcw className="size-4" aria-hidden="true" />}
            onClick={reset}
          >
            Try Again
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Home className="size-4" aria-hidden="true" />}
            >
              Go Home
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
