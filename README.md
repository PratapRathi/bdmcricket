# BDM Cricket

BDM Cricket is a Next.js App Router storefront. Product and company content is stored in PostgreSQL through Prisma. Public site images are stored in S3-compatible object storage and streamed through the same-origin `/media/*` route.

## Local setup

1. Install dependencies with `npm install`.
2. Configure `.env` with `DATABASE_URL`, `AWS_ENDPOINT_URL_S3`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, and `S3_BUCKET_NAME`.
3. Apply the additive Prisma migrations with `npm run db:migrate`.
4. Upload the cloned site images and import the original catalogue and company content with `npm run data:migrate`.
5. Start the app with `npm run dev`.

`S3_BUCKET_NAME` is the name of the bucket at the configured endpoint. The bucket can remain private because the application streams known public assets through `/media/[...key]`; storage credentials stay on the server.

## Data model

- `prisma/schema.prisma` defines products, categories, subcategories, specifications, ordered product images, media assets, company milestones, company insights, awards, rating summaries, notices, editorial page copy, and legacy redirects.
- `lib/data/` is the server-only data access layer. UI components receive database results as props; no browser component connects to PostgreSQL.
- `prisma/import-source/` contains the original extracted content used for the initial, repeatable import. Runtime routes do not import this content.
- `scripts/migrate-site-data.ts` uploads supported image files from `public/` and then inserts missing media records and seed records. It does not delete database rows or overwrite existing editorial/product records, so later admin edits survive reruns. Uploaded objects use stable `site/` keys.
- Product categories and company insights are stored as editable database records to support the planned admin application. Admin routes and authentication are not included yet.

## Database commands

```bash
npm run db:migrate  # apply checked-in migrations
npm run db:seed     # seed records when media assets are already registered
npm run data:migrate # upload site images and import the original content
```

`DATABASE_URL` must be a PostgreSQL connection URL supported by the `pg` driver. Keep `.env` out of version control. `.env.example` lists the required variable names.

## Routes and catalogue

- The six top-level category routes are `/{category}`.
- Subcategory sections use anchors such as `/bats#english-willow-bats`.
- Product detail routes use `/products/{product-slug}`.
- Existing `.html` page URLs are rewritten to their Next.js routes in `next.config.ts`.
