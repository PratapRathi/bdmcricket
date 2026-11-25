# Architecture

## Overview

BDM Cricket is a Next.js 16 App Router application. PostgreSQL is the source of product, category, company, and contact data through Prisma 7. S3-compatible storage holds the registered site media. The code owns all website routes; database records provide content for those routes and for genuine dynamic resources such as products and admin-created categories.

```text
Public browser ──> (website) filesystem routes ──> Server Components ──> Prisma/PostgreSQL
       │                     │
       ├─ interactive browse ─> TanStack Query ─> /api/products ───────┘
       └─ contact form ──────> /api/contact ─────> ContactSubmission

Admin browser ──> /admin protected route group ─> admin feature screens
       │                                     └─> /api/admin/* ─> services ─> Prisma/S3
       └─ signed HttpOnly cookie; every API request rechecks the admin record

Images ──> /media/* Route Handler ──> S3-compatible object storage
```

## Boundaries

- `app/` owns explicit public and admin pages, route layouts, metadata, error/loading/not-found boundaries, API handlers, and sitemap/robots metadata.
- `app/(website)/` groups public pages under the shared header, transition, and footer. The route group name is not part of the URL.
- `app/admin/(portal)/` applies server-side authentication and the admin navigation shell. `/admin/login` is outside that protected group.
- `features/admin/` owns admin UI, input schemas, client query keys, and server-side management services. It does not own route definitions.
- `features/home`, `features/products`, `features/company`, and `features/media` own existing public presentation modules. The existing public visual system remains in place.
- `components/layout/`, `components/ui/`, and `components/motion/` own cross-feature chrome, controls, and animation utilities.
- `lib/data/` contains server-only reads and public data mapping. `lib/admin-auth/` owns password/session/guard/audit helpers. `lib/api/` owns the browser request client and response shapes.
- `prisma/` owns the database schema and additive migrations. `lib/object-storage.ts` and `lib/prisma.ts` keep external clients server-side.

## Decisions

- Filesystem routes, not database rows, determine which website pages exist. Editorial content can change copy or visibility only for an existing route.
- Product detail paths (`/products/[slug]`) represent database products. The six established category paths remain `/bats`, `/balls`, `/kit-bag`, `/protective-gear`, `/accessories`, and `/clothing`. Admin-created categories use `/products/categories/[slug]`.
- Server Components call Prisma-backed services directly for initial page rendering. Interactive client screens use TanStack Query and same-origin Route Handlers.
- Admin APIs require a signed session and a same-origin check on writes. Sensitive API responses are private/no-store. Admin changes are written to `AdminAuditLog` in the same transaction as their database changes where applicable.
- Contact submissions are stored in PostgreSQL and visible only to authenticated admin handlers. Media uploads are registered in `MediaAsset`; in-use assets cannot be removed.
- TanStack Query manages client server-state. Zustand is not installed because the application has no global client state that merits a separate store.

## Request flow and failure handling

Public page routes read content on the server through `lib/data/`. The product browser requests validated filtered results from `/api/products`; the contact form submits validated data to `/api/contact`. Admin pages render only after a server session check and call protected handlers through the shared API client. Admin services validate relational constraints and record an audit entry.

Unknown routes use `app/not-found.tsx`; render errors use `app/error.tsx`; root layout failures use `app/global-error.tsx`. The website and admin route trees each have a layout; root `app/loading.tsx` provides the shared loading state. API handlers return consistent JSON errors except for CSV export and media responses.
