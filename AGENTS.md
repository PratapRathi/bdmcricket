# Instructions for AI Coding Agents

Before making any changes:

1. Read PROJECT_MEMORY.md.
2. Read relevant documentation under docs/.
3. Understand the existing feature module.
4. Follow the established architectural conventions.
5. Do not introduce a new architectural pattern without
   evaluating its impact on the existing application.
6. Keep Prisma, S3, admin credentials, and contact submissions server-side.
7. Keep website route definitions in the filesystem; only genuine product/category resources may use dynamic routes.
8. Never add default admin credentials. Use the documented operator bootstrap process.

After completing significant architectural changes:

1. Update PROJECT_MEMORY.md.
2. Update relevant documentation, including admin/API security rules when those areas change.
3. Record important architectural decisions.
4. Update pending tasks and known limitations.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
