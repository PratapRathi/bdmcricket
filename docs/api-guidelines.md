# API guidelines

## Current handlers

| Method and URL | Purpose |
| --- | --- |
| `GET /api/products` | Search, filter, and sort published products for the browser |
| `GET /media/[...key]` | Stream registered public media assets from object storage |

Add only endpoints needed by an implemented feature. Admin, contact submission, cart, checkout, and mutation endpoints do not exist yet.

## Conventions

- Route Handler files live below `app/api/` and use Web `Request`/`Response` APIs.
- Validate query/body data at the handler boundary with Zod. Return `400` for invalid input.
- Success responses use `{ data: ... }`. Error responses use `{ error: { code, message } }` and the appropriate HTTP status.
- Keep Prisma and feature business logic in server-only services under `lib/data/` or a feature service. Route handlers parse, call a service, and map errors to HTTP responses.
- Do not reveal secrets, SQL/Prisma messages, or stack traces to clients. Log actionable diagnostics server-side where needed.
- Client code calls `lib/api/client.ts` through feature-specific API services; it does not call a backend data source directly.
- Keep S3 credentials and database URLs in server environment variables. Never prefix them with `NEXT_PUBLIC_`.

## Adding a handler

Create `app/api/<resource>/route.ts`, add a Zod schema and service call, use the shared response helpers in `lib/api/responses.ts`, and add a feature client service/query hook only if browser interaction needs the data. Document method, URL, validation, and response shape here.
