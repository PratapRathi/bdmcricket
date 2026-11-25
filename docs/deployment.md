# Deployment

Deploy as a Node.js Next.js server or a compatible container. Static export is not supported because the app uses Prisma, Route Handlers, runtime metadata/sitemap reads, and object storage streaming.

## Required server environment

- `DATABASE_URL`
- `AWS_ENDPOINT_URL_S3`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_NAME`

Keep all six values server-side. Configure PostgreSQL network access, the S3-compatible bucket, and credentials in the deployment platform. The object store may remain private because `/media/*` streams assets through the app.

## Release sequence

1. Install locked dependencies with `npm ci`.
2. Run `npm run typecheck` and `npm run lint`.
3. Build using `npm run build`.
4. Apply reviewed database migrations with `npm run db:migrate` as a deployment step.
5. Start with `npm run start` and verify `/`, `/products`, `/api/products`, `/sitemap.xml`, and a known `/media/*` URL.

The production browser catalogue API returns private short-lived responses; it is not configured for a shared CDN cache. Use a separate reviewed cache policy before enabling public caching.

The current build emits a `pg-connection-string` forward-compatibility warning for PostgreSQL `sslmode` values such as `require`. Review the deployment's `DATABASE_URL` TLS setting before upgrading to `pg-connection-string` 3 or `pg` 9; keep the choice aligned with the database provider's certificate configuration.
