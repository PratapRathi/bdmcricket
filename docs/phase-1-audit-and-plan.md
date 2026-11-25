# Phase 1: Application audit and refactoring plan

## Audit date

2026-11-25

## Current application

- **Framework:** Next.js 16.4.6, React 19.3, TypeScript 5, Tailwind CSS 4.
- **Router:** App Router only. There is no `pages/` directory.
- **Runtime / data:** PostgreSQL through Prisma 7 and `pg`; S3-compatible storage through AWS SDK v3. Server-only data access is in `lib/data/`. Public media is streamed from `/media/[...key]`.
- **Existing presentation:** Tailwind utilities plus a large `app/globals.css` stylesheet. The site uses GSAP, `@gsap/react`, and `react-vertical-timeline-component`. Fonts are primarily system stacks; local assets include 1,393 JPGs, 281 PNGs, 14 WOFF/WOFF2 files, three GIFs, and small framework assets.
- **SEO:** Root metadata and page-level metadata exist for home, product index, product detail, and the generic slug route. There is no sitemap or robots metadata route yet.
- **State and API:** No global client store, TanStack Query, or Zod. Product search/filter/sort is local React state over server-provided product data. `/media/[...key]` is the only Route Handler. There is no public contact submission or admin mutation flow in the current UI.
- **Existing quality setup:** Strict TypeScript is enabled. ESLint is configured. Package scripts provide build, lint via the ESLint CLI, Prisma migration/seed, and data migration. There is no test script or test suite in the project.

## Route inventory and current behavior

| Current URL pattern | Current implementation | Intended treatment |
| --- | --- | --- |
| `/` | `app/page.tsx`; server-rendered home | Keep explicit route and presentation. |
| `/products` | `app/products/page.tsx`; server-rendered product hub | Keep explicit route. Product browse controls will use the API/query layer. |
| `/products/[slug]` | `app/products/[slug]/page.tsx`; database product lookup and 404 | Keep as a genuinely dynamic product detail route. |
| `/{category}` | Routed through `app/[slug]` after a database category lookup | Replace with six explicit routes: `/bats`, `/balls`, `/kit-bag`, `/protective-gear`, `/accessories`, `/clothing`. |
| Editorial pages | Routed through `app/[slug]` after a database `EditorialPage` lookup | Replace with explicit routes for `/about-us`, `/company-insights`, `/profile`, `/our-excellence`, `/quality`, `/awards`, `/testimonial`, `/news`, `/corporate-video`, `/photos`, `/jobs`, `/enquiry`, and `/sitemap`. Their copy/SEO records remain editable content, but no longer decide whether the routes exist. |
| Legacy `.html` and category aliases | `next.config.ts` rewrites `.html` paths; database redirects handle aliases | Move the verified alias map into static Next.js redirects and preserve incoming `.html` URLs with redirects to explicit canonical routes. |
| `/media/[...key]` | Route Handler reads asset metadata from PostgreSQL, streams the S3 object | Keep; it is genuinely dynamic media access and is already server-only. |
| Unknown paths | Generic slug route calls `notFound()` after database lookups | Remove slug resolver; add app-level not-found, error, global-error, and loading boundaries. |

Original migrated HTML files establish these 31 legacy page names: `about-us`, `awards`, `bdm-english-willow-cricket-bat`, `company-insights`, `corporate-video`, `cricket-accessories`, `cricket-ball`, `cricket-bat`, `cricket-batting-gloves`, `cricket-batting-pad`, `cricket-battingpad-sportsacademy`, `cricket-equipment`, `cricket-equipments`, `cricket-hat`, `cricket-helmet`, `cricket-kit-bag`, `cricket-protective-equipment`, `cricket-wicketkeeping-gloves`, `cricket-wicketkeeping-pad`, `enquiry`, `jobs`, `leather-cricket-ball`, `news`, `our-excellence`, `photos`, `profile`, `quality`, `sitemap`, `testimonial`, `white-cricket-wear`, and `wicket-keeping-gloves`. The 13 editorial records correspond to actual company pages; the remaining legacy names are aliases to product categories or the product hub.

## Data flow and module findings

- Route components call server-only Prisma modules in `lib/data/catalog.ts` and `lib/data/company.ts`.
- `components/content/editorial-page.tsx` has a switch over the 13 known editorial slugs and renders several distinct page views. It is coupled to the route slug but not to a generic HTML renderer.
- `components/products/category-page.tsx` contains both the category page and product hub. Product cards, browser, gallery, and detail page are separate modules already.
- `components/layout/` contains the shared header, footer, and data bridge. `components/home/`, `components/products/`, `components/content/`, and `components/media/` are existing feature-oriented boundaries.
- `prisma/import-source/` contains repeatable source data for initial import. Runtime content is read from PostgreSQL. Object storage credentials remain server-only.
- The six category routes and legacy redirect aliases are represented in taxonomy data today. Routing should move to source-controlled static route configuration; product and company copy can remain database-managed.
- Product browser currently ships the complete product collection to the client, then performs search, category/subcategory filtering, sorting, and “load more” locally. It is the existing interaction that justifies a client API query.
- Header, cards, details, and editorial pages use `next/link`; internal navigation is already mostly aligned with App Router conventions.

## Architectural risks

1. The generic `app/[slug]` route makes unrelated page existence and metadata depend on database records, obscures route ownership, and risks accidental route collisions.
2. Legacy redirect behavior currently depends on Prisma at request time, even though all aliases are known at build time.
3. Browser product filtering sends the whole catalogue as client props and has no reusable server-state/API boundary.
4. Error/loading handling is mostly local `Suspense`; the app lacks App Router segment error and not-found UI.
5. There is no sitemap/robots route and no documentation matching the current database-backed architecture.
6. No admin, contact submission, authentication, or mutation workflow exists. Adding unused endpoint families or global state now would be speculative.

## Refactoring plan

1. Preserve this audit and make route/config constants the source-controlled owner of site structure and legacy aliases.
2. Create shared feature-oriented server page shells for editorial and category content, then give every existing page its own filesystem `page.tsx`. Remove `app/[slug]` once all routes are explicit.
3. Preserve product details at `/products/[slug]`; keep `/media/[...key]` as the existing media Route Handler. Use static Next redirects for the verified legacy aliases and `.html` URLs.
4. Add app-level loading, not-found, error, and global-error UI that follows the current visual system.
5. Add a validated `GET /api/products` endpoint and isolate query parsing/business filters from the handler. Add TanStack Query provider, centralized query defaults, and product-browser query hooks. Keep server components on direct Prisma reads and do not add Zustand because current shared client state does not justify it.
6. Add route metadata helpers, sitemap, and robots metadata based on actual static routes and published products.
7. Write architecture, routing, frontend, API, state, data-fetching, development, deployment, roadmap, and project-memory documentation. Keep agent instructions concise and grounded in the implemented structure.
8. Run TypeScript, ESLint, production build, and route/data checks after implementation. Record unavailable checks or external-service dependencies accurately.

## Constraints

- Keep all existing page content, styles, assets, product data, routes, and behaviors unless changing route mechanics is required by this plan.
- Do not add a database for routing. Existing PostgreSQL product/company content remains the runtime source of truth.
- Do not add Zustand without a concrete shared client-state requirement.
- Do not add speculative admin APIs, contact submission behavior, or checkout flows.
- Do not claim a database-backed route or API works without actually exercising it against the configured services.
