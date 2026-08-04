import { type Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}

/**
 * Generate consistent Next.js page metadata.
 * Merges provided options with global site defaults.
 *
 * @example
 * export const metadata = generateMetadata({
 *   title: "About Us",
 *   description: "Learn about FurnitureLux's story.",
 * });
 */
export function generateMetadata({
  title,
  description = SITE_CONFIG.description,
  keywords = [],
  ogImage = SITE_CONFIG.ogImage,
  noIndex = false,
  canonicalUrl,
}: GenerateMetadataOptions = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;

  return {
    title: fullTitle,
    description,
    keywords: ["furniture", "luxury furniture", "home decor", "interior design", ...keywords],
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    ...(canonicalUrl && {
      alternates: { canonical: canonicalUrl },
    }),
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl ?? SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: SITE_CONFIG.twitterHandle,
      images: [ogImage],
    },
  };
}
