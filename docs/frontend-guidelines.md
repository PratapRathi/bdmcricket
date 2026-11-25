# Frontend guidelines

## Components

- Default to Server Components. Use Client Components for browser events, hooks, or local interactive state only.
- Keep `app/**/page.tsx` files thin. They select the page feature and metadata; they should not become data or styling containers.
- Keep product browser API/query logic in `features/products/`; keep presentational cards and page sections in `features/products/components/`.
- Put shared layout in `components/layout/` and reusable low-level controls in `components/ui/`.
- Use semantic landmarks, descriptive control labels, keyboard-operable controls, and useful image alt text.
- Use `next/link` for internal navigation and `next/image` for product and editorial images.

## Server/client boundary

`lib/data/*`, Prisma, S3, and environment secrets are server-only. Do not import them in a Client Component. The product browser calls feature API services, which call the same-origin Route Handler.

## Styling

Use Tailwind utilities for layout and one-off styling. Reuse the existing classes and custom rules in `app/globals.css` for complex branded sections and shared interaction states. Preserve the current colors, typography, spacing, animations, and responsive behavior when refactoring. Avoid replacing a page design while moving its code.

## Metadata

Use each route's `generateMetadata` for editable editorial/category/product values. Set canonical paths. Keep sitewide defaults in `app/layout.tsx`. Add new public pages to the sitemap route list.
