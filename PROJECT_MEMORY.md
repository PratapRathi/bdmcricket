# BDM Cricket project memory

## 1. Project overview

BDM Cricket is the existing branded website and product catalogue refactored into a modular Next.js App Router application. Preserve its current design, assets, content, navigation, and behavior when changing internals.

## 2. Business context

The site represents B. D. Mahajan & Sons / BDM Cricket, a cricket equipment business with company history beginning in 1925. The public catalogue contains six original top-level categories: Bats, Balls, Kit Bag, Protective Gear, Accessories, and Clothing. A protected admin portal manages products, stock thresholds, categories, company content, media, admin credentials, and public contact submissions. Checkout is not implemented.

## 3. Technology stack

- Next.js 16.4.6 App Router; React 19.3; TypeScript 5 strict mode.
- Tailwind CSS 4 with existing branded global CSS.
- Prisma 7 with PostgreSQL via `pg` and `@prisma/adapter-pg`.
- S3-compatible media storage via AWS SDK v3, streamed through `/media/*`; no runtime media is retained in `public/assets`.
- TanStack Query 5 and development-only React Query Devtools for product browser and admin server-state.
- Zod 4 for public and admin request validation.
- GSAP, `@gsap/react`, and `react-vertical-timeline-component` for existing interactions and timeline.
- No Zustand package/store. Unit checks use Node's built-in test runner through `tsx`.

## 4. Overall architecture

`app/` owns explicit route files and HTTP/SEO boundaries. Public routes live under `(website)` with shared public chrome; `/admin/(portal)` has a separate protected layout, while `/admin/login` stays outside it. Server Components call `lib/data/` directly. Interactive public/admin screens use Route Handlers and TanStack Query. Prisma/S3 access and environment values stay on the server.

## 5. Folder structure

- `app/(website)/`: explicit public routes, shared public layout, sitemap.
- `app/admin/`: login and protected dashboard, products, categories, content, enquiries, media, and settings routes.
- `app/api/`: public products/contact handlers and protected admin handlers.
- `features/home/components`, `features/products/components`, `features/company/components`, `features/media/components`, `features/admin/components`: feature-owned public/admin UI.
- `components/layout`, `components/ui`, `components/motion`: shared chrome, controls, and transitions.
- `features/products`: API types/service and TanStack Query hooks.
- `features/admin/services`, `features/admin/validation`: server management services and Zod schemas.
- `lib/admin-auth`: signed session cookie, scrypt password hashing, request guard, and audit helper.
- `lib/data`: server-only Prisma queries and mapping.
- `lib/api`: browser HTTP client and response helpers.
- `lib/config/site-routes.ts`: static page/alias config; `lib/config/category-route.ts` preserves fixed category URLs and routes custom categories under `/products/categories/[slug]`.
- `lib/seo`: editorial/category metadata helpers.
- `providers`: root QueryClient provider.
- `prisma`: schema, migrations, seed fixtures.
- `scripts/verify-media-storage.ts`: verifies every registered media record has a matching object in S3-compatible storage.
- `docs`: architecture, routing, engineering guides.

## 6. Routing conventions

Public pages are filesystem-defined: `/`, `/products`, six fixed category routes, `/products/categories/[slug]` for real admin-created categories, `/products/[slug]`, `/about-us`, `/company-insights`, `/profile`, `/our-excellence`, `/quality`, `/awards`, `/testimonial`, `/news`, `/corporate-video`, `/photos`, `/jobs`, `/enquiry`, and `/sitemap`. Admin routes are `/admin/login`, `/admin`, `/admin/products`, `/admin/categories`, `/admin/content`, `/admin/enquiries`, `/admin/media`, and `/admin/settings`.

`/products/[slug]` is reserved for product records; `/products/categories/[slug]` resolves a published category. `/media/[...key]` is a resource Route Handler. Static routes and aliases never depend on database rows. Old `.html` URLs and known category aliases are permanent redirects configured in `next.config.ts` from `lib/config/site-routes.ts`. Add a page under `app/(website)/<path>/page.tsx`; update sitemap config and docs as needed. Do not add a generic slug or catch-all page renderer.

## 7. Feature module responsibilities

- `features/home`: home page sections and storytelling.
- `features/products`: category hub/detail/card/gallery/browser, API contract, query hook, and query validation.
- `features/company`: current company/editorial page composition.
- `features/media`: video presentation.
- `features/admin`: admin screens, query/API helpers, validation, and server-side management services. The page layout and every protected handler independently verify the session.
- `components/layout`: header/footer and server data bridge.
- `lib/data`: server-side queries/mapping only; no client imports.

Keep route modules small. Leave cross-feature presentation in shared component modules only when it is genuinely reused.

## 8. API architecture

Public APIs: `GET /api/products` and `POST /api/contact`. Protected `/api/admin/*` handlers manage auth, overview, products/stock, categories/subcategories, site content, contact enquiries, and media. JSON success is `{ data: ... }`; errors are `{ error: { code, message } }`. Admin writes use same-origin checks and audit logging. `/media/[...key]` streams objects from S3-compatible storage.

For new endpoints: validate at the boundary, keep business logic in server services, return explicit HTTP statuses, use the shared response helper, and keep secrets server-side.

## 9. TanStack Query conventions

QueryClient defaults live in `providers/query-provider.tsx`: stale one minute, garbage-collect after five minutes, retry once, do not refetch on focus, refetch on reconnect. Product query keys are in `features/products/hooks/use-products.ts`; filters are part of the list key. The catalogue Server Component provides the default list as initial query data, avoiding a duplicate first request. Admin keys and response handling live in `features/admin/components/admin-api.ts`; mutations invalidate related resources and dashboard data.

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
- Public and admin route groups intentionally separate their layouts; public chrome remains unchanged and admin uses a dedicated protected shell.
- Price remains a display string in the current schema. Price sorting parses the existing string after product filtering; normalize numeric pricing and paginate if catalogue size grows.
- LegacyRedirect records remain in the existing database for compatibility, but runtime redirects are static configuration now.

## 15. Existing limitations

- Product API returns all filtered matches; visible count is local load-more. Price ordering parses display strings. Introduce normalized price and cursor pagination before large catalogue growth.
- Product stock quantity and low-stock thresholds are implemented, but inventory locations, adjustments, and reservations do not exist.
- Contact submissions are persisted and rate-limited; notifications and retention tooling are not implemented. Set a retention policy because submissions contain personal data.
- Admin uses one account with signed sessions, login lockout, credential rotation, and audit entries. Roles, MFA, and account recovery are not implemented. Create the first account as an operator; no default credentials exist.
- Unit tests cover product query validation and static route/alias configuration; there is no browser-level or database-backed test suite.
- Page content depends on database records being imported. Missing required company/catalogue content may surface through the error boundary.
- `/api/products` currently has a short private cache header and is not configured for shared CDN caching.
- Production builds emit the `pg-connection-string` SSL mode forward-compatibility warning; review `DATABASE_URL` TLS configuration before the pg 9 upgrade.
- The media library list is capped at 500 recent assets; add media search/pagination before the asset catalogue grows further.

## 16. Pending tasks

- Configure real staging/production health checks for PostgreSQL, object storage, sitemap, and public API.
- Extend tests from configuration/validation unit checks to database-backed service and browser-level coverage.
- Review sitemap contents and canonical URLs against the deployed domain.
- The admin migration is applied to the configured development database, and a private session secret is set in its ignored `.env`. The first account is not bootstrapped yet; set a private bootstrap ID/password and run `npm run admin:bootstrap`, then remove `ADMIN_BOOTSTRAP_PASSWORD`. Production/staging databases must apply migrations separately.
- Add browser-level workflows for admin login, catalog/content changes, contact submissions, and media management.
- Decide contact retention, admin MFA/RBAC, and backup/restore policies before expanding staff access.
- Decide whether/when to remove the retained legacy redirect table in a separately reviewed data migration.
- Add image dimensions, format conversion, and malware scanning if upload volume or staff access expands.

## 17. Future development roadmap

Single-account admin authentication, catalog/content management, stock thresholds, contact inbox, media management, and audit logging are implemented. Multi-user roles/MFA, inventory operations, offers/campaigns, cart, and checkout/payment remain future work. See `docs/future-roadmap.md`.

## 18. Instructions for AI coding agents

1. Read this file and the applicable guide under `docs/` before changing architecture.
2. Read the relevant installed Next.js guide in `node_modules/next/dist/docs/`; this project uses Next 16 APIs.
3. Preserve existing visuals, content, routes, media, and interactions. Do not rebuild or redesign during refactoring.
4. Define website pages as explicit App Router files. Never reintroduce a generic slug page or database page registry.
5. Keep Prisma and S3 server-only. Use API handlers for interactive client operations; call server services directly from Server Components.
6. Use TanStack Query for client server-state; do not add Zustand unless a concrete global client-state use case exists.
7. Keep admin secrets, contact PII, database URLs, and S3 credentials server-side. Never add default credentials; create the first admin only with the operator bootstrap command.
8. Do not create a database page registry or generic slug renderer. Dynamic routes are only for genuine resources such as products and categories.
9. After changes, run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build` when feasible. Report actual results and any dependency on external services.
