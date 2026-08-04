# FurnitureLux 🪑

> **Elevate Your Living Space** — A production-ready Next.js eCommerce platform for premium furniture.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16 | Framework (App Router) |
| [React](https://react.dev) | 19 | UI Library |
| [TypeScript](https://www.typescriptlang.org) | 5 | Type Safety |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Styling |
| [class-variance-authority](https://cva.style) | latest | Component Variants |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/nicolo-ribaudo/tailwind-merge) | latest | Class Name Utilities |
| [Lucide React](https://lucide.dev) | latest | Icons |
| [Prettier](https://prettier.io) | latest | Code Formatting |
| [ESLint](https://eslint.org) | 9 | Code Linting |

---

## 📁 Folder Structure

```
furniturelux/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles, design tokens
│   ├── layout.tsx          # Root layout (fonts, metadata, providers)
│   ├── page.tsx            # Homepage
│   ├── loading.tsx         # Loading UI
│   ├── error.tsx           # Error boundary
│   └── not-found.tsx       # 404 page
│
├── components/
│   ├── ui/                 # Primitive UI components (Button, Badge, Container)
│   ├── layout/             # Header, Footer
│   └── shared/             # Cross-feature shared components
│
├── features/               # Feature slices (products, cart, etc.)
├── hooks/                  # Custom React hooks
├── lib/                    # Core utilities (cn, metadata generator)
├── models/                 # TypeScript domain model interfaces
├── services/               # Data fetching / API service layer
├── actions/                # Next.js Server Actions
├── providers/              # React Context providers
├── types/                  # Global TypeScript types
├── utils/                  # Pure utility functions
├── constants/              # App-wide constants (SITE_CONFIG, ROUTES)
└── public/                 # Static assets
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** >= 20 (LTS recommended)
- **npm** >= 10

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/furniturelux.git
cd furniturelux
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=FurnitureLux
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 📦 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm run type-check` | Run TypeScript compiler check |

---

## 🎨 Design System

### Color Palette

The design uses a warm **Charcoal + Gold** palette defined as CSS custom properties in `globals.css`:

- **Primary**: Warm charcoal (`--color-primary`)  
- **Accent**: Antique gold (`--color-accent`)  
- **Background**: Warm off-white (`--color-background`)

### Typography

- **Serif**: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — headings and display text
- **Sans**: [Inter](https://fonts.google.com/specimen/Inter) — body and UI text

### Component Variants

All UI components use `class-variance-authority` (CVA) for typed, composable variants:

```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="lg">Shop Now</Button>
<Button variant="outline" size="md" isLoading>Loading...</Button>
<Button variant="accent" fullWidth>Full Width</Button>
```

---

## 🗺️ Path Aliases

All major folders have TypeScript path aliases configured in `tsconfig.json`:

```ts
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { SITE_CONFIG } from "@/constants/site";
import type { ApiResponse } from "@/types";
```

---

## 🔍 SEO

Every page supports rich metadata via the centralized `generateMetadata` helper:

```ts
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Living Room Collection",
  description: "Browse our curated living room furniture.",
  keywords: ["sofas", "armchairs", "coffee tables"],
});
```

---

## 🔒 Security

The following security headers are automatically applied to all routes (see `next.config.ts`):

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit your changes: `git commit -m 'feat: add my feature'`
3. Push to the branch: `git push origin feature/my-feature`
4. Open a pull request

---

## 📄 License

MIT License © 2025 FurnitureLux. All rights reserved.
