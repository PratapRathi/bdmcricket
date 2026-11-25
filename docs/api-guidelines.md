# API guidelines

## Implemented handlers

All JSON handlers use `{ data: ... }` on success and `{ error: { code, message } }` on failure. Admin handlers validate inputs with Zod, check a signed admin session, apply same-origin checks to writes, return explicit status codes, and avoid caching private responses.

| Method and URL | Purpose |
| --- | --- |
| `GET /api/products` | Search, filter, and sort published products for the browser |
| `POST /api/contact` | Validate and persist a public contact enquiry; honeypot and per-IP rate limit |
| `GET /media/[...key]` | Stream registered public media assets from object storage |
| `POST /api/admin/auth/login` | Verify admin credentials and issue an HttpOnly signed session cookie |
| `POST /api/admin/auth/logout` | Clear the current admin session |
| `PATCH /api/admin/auth/credentials` | Change admin ID/password; increment session version to revoke other sessions |
| `GET /api/admin/overview` | Dashboard counts, recent enquiries, low-stock count, and audit history |
| `GET, POST /api/admin/products` | List/create products, including stock and catalog relations |
| `PATCH, DELETE /api/admin/products/[id]` | Update/remove a product |
| `GET, POST /api/admin/categories` | List/create product categories |
| `PATCH, DELETE /api/admin/categories/[id]` | Update/remove a category (a category with products cannot be removed) |
| `POST /api/admin/subcategories` | Create a subcategory |
| `PATCH, DELETE /api/admin/subcategories/[id]` | Update/remove a subcategory |
| `GET /api/admin/content` | Load company, notice, milestone, insight, award, page-copy, and rating data |
| `PATCH /api/admin/content/profile` | Update company profile and registered media references |
| `PATCH /api/admin/content/notice` | Update or unpublish the site notice |
| `PUT /api/admin/content/ratings` | Replace the five-star rating distribution |
| `GET, POST /api/admin/content/milestones` | List/create company timeline milestones |
| `PATCH, DELETE /api/admin/content/milestones/[id]` | Update/remove a milestone |
| `GET, POST /api/admin/content/insights` | List/create company story, quality, and centenary entries |
| `PATCH, DELETE /api/admin/content/insights/[id]` | Update/remove a company insight |
| `GET, POST /api/admin/content/awards` | List/create awards |
| `PATCH, DELETE /api/admin/content/awards/[id]` | Update/remove an award |
| `PATCH /api/admin/content/editorial/[slug]` | Edit title, introduction, SEO description, and visibility for an existing filesystem route |
| `GET /api/admin/enquiries` | Search and filter contact submissions (30 per page) |
| `PATCH, DELETE /api/admin/enquiries/[id]` | Update status/private notes or remove a submission |
| `GET /api/admin/enquiries/export` | Download up to 10,000 contact submissions as CSV |
| `GET, POST /api/admin/media` | List registered media or upload a JPEG/PNG/WebP/GIF image (8 MB maximum) |
| `PATCH, DELETE /api/admin/media/[id]` | Update alt text or delete unreferenced media from S3 |

## Security and validation

- `ADMIN_SESSION_SECRET` must be a private random value at least 32 bytes long. The cookie is HttpOnly, SameSite Strict, Secure in production, and expires after eight hours. Active state and session version are rechecked against PostgreSQL.
- Admin write requests require an `Origin` equal to `APP_ORIGIN` (or the request origin when unset). Set `APP_ORIGIN` to the public origin in every deployment.
- Admin passwords are stored as scrypt hashes. Login uses generic errors and a five-failure, fifteen-minute account lock. The initial account is created only by the private `npm run admin:bootstrap` operator command; there is no default ID/password or public account-creation endpoint.
- Contact submissions are validated, include a hidden honeypot, and are limited to three stored submissions per hashed client IP per ten minutes. Raw IP addresses are not stored. Production deployments should ensure their trusted proxy supplies the client IP headers used by the handler.
- File upload MIME type, extension, size, and alt text are validated. Referenced media cannot be deleted. S3 and PostgreSQL operations should be monitored in production.
- Contact data contains personal information. Restrict database access and define a retention policy before production use.

## Adding a handler

Create `app/api/<resource>/route.ts`, validate at the boundary with Zod, use `withAdmin` for protected handlers, and keep business rules in a server-only feature service. Return shared response helpers and add the endpoint here. Client components call `lib/api/client.ts` through feature-owned code; never expose Prisma, storage credentials, or database URLs to the browser.
