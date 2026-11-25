# Routing

All pages use the App Router. Route ownership is explicit in `app/`; there is no generic one-segment page and no database page registry.

## Website routes

| URL | Purpose |
| --- | --- |
| `/` | Home |
| `/products` | Product catalogue and interactive browser |
| `/bats` | Bats category |
| `/balls` | Balls category |
| `/kit-bag` | Kit bag category |
| `/protective-gear` | Protective gear category |
| `/accessories` | Accessories category |
| `/clothing` | Clothing category |
| `/about-us` | Company story |
| `/company-insights` | Company insights |
| `/profile` | Company profile |
| `/our-excellence` | Recognition and progress |
| `/quality` | Quality information |
| `/awards` | Awards |
| `/testimonial` | Rating information |
| `/news` | Company notice |
| `/corporate-video` | Corporate video |
| `/photos` | Product photographs |
| `/jobs` | Careers information |
| `/enquiry` | Contact information |
| `/sitemap` | Human-readable site map |
| `/products/[slug]` | Individual published product |

## Non-page routes

- `GET /api/products` serves filtered product results to the product browser.
- `GET /media/[...key]` streams a registered object from S3-compatible storage.
- `/sitemap.xml` is generated from the static public page list and published product slugs.
- `/robots.txt` allows public crawling and disallows `/api/`.

## Historical URLs

`next.config.ts` redirects `/index.html` to `/`, each original editorial `*.html` URL to its clean canonical route, and every known category alias (with and without `.html`) to its category destination. Redirect sources and destinations live in `lib/config/site-routes.ts`. The aliases include `cricket-bat`, `cricket-ball`, `cricket-kit-bag`, `cricket-accessories`, their old subcategory page names, and `cricket-equipment(s)`.

## Dynamic routes

`/products/[slug]` is dynamic because the record identifies an individual product. `/media/[...key]` is a storage-resource handler, not a website page renderer. No dynamic route resolves editorial pages, categories, or arbitrary website slugs.

## Adding a page

1. Add `app/<path>/page.tsx` and own its metadata there.
2. Put page-specific UI/data behavior in the owning feature or current component module.
3. Add the path to `staticPublicPaths` in `lib/config/site-routes.ts` if it should be listed in the sitemap.
4. Add a static redirect only when preserving a verified old URL; do not store route definitions in PostgreSQL.
5. Add the route to this document and run `npm run typecheck`, `npm run lint`, and `npm run build`.
