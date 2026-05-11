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

## Retro Arcade Design Guide
- Treat the battle page as a retro arcade cabinet: dark, high-contrast, energetic, and slightly theatrical.
- Use the core palette consistently: background `#0a0a1a`, green accent `#5fed83`, purple accent `#8a2be2`, with readable off-white text for body copy and metadata.
- Use `Press Start 2P` from Google Fonts for display text and UI accents; keep fallback fonts simple and readable.
- Favor glow, scanline, shimmer, and pulse effects over flat decoration, but keep them subtle enough that content remains easy to read.
- Prefer animation built from opacity, transform, shadow, and gradient changes; avoid heavy layout-shifting motion.
- Keep the neon title, VS badge, result-card sheen, loading text shift, and contribution-square hover glow feeling cohesive rather than independent.
- Default to continuous but restrained motion: title flicker, badge pulse, and scanline ambience should feel like an arcade cabinet, not a strobe effect.
- Always respect `prefers-reduced-motion` and preserve keyboard focus visibility and tooltip readability when adding visual effects.
- If a new effect does not fit the arcade theme, adjust the approach before adding it rather than layering on a mismatched style.

## Reference Files
- Commands and setup: `README.md`, `package.json`
- Astro runtime config: `astro.config.mjs`
- TypeScript config: `tsconfig.json`
- Deployment behavior: `.github/workflows/deploy.yml`
