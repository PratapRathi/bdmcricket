# BDM Cricket project memory

## 1. Project overview

BDM Cricket is the existing branded website and product catalogue refactored into a modular Next.js App Router application. Preserve its current design, assets, content, navigation, and behavior when changing internals.

## 2. Business context

The site represents B. D. Mahajan & Sons / BDM Cricket, a cricket equipment business with company history beginning in 1925. The public catalogue contains six top-level categories: Bats, Balls, Kit Bag, Protective Gear, Accessories, and Clothing. Products and company information are planned for future administrative control; no admin interface or checkout exists today.

## 3. Technology stack

- Next.js 16.4.6 App Router; React 19.3; TypeScript 5 strict mode.
- Tailwind CSS 4 with existing branded global CSS.
- Prisma 7 with PostgreSQL via `pg` and `@prisma/adapter-pg`.
- S3-compatible media storage via AWS SDK v3, streamed through `/media/*`.
- TanStack Query 5 and development-only React Query Devtools for product browser server-state.
- Zod 4 for public product API query validation.
- GSAP, `@gsap/react`, and `react-vertical-timeline-component` for existing interactions and timeline.
- No Zustand package/store. Unit checks use Node's built-in test runner through `tsx`.

## 4. Overall architecture

`app/` owns explicit route files and HTTP/SEO boundaries. Server Components call `lib/data/` directly. The product browser is interactive and calls `/api/products` through a feature API client and TanStack Query. Prisma/S3 access and environment values stay on the server. Common chrome is shared at the root layout.

## 5. Folder structure

- `app/`: explicit website routes, `/api/products`, `/media/[...key]`, loading/error/not-found, robots, sitemap.
- `features/home/components`, `features/products/components`, `features/company/components`, `features/media/components`: feature-owned presentation modules.
- `components/layout`, `components/ui`, `components/motion`: shared chrome, controls, and transitions.
- `features/products`: API types/service and TanStack Query hooks.
- `lib/data`: server-only Prisma queries and mapping.
- `lib/api`: browser HTTP client and response helpers.
- `lib/config/site-routes.ts`: static page/alias config used by sitemap and Next redirects.
- `lib/seo`: editorial/category metadata helpers.
- `providers`: root QueryClient provider.
- `prisma`: schema, migrations, seed fixtures.
- `docs`: architecture, routing, engineering guides.

## 6. Routing conventions

Public pages are filesystem-defined. Current explicit pages: `/`, `/products`, `/bats`, `/balls`, `/kit-bag`, `/protective-gear`, `/accessories`, `/clothing`, `/about-us`, `/company-insights`, `/profile`, `/our-excellence`, `/quality`, `/awards`, `/testimonial`, `/news`, `/corporate-video`, `/photos`, `/jobs`, `/enquiry`, and `/sitemap`.

`/products/[slug]` is reserved for real product records. `/media/[...key]` is a resource Route Handler. Static routes and aliases never depend on database rows. Old `.html` URLs and known category aliases are permanent redirects configured in `next.config.ts` from `lib/config/site-routes.ts`. Add an actual page by adding its `app/<path>/page.tsx`; update the sitemap config and docs as needed. Do not add a generic slug or catch-all page renderer.

## 7. Feature module responsibilities

- `features/home`: home page sections and storytelling.
- `features/products`: category hub/detail/card/gallery/browser, API contract, query hook, and query validation.
- `features/company`: current company/editorial page composition.
- `features/media`: video presentation.
- `components/layout`: header/footer and server data bridge.
- `lib/data`: server-side queries/mapping only; no client imports.

Keep route modules small. Leave cross-feature presentation in shared component modules only when it is genuinely reused.

## 8. API architecture

Current API: `GET /api/products`, with `q`, `category`, `subcategory`, and `sort` query parameters. Zod validates input. Success shape is `{ data: Product[] }`; errors are `{ error: { code, message } }`. The handler delegates to `getProductsForBrowser` in server-only catalog data code. `/media/[...key]` streams object data and returns 404/503 as appropriate. No admin, contact submission, or write endpoints exist.

For new endpoints: validate at the boundary, keep business logic in server services, return explicit HTTP statuses, use the shared response helper, and keep secrets server-side.

## 9. TanStack Query conventions

QueryClient defaults live in `providers/query-provider.tsx`: stale one minute, garbage-collect after five minutes, retry once, do not refetch on focus, refetch on reconnect. Product query keys are in `features/products/hooks/use-products.ts`; filters are part of the list key. The catalogue Server Component provides the default list as initial query data, avoiding a duplicate first request. Add invalidation for mutations only when write operations are implemented.

## 10. Zustand conventions

No Zustand store is implemented or currently justified. Keep local menu/filter state local and API data in TanStack Query. Consider a focused cart store only when shopping-cart behavior is actually built. Never copy query data into a global store.

## 11. Component development guidelines

Prefer Server Components. Add `"use client"` only for browser state/events/hooks. Use semantic elements and accessible labels. Use Next `Link` for internal navigation and `Image` for local/S3-proxied assets. Product images, company content, media, and route behavior must remain intact during refactors.

## 12. Styling conventions

Use Tailwind utilities for normal layout and spacing. `app/globals.css` owns brand variables and larger custom page/interaction classes. Keep present colors, type, responsive breakpoints, transitions, and component composition. Avoid redesigning during architectural work.

## 13. Naming conventions

- Route files: `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`, `not-found.tsx` per App Router conventions.
- React components: PascalCase; hooks start with `use`; API functions describe resource/action.
- Query key roots are plural resource names (`products`); feature-specific data contracts use `.types/` files.
- Environment variables use uppercase server-side names and must not be prefixed `NEXT_PUBLIC_` unless intentionally public.

## 14. Important decisions

- Route structure is code-owned, not a database registry.
- Editorial copy may stay database-editable; it cannot create/remove a route.
- Server components call Prisma directly; no API request is added for static server rendering.
- TanStack Query is used for current interactive product filtering; Zustand is omitted.
- Root route group nesting is not needed while all routes share one global shell.
- Price remains a display string in the current schema. Price sorting parses the existing string after product filtering; normalize numeric pricing and paginate if catalogue size grows.
- LegacyRedirect records remain in the existing database for compatibility, but runtime redirects are static configuration now.

## 15. Existing limitations

- Product API returns all filtered matches; visible count is local load-more. Price ordering parses display strings. Introduce normalized price and cursor pagination before large catalogue growth.
- Unit tests cover product query validation and static route/alias configuration; there is no end-to-end test suite. No admin/auth, product writes, inventory, campaign, checkout, contact submission, or payment support exists.
- Page content depends on database records being imported. Missing required company/catalogue content may surface through the error boundary.
- `/api/products` currently has a short private cache header and is not configured for shared CDN caching.
- Production builds emit the `pg-connection-string` SSL mode forward-compatibility warning; review `DATABASE_URL` TLS configuration before the pg 9 upgrade.

## 16. Pending tasks

- Configure real staging/production health checks for PostgreSQL, object storage, sitemap, and public API.
- Extend tests from configuration/validation unit checks to database-backed service and browser-level coverage.
- Review sitemap contents and canonical URLs against the deployed domain.
- Decide whether/when to remove the retained legacy redirect table in a separately reviewed data migration.

## 17. Future development roadmap

Admin authentication/authorization, product and category management, inventory, offers/campaigns, cart, checkout/payment, and contact enquiries are planned only. See `docs/future-roadmap.md` for the staged outline.

## 18. Instructions for AI coding agents

1. Read this file and the applicable guide under `docs/` before changing architecture.
2. Read the relevant installed Next.js guide in `node_modules/next/dist/docs/`; this project uses Next 16 APIs.
3. Preserve existing visuals, content, routes, media, and interactions. Do not rebuild or redesign during refactoring.
4. Define website pages as explicit App Router files. Never reintroduce a generic slug page or database page registry.
5. Keep Prisma and S3 server-only. Use API handlers for interactive client operations; call server services directly from Server Components.
6. Use TanStack Query for client server-state; do not add Zustand unless a concrete global client-state use case exists.
7. Do not invent admin/contact/cart/checkout APIs or document planned work as implemented.
8. After changes, run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build` when feasible. Report actual results and any dependency on external services.
