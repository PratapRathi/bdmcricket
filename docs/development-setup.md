# Development setup

## Requirements

- Node.js `>=20.9.0` (declared by the installed Next.js package); current verification used Node 22.13.0 and npm 10.9.2.
- PostgreSQL database reachable using `DATABASE_URL`.
- S3-compatible object storage with a bucket and keys configured in `.env`.

## Configure and run

1. Run `npm install`.
2. Copy `.env.example` to `.env` and fill `DATABASE_URL`, `AWS_ENDPOINT_URL_S3`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, and `S3_BUCKET_NAME`.
3. Run `npm run db:migrate` to apply checked-in migrations.
4. If setting up the original content, run `npm run data:migrate` to upload/register media and import source records.
5. Run `npm run dev`.

Do not commit `.env` or expose server-only settings to client code. `npm run db:seed` seeds content records when media assets are already registered; rerun `data:migrate` only when the source import is intended.

## Quality commands

- `npm run typecheck` regenerates route types and runs TypeScript.
- `npm run lint` runs ESLint.
- `npm run build` builds the production app with webpack.
- `npm test` runs the Node.js test runner against the Zod query and static route configuration checks.

Database-backed API and page verification should use the running app and configured PostgreSQL/S3 services; unit tests do not replace those integration checks.
