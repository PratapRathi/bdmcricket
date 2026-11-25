# Deployment

Deploy as a Node.js Next.js server or a compatible container. Static export is not supported because the app uses Prisma, Route Handlers, runtime metadata/sitemap reads, and object storage streaming.

## Required server environment

- `DATABASE_URL`
- `AWS_ENDPOINT_URL_S3`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_NAME`
- `ADMIN_SESSION_SECRET` (random private value, at least 32 bytes)
- `APP_ORIGIN` (exact public application origin, including scheme)

Keep all six values server-side. Configure PostgreSQL network access, the S3-compatible bucket, and credentials in the deployment platform. The object store may remain private because `/media/*` streams assets through the app.

Also keep admin and contact configuration server-side. Never set `ADMIN_SESSION_SECRET`, admin credentials, or AWS keys as `NEXT_PUBLIC_*`. Create the first admin through the operator-only bootstrap command in a controlled environment after applying migrations; remove its bootstrap password variable immediately. The bootstrap command is intentionally not run as part of deployment and there are no default credentials. Back up contact submissions and define their retention period; they contain personal information.

## Release sequence

1. Install locked dependencies with `npm ci`.
2. Run `npm run typecheck` and `npm run lint`.
3. Build using `npm run build`.
4. Apply reviewed database migrations with `npm run db:migrate` as a deployment step.
5. Start with `npm run start` and verify `/`, `/products`, `/api/products`, `/sitemap.xml`, `/admin/login`, and a known `/media/*` URL. Verify the admin bootstrap in a controlled deployment environment; do not expose bootstrap credentials in build logs.

The production browser catalogue API returns private short-lived responses; it is not configured for a shared CDN cache. Use a separate reviewed cache policy before enabling public caching.

The current build emits a `pg-connection-string` forward-compatibility warning for PostgreSQL `sslmode` values such as `require`. Review the deployment's `DATABASE_URL` TLS setting before upgrading to `pg-connection-string` 3 or `pg` 9; keep the choice aligned with the database provider's certificate configuration.
