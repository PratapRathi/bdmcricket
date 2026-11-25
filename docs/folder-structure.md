# Folder structure

```text
app/                         Explicit public/admin routes, APIs, SEO and boundaries
  (website)/                 Public pages with shared site chrome
  admin/                     Login and protected admin route group
  api/admin/                 Protected management Route Handlers
  api/products/route.ts      Validated catalogue API
  products/[slug]/           Dynamic product detail
  products/categories/[slug]/ Admin-created category records
  media/[...key]/            Object storage media handler
components/
  layout/                    Shared header, footer, data bridge
  motion/                    Route transition and animation utilities
  ui/                        Shared controls and section elements
features/
  company/components/        Editorial page composition and route adapter
  home/components/           Home page sections
  media/components/          Video presentation
  products/
    components/              Catalogue page/card/browser/gallery presentation
    hooks/                   TanStack Query hooks and query keys
    services/                Browser-side product API service
    types/                   Product domain and API contracts
    validation/              Zod query validation
  admin/
    components/              Dashboard, catalog, content, inbox, media, and settings screens
    services/                Server-only catalog/content management logic
    validation/              Zod admin request schemas
lib/
  api/                       JSON response helpers and browser HTTP client
  config/                    Static route and alias configuration
  admin-auth/                Session, password, guard, and audit helpers
  data/                      Server-only Prisma access/mapping
  seo/                       Shared page metadata helpers
  object-storage.ts          Server-only S3-compatible client
  prisma.ts                  Server-only Prisma client
providers/                   Root client-side providers
prisma/                      Schema, migrations, and migration fixtures
docs/                        Architecture and engineering guides
```

Keep route files focused on composing a page and metadata. Feature components, API state, services, types, and validation stay within their owning feature. Only cross-feature UI, layout, and motion utilities belong in `components/`.
