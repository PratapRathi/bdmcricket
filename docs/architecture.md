# Architecture

## Overview

BDM Cricket is a Next.js 16 App Router application. The App Router owns the public page structure. PostgreSQL is the source of current product and company content through Prisma 7. S3-compatible storage holds the site media; the server streams registered media through `/media/*`.

```text
Browser
  ├─ page navigation ──> explicit App Router pages ──> Server Components ──> Prisma/PostgreSQL
  ├─ product filters ──> TanStack Query ──> GET /api/products ──> product data service ──> Prisma
  └─ images/video ─────> /media/* Route Handler ──> S3-compatible storage
```

## Boundaries

- `app/` owns URLs, metadata, loading/error/not-found boundaries, API handlers, and metadata routes.
- `components/layout/` owns the shared header, footer, and server-data bridge. Shared low-level controls live in `components/ui/`.
- `features/home/components/`, `features/products/components/`, `features/company/components/`, and `features/media/components/` hold their current presentation modules.
- `features/products/` owns browser-side products API types, client API service, and TanStack Query hooks.
- `lib/data/` is server-only Prisma access and maps database records to UI types. Server components call it directly when rendering.
- `lib/api/` provides the shared browser request client and consistent JSON response helpers.
- `lib/config/site-routes.ts` is the source-controlled list of page routes and verified historical redirects. It does not use database rows.
- `prisma/` owns the schema, checked-in migrations, and source import fixtures. `lib/object-storage.ts` and `lib/prisma.ts` keep external clients server-side.

There is no nested route group because all current website pages share the same header, footer, and visual shell. Add a route group when a section gets a distinct layout or security boundary. Product pages share a visual feature but currently need no nested layout.

## Decisions

- Route existence is defined by files under `app/`, not product, editorial, or redirect records.
- Product detail slugs remain dynamic because products are data-managed resources.
- Product and company content remains in PostgreSQL to support future management workflows.
- Static page copy and SEO fields may be edited in `EditorialPage` records, but those records only fill content for known routes.
- Server Components use server-only services directly. Client components use the API for interactive server-state.
- TanStack Query owns the client product list cache. Zustand is not installed because the current UI has no cross-component client state that merits a store.
- API scope currently covers public interactive product browsing. No admin, contact submission, cart, or mutation behavior is implemented.

## Request flow

The browser requests an explicit route. The page renders through Server Components and reads the required records from `lib/data/`. The product browser is a Client Component because it owns interactive controls; its filter state forms a TanStack Query key and requests validated results from `/api/products`. No browser code imports Prisma or S3 credentials.

## Failure handling

Unknown pages use `app/not-found.tsx`. Route rendering errors use `app/error.tsx`; root layout errors use `app/global-error.tsx`. `app/loading.tsx` is the shared route loading state. The products handler returns `{ data }` for success and `{ error: { code, message } }` for failure.
