# PIXORA

A premium mobile-first educational adventure game for children aged 8–13. Kids explore four magical AI-literacy worlds alongside their companion Pixo, restoring Crystal Memories shattered by the AI Storm.

## Run & Operate

- `pnpm --filter @workspace/pixora run dev` — run the PIXORA game (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion
- Fonts: Baloo 2 (headings), Nunito (body) via Google Fonts
- State: localStorage (fully offline game, no backend)
- Routing: wouter

## Where things live

- `artifacts/pixora/` — the PIXORA game app (preview path: `/`)
- `artifacts/pixora/src/data/challenges.ts` — all 4 worlds × 3 missions × 3 questions
- `artifacts/pixora/src/store/gameStore.tsx` — localStorage game state (XP, progress, badges)
- `artifacts/pixora/src/pages/` — Intro, WorldMap, Challenge, Collection, PixoScreen, ParentSummary
- `artifacts/pixora/src/components/` — Pixo character, BottomNav, HUD

## Architecture decisions

- Fully offline: all game state lives in localStorage under key `pixora_state`
- No backend needed: challenge content embedded as typed constants in `challenges.ts`
- `gameStore.ts` re-exports from `gameStore.tsx` (JSX lives in `.tsx`, TS resolution workaround)
- Framer Motion used for cinematic intro and world transitions
- Brand colors: Primary #FF7A59, Secondary #FFB84D, Accent #6A5CFF, Highlight #00C2A8, BG #FFF8F0

## Product

- Cinematic intro: AI Storm shatters Crystal Memories, Pixo appears, "START ADVENTURE"
- World Map: 4 worlds (Crystal Forest, Echo Library, Truth Observatory, Future City) connected by glowing paths
- Challenge system: 3 missions × 3 questions per world, immediate feedback, XP/star rewards
- Collection: crystals, badges, discovery cards gallery
- Pixo companion screen: mood-based reactions, player stats, sound toggle, parent area
- Parent summary: accuracy, skills, worlds unlocked, achievements

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Always add Google Fonts `@import url(...)` as the VERY FIRST LINE of `index.css`
- `gameStore.ts` must remain a thin re-export; JSX belongs in `gameStore.tsx`
- CSS variables use space-separated HSL values (no `hsl()` wrapper)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
