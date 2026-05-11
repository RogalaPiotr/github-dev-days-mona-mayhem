# Project Guidelines

## Project Overview
- Mona Mayhem is an Astro starter for a GitHub contribution battle app.
- Product code lives in `src/` and static assets in `public/`.
- Ignore `workshop/` content unless the user explicitly asks to work on workshop materials.
- For project context, link to `README.md` instead of duplicating long descriptions.

## Architecture
- Main page entry: `src/pages/index.astro`.
- API route for contribution data: `src/pages/api/contributions/[username].ts`.
- Astro routes map from `src/pages/**` directly to URL paths.
- Runtime configuration is in `astro.config.mjs` with server output and Node adapter.

## Build And Dev Commands
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build production output: `npm run build`
- Preview build locally: `npm run preview`
- There is currently no test suite configured; do not invent test commands.

## Astro And TypeScript Best Practices
- Keep `.astro` pages minimal and split reusable UI into components if complexity grows.
- Use server routes in `src/pages/api/**` for data fetching that should not happen in the browser.
- Keep API handlers typed with `APIRoute` and return explicit status codes and JSON headers.
- Preserve `export const prerender = false` for dynamic API endpoints that require runtime execution.
- Follow strict TypeScript settings from `tsconfig.json` (`astro/tsconfigs/strict`) and avoid `any` unless unavoidable.
- Prefer small, focused edits that keep existing project structure and naming conventions.

## Reference Files
- Commands and setup: `README.md`, `package.json`
- Astro runtime config: `astro.config.mjs`
- TypeScript config: `tsconfig.json`
- Deployment behavior: `.github/workflows/deploy.yml`
