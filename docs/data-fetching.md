# Data fetching

## Server rendering

Server Components call server-only functions in `lib/data/`. The catalog module maps Prisma records into `Product` and `ProductCategory`; the company module maps profile, milestones, notices, awards, and editorial content. Keep database reads on the server when data only supports initial rendering or metadata.

## Client product browse

`features/products/components/product-browser.tsx` owns search, category/subcategory selection, sorting, and the visible count. It debounces search text, creates a stable filter object, and calls `useProducts` from `features/products/hooks/use-products.ts`. `features/products/services/product-api.ts` requests `/api/products`; query keys include every server filter. Unfiltered catalogue data is passed from the server as initial query data to avoid a duplicate first request.

The API validates `q`, `category`, `subcategory`, and `sort` with Zod. `getProductsForBrowser` filters published catalog rows and related specifications in PostgreSQL, maps the result to the same product type used in server-rendered cards, and preserves existing sort semantics. Price values are stored as display strings today, so price ordering parses those strings after the database query. If catalogue size grows substantially, add a normalized numeric price field and cursor pagination as part of product pricing/inventory design.

## Prefetching and hydration

The current first-page browser uses server-provided initial query data; full Query dehydration is unnecessary. Do not add hydration boundaries around static Server Component content. If future routes need interactive client data on first paint, prefetch on the server and dehydrate only that feature's query state.

## Cache boundaries

React `cache()` deduplicates same-request server reads. TanStack Query caches browser requests. `/api/products` responses are private and short-lived; adjust HTTP caching only after a reviewed public CDN cache strategy exists.
