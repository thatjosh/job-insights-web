# AGENTS.md

Operating notes for anyone (human or agent) working in this repo. Keep edits
small and reversible; the UI is being grown deliberately, one piece at a time.

## Project layout

| Path | What lives there |
|---|---|
| `web/app/` | Next.js App Router pages and layout. |
| `web/components/` | Presentational React components. |
| `web/lib/` | Pure helpers and the data-access layer. |
| `web/types/` | Shared TypeScript types (snapshot contract lives here). |
| `web/public/data/` | Pipeline-written JSON. Generated, not committed. |

The JSON contract is owned by the sibling pipeline `job-insights`.
This repo's `web/types/snapshot.ts` must track it.

## Coding principles

- Functional React only — no class components.
- Small, focused components — one responsibility per file. Split when a
  component manages more than one concern.
- Server components by default; add `"use client"` only when you need state,
  refs, effects, or browser-only APIs.
- Pure functions for derivations. Co-locate them with the component that uses
  them; only promote to `lib/` when reused.
- Props are explicit and typed. No `any`; prefer `unknown` plus narrowing at
  boundaries.
- One default export per component file; named exports for everything else
  (helpers, types).
- Tailwind for styling. No CSS modules. Inline `style` only for dynamic values
  that can't be expressed as utility classes.
- Compose primitives — accept `className` on reusable components so callers
  can override.

## Data layer

- All data access goes through `web/lib/data.ts`. Components never import
  from `mock-data.ts` directly.
- When the real JSON lands, only `data.ts` changes — components stay put.
- Types in `web/types/snapshot.ts` are the contract; `website-plan.md` §8 is
  the source of truth.

## Map renderer

- Basemap is maplibre-gl via react-map-gl (`react-map-gl/maplibre` subpath).
- All tile and style configuration goes through `web/lib/map.ts`. Components
  consume the `MAP_STYLE` constant — never the tile URL directly. This makes
  the provider swappable via `NEXT_PUBLIC_MAP_STYLE_URL`.
- maplibre-gl touches `window` at module load, so it must be loaded
  client-side only. `MapPanel` uses `next/dynamic` with `ssr: false` to
  load `MapView`; keep that wrapper in place.
- Bubble overlay is DOM `<Marker>`s today. At ~100+ cities, swap to a
  deck.gl `ScatterplotLayer` — DOM markers stop scrolling smoothly past
  that point.

## Naming

- Components: PascalCase files matching the export (`JobList.tsx` exports
  `JobList`).
- Hooks: `useThing.ts`.
- Pure helpers: camelCase files (`formatDate.ts`).

## What NOT to add until asked

shadcn/ui, deck.gl, recharts, state libraries, testing frameworks. The
user will guide when these come in.

## Package manager

pnpm. `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm add <pkg>`. The
version is pinned via the `packageManager` field in `web/package.json`;
install-script allowlist lives in `web/pnpm-workspace.yaml` under
`allowBuilds` (sharp and unrs-resolver are required by Next.js).

## Commit style

Short imperative title (`Add foo`). Body 0–2 sentences, omitted when the
title is self-explanatory.
