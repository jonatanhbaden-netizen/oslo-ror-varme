# Pling owner app (Oslo Rør & Varme)

This repo is the **source of truth** for iterating on the Pling owner dashboard with Cursor.

Pling is a voice-agent receptionist for Norwegian trades. The owner opens this phone app after Pling answers: today's calls, unhandled messages, and upcoming jobs. The demo tenant is **Oslo Rør & Varme** (white-label per company). UI copy is Norwegian.

There is **no live Pling API yet**. The app is fully usable on mock data.

## Stack

Vite + React + TypeScript. The Vercel project `oslo-ror-varme` (team `baden-ai`) already deploys this Vite app — keep using that project.

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

Open `http://localhost:5173`. The layout is mobile-first (max 430px, centered on desktop).

## Mock data and the later API

| Piece | Where |
| --- | --- |
| Types (`Call`, `Message`, `Job`, `TodayStats`, `Tenant`, `Priority`) | `src/types.ts` |
| Demo seed (screenshot-faithful records + extra rows, Oslo addresses) | `src/data/mock.ts` |
| Client: mock unless `VITE_PLING_API_URL` is set | `src/api/client.ts` |
| Handled state + tenant edits | `localStorage` key `pling.owner-app.v1` via `src/lib/storage.ts` |

When a real API exists, set:

```bash
VITE_PLING_API_URL=https://api.pling.example
```

The HTTP client expects:

- `GET /v1/dashboard` → `{ tenant, calls, messages, jobs, stats? }`
- `POST /v1/calls/:id/handled`
- `POST /v1/messages/:id/handled`
- `PATCH /v1/tenant`

Until then, leave the env unset. Do not pretend the live API exists.

Reset demo data from **Innstillinger → Nullstill demo**.

## Routes

- `/` I dag (filters: `?filter=needs_action` / `urgent`)
- `/beskjeder` and `/beskjeder/:id`
- `/oppdrag` and `/oppdrag/:id`
- `/samtaler/:id`
- `/innstillinger`

Actions: **Ring** (`tel:`), **SMS** (`sms:`), **Vis vei** (Google Maps URL), **Merk som behandlet** (persisted; item leaves the unhandled list).
