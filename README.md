# BDM Cricket

BDM Cricket is a Next.js App Router website. Website pages are explicit filesystem routes; PostgreSQL via Prisma stores product and company content, and S3-compatible object storage holds site media served through `/media/*`.

## Local setup

1. Run `npm install`.
2. Configure `.env` with `DATABASE_URL`, `AWS_ENDPOINT_URL_S3`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, and `S3_BUCKET_NAME`.
3. Apply migrations with `npm run db:migrate`.
4. For an initial data import, run `npm run data:migrate`.
5. Start development with `npm run dev`.

## Architecture

- Explicit pages live under `app/`; product details use the genuine dynamic route `/products/[slug]`.
- Server Components access Prisma through server-only modules in `lib/data/`.
- Interactive product search/filter/sort uses `GET /api/products`, Zod validation, and TanStack Query.
- `/media/[...key]` streams registered S3 objects while keeping credentials on the server.
- The six category routes are `/bats`, `/balls`, `/kit-bag`, `/protective-gear`, `/accessories`, and `/clothing`.

See [PROJECT_MEMORY.md](PROJECT_MEMORY.md) for the technical handoff and [`docs/`](docs/README.md) for routing, architecture, API, development, deployment, and roadmap guides.

## Commands

```sh
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
npm run db:migrate
npm run data:migrate
```
