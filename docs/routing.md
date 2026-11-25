# Routing

The App Router filesystem owns routes. Public pages are grouped under `app/(website)/`; the route-group name does not appear in URLs. Static site page structure never depends on a database page registry or generic slug renderer.

## Website routes

| URL | Purpose |
| --- | --- |
| `/` | Home and company storytelling |
| `/products` | Product catalogue and interactive browser |
| `/bats`, `/balls`, `/kit-bag`, `/protective-gear`, `/accessories`, `/clothing` | Existing fixed category routes |
| `/products/categories/[slug]` | Admin-created category records |
| `/products/[slug]` | Individual product record |
| `/about-us`, `/company-insights`, `/profile`, `/our-excellence`, `/quality` | Company and quality pages |
| `/awards`, `/testimonial`, `/news`, `/corporate-video`, `/photos` | Recognition, ratings, notice, and media pages |
| `/jobs`, `/enquiry`, `/sitemap` | Careers, contact, and human-readable site map |

## Admin routes

| URL | Purpose |
| --- | --- |
| `/admin/login` | Admin sign-in |
| `/admin` | Dashboard with catalog, stock, enquiry, and activity summaries |
| `/admin/products` | Product and inventory management |
| `/admin/categories` | Category and subcategory management |
| `/admin/content` | Company profile, site notice, editorial copy, milestones, insights, awards, and ratings |
| `/admin/enquiries` | Contact inbox, follow-up notes/status, and CSV export |
| `/admin/media` | Object-storage media library |
| `/admin/settings` | Admin ID/password updates |

The `(portal)` route group shares a server layout that checks the admin session and redirects unauthenticated users to `/admin/login`. Route handlers independently verify authorization; hiding a page is not the security boundary.

## API and resource routes

- `GET /api/products` serves filtered product results.
- `POST /api/contact` stores a validated enquiry.
- `/api/admin/*` provides protected management operations; the endpoint inventory and rules are in [api-guidelines.md](api-guidelines.md).
- `/media/[...key]` streams registered objects from S3-compatible storage.
- `/sitemap.xml` includes static public pages, published products, and published custom categories.
- `/robots.txt` allows the public site and disallows `/api/` and `/admin/`.

## Historical URLs

`next.config.ts` redirects `/index.html` to `/`, each original editorial `.html` URL to its clean route, and verified historic category aliases to their canonical destinations. Redirect sources and destinations live in `lib/config/site-routes.ts`.

## Dynamic routes

`/products/[slug]` is dynamic for individual products. `/products/categories/[slug]` resolves only a real published category record; it does not render unrelated website pages. `/media/[...key]` is a storage-resource handler. Static editorial pages remain explicit files and only accept database content for their known slugs.

## Adding a page

1. Add `app/(website)/<path>/page.tsx` and keep its route module focused on the page feature and metadata.
2. Add its path to `staticPublicPaths` in `lib/config/site-routes.ts` if it belongs in the sitemap.
3. Preserve existing redirects only for verified historical URLs, then update this document.
4. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
