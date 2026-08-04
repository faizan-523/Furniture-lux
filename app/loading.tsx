import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="flex min-h-[70dvh] items-center justify-center py-20" aria-label="Loading">
      <Container size="sm" className="text-center">
        {/* Spinner */}
        <div className="mx-auto mb-6 flex size-16 items-center justify-center" aria-hidden="true">
          <svg
            className="size-10 animate-spin text-[--color-primary]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>

        {/* Skeleton placeholders */}
        <div className="space-y-3" aria-hidden="true">
          <div className="skeleton mx-auto h-8 w-64 rounded-xl" />
          <div className="skeleton mx-auto h-4 w-48 rounded-lg" />
          <div className="skeleton mx-auto h-4 w-32 rounded-lg" />
        </div>

        <p className="sr-only">Loading page content, please wait…</p>
      </Container>
    </div>
  );
}
