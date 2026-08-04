import { type Product, type Category } from "@/models";

export interface HeroSlide {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: "ShieldCheck" | "Truck" | "Sparkles" | "Award" | "Clock" | "HeartHandshake";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
}

// ─── Hero Slides ─────────────────────────────────────────────────────────────
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-1",
    subtitle: "The Autographe Collection",
    title: "Timeless Design. Crafted For Comfort.",
    description: "Experience the fusion of Italian heritage craftsmanship and modern organic minimalism. Hand-selected walnut and premium bouclé textures curated to elevate your sanctuary.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    primaryCtaText: "Shop Collection",
    primaryCtaLink: "/shop",
    secondaryCtaText: "Explore Spaces",
    secondaryCtaLink: "/collections",
  },
  {
    id: "hero-2",
    subtitle: "Mid-Century Refined",
    title: "Organic Curves Meets Pure Walnut.",
    description: "Introducing dining and living room essentials crafted from sustainably sourced kiln-dried American walnut wood. Designed for conversations that flow into the night.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
    primaryCtaText: "View Dining",
    primaryCtaLink: "/collections/dining",
    secondaryCtaText: "Book Design Consultation",
    secondaryCtaLink: "/contact",
  },
  {
    id: "hero-3",
    subtitle: "Modern Luxury Solitude",
    title: "Transform Rooms Into Masterpieces.",
    description: "Every item is a statement. Explore premium top-grain leather armchairs and solid travertine tables engineered to last a lifetime.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
    primaryCtaText: "Shop Lounge",
    primaryCtaLink: "/collections/living",
    secondaryCtaText: "Our Story",
    secondaryCtaLink: "/about",
  }
];

// ─── Categories ──────────────────────────────────────────────────────────────
export const HOMEPAGE_CATEGORIES: Category[] = [
  {
    id: "cat-living",
    name: "Living Room",
    slug: "living",
    description: "Sculptural sofas, lounge chairs, and travertine coffee tables.",
    image: {
      url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
      alt: "Living Room Furniture",
      width: 1200,
      height: 800,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-dining",
    name: "Dining Room",
    slug: "dining",
    description: "Solid oak tables, upholstered seating, and walnut sideboards.",
    image: {
      url: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1200&auto=format&fit=crop",
      alt: "Dining Room Setup",
      width: 1200,
      height: 800,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-bedroom",
    name: "Bedroom",
    slug: "bedroom",
    description: "Upholstered beds, floating nightstands, and premium dressers.",
    image: {
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      alt: "Luxury Bedroom",
      width: 1200,
      height: 800,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-lighting",
    name: "Lighting",
    slug: "lighting",
    description: "Alabaster pendants, brass floor lamps, and architectural sconces.",
    image: {
      url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop",
      alt: "Modern Architectural Lighting",
      width: 1200,
      height: 800,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-outdoor",
    name: "Outdoor Lounge",
    slug: "outdoor",
    description: "Weather-resistant teak sectionals and minimalist lounge beds.",
    image: {
      url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
      alt: "Luxury Outdoor Deck",
      width: 1200,
      height: 800,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// ─── Products (Featured & Best Sellers) ──────────────────────────────────────
export const HOMEPAGE_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Siena Walnut Lounge Chair",
    slug: "siena-walnut-lounge-chair",
    description: "Crafted from solid American Walnut and upholstered in a luxurious, texturized bouclé fabric. Ergonomically reclined to offer pure visual and physical comfort.",
    price: 1249.00,
    compareAtPrice: 1599.00,
    images: [
      {
        url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
        alt: "Siena Lounge Chair in Ambient Setting",
        width: 800,
        height: 800,
      },
      {
        url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
        alt: "Siena Lounge Chair Walnut Detail",
        width: 800,
        height: 800,
      }
    ],
    category: "living",
    tags: ["featured", "living", "walnut", "best-seller"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-2",
    name: "Aurelia Bouclé Curved Sofa",
    slug: "aurelia-boucle-curved-sofa",
    description: "Embrace the elegance of sculptural design. The Aurelia sofa features organic curves wrapped in extra-fine Italian bouclé fabric with a low-profile base.",
    price: 3499.00,
    compareAtPrice: 4200.00,
    images: [
      {
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
        alt: "Aurelia Curved Sofa Front View",
        width: 800,
        height: 800,
      },
      {
        url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
        alt: "Aurelia Curved Sofa Texture Zoom",
        width: 800,
        height: 800,
      }
    ],
    category: "living",
    tags: ["living", "best-seller"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-3",
    name: "Verona Travertine Coffee Table Set",
    slug: "verona-travertine-coffee-table",
    description: "A nesting pair of coffee tables sculpted from honed ivory travertine stone. Showcases unique natural pitting, textures, and neutral earthy tones.",
    price: 899.00,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
        alt: "Verona Travertine Nesting Coffee Tables",
        width: 800,
        height: 800,
      }
    ],
    category: "living",
    tags: ["living"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-4",
    name: "Celine Oak Dining Table",
    slug: "celine-oak-dining-table",
    description: "An architectural masterpiece with a thick fluted pedestal base made of kiln-dried white oak. Seats up to 8 guests comfortably.",
    price: 2199.00,
    compareAtPrice: 2499.00,
    images: [
      {
        url: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=800&auto=format&fit=crop",
        alt: "Celine Oak Dining Table",
        width: 800,
        height: 800,
      }
    ],
    category: "dining",
    tags: ["featured", "dining", "best-seller"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-5",
    name: "Lucent Alabaster Pendant Lamp",
    slug: "lucent-alabaster-pendant-lamp",
    description: "Carved from a solid block of Spanish alabaster stone, this light diffuses a warm golden glow. Complemented by brushed brass accents.",
    price: 489.00,
    images: [
      {
        url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop",
        alt: "Lucent Alabaster Pendant Lamp Glowing",
        width: 800,
        height: 800,
      }
    ],
    category: "lighting",
    tags: ["featured", "lighting", "best-seller"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-6",
    name: "Emilia Shearling Armchair",
    slug: "emilia-shearling-armchair",
    description: "Plush, cocoon-like seating upholstered in genuine Mongolian shearling with structural solid oak legs. The ultimate reading nook centerpiece.",
    price: 949.00,
    compareAtPrice: 1199.00,
    images: [
      {
        url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
        alt: "Emilia Shearling Armchair Close-up",
        width: 800,
        height: 800,
      }
    ],
    category: "living",
    tags: ["living", "best-seller"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-7",
    name: "Athena Velvet Platform Bed",
    slug: "athena-velvet-platform-bed",
    description: "A low-profile headboard design wrapped in deep charcoal performance velvet. Requires no box spring, featuring solid pine slats.",
    price: 1899.00,
    images: [
      {
        url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
        alt: "Athena Platform Bed in Charcoal Velvet",
        width: 800,
        height: 800,
      }
    ],
    category: "bedroom",
    tags: ["bedroom", "featured"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-8",
    name: "Majorca Teak Sun Lounger",
    slug: "majorca-teak-sun-lounger",
    description: "Constructed of grade-A natural plantation teak. Includes ultra-comfortable weather-resistant cushions in mineral grey.",
    price: 799.00,
    compareAtPrice: 949.00,
    images: [
      {
        url: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=800&auto=format&fit=crop",
        alt: "Majorca Teak Sun Lounger poolside",
        width: 800,
        height: 800,
      }
    ],
    category: "outdoor",
    tags: ["outdoor"],
    inStock: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// ─── Why Choose Us Benefits ──────────────────────────────────────────────────
export const BENEFITS_DATA: Benefit[] = [
  {
    id: "benefit-1",
    title: "Kiln-Dried Hardwood",
    description: "All our wooden structures are crafted from sustainably sourced American Walnut and Oak, kiln-dried to prevent warping and cracking.",
    iconName: "Award",
  },
  {
    id: "benefit-2",
    title: "Artisanal Execution",
    description: "Every single joint, stitching line, and finishing stroke is crafted by hand in small heritage European workshops.",
    iconName: "Sparkles",
  },
  {
    id: "benefit-3",
    title: "White Glove Delivery",
    description: "We assemble your furniture in your room of choice, position it, and clear away all packaging materials.",
    iconName: "Truck",
  },
  {
    id: "benefit-4",
    title: "Lifetime Structural Warranty",
    description: "We stand behind our materials. Enjoy a lifetime warranty on the internal structural frame of all sofas and armchairs.",
    iconName: "ShieldCheck",
  }
];

// ─── Testimonials ────────────────────────────────────────────────────────────
export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Victoria Sterling",
    role: "Architect & Interior Designer, Sterling Atelier",
    review: "As an architect, I am extremely selective about proportions and materials. The Siena walnut lounge chair is a masterclass in organic modernism. The wood joints are absolutely seamless.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "test-2",
    name: "Marcus Vance",
    role: "Collector, NYC Loft Owner",
    review: "The white glove delivery team was exceptional. The Aurelia sofa fits the room like a bespoke sculpture. The texture of the bouclé is heavy, luxurious, and feels extremely durable.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "test-3",
    name: "Elena Rostova",
    role: "Founder, Rostova Design Co.",
    review: "FurnitureLux has completely replaced our custom vendors. The travertine work on their coffee table is of a caliber that usually costs three times the price in standard showrooms.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  }
];
