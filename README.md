# Pling (Oslo Rør & Varme)

This repo is the **source of truth** for iterating on Pling with Cursor: the owner dashboard and the public marketing site. Both deploy on the existing Vercel project `oslo-ror-varme` (team `baden-ai`).

Pling is a voice-agent receptionist for Norwegian trades. Unrelated to pling.care. UI copy is Norwegian.

There is **no live Pling API yet**. The owner app is fully usable on mock data.

## Run

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

- Owner app: `http://localhost:5173/` (phone shell, max 430px)
- Marketing: `http://localhost:5173/site`

## Owner dashboard

Demo tenant: **Oslo Rør & Varme** (white-label per company).

| Piece | Where |
| --- | --- |
| Types (`Call`, `Message`, `Job`, `TodayStats`, `Tenant`, `Priority`) | `src/types.ts` |
| Demo seed | `src/data/mock.ts` |
| Client: mock unless `VITE_PLING_API_URL` is set | `src/api/client.ts` |
| Handled state + tenant edits | `localStorage` key `pling.owner-app.v1` |

When a real API exists, set `VITE_PLING_API_URL`. Expected shape is documented in `src/api/client.ts`. Do not pretend the live API exists. Reset demo data from **Innstillinger → Nullstill demo**.

Routes: `/`, `/beskjeder`, `/oppdrag`, `/samtaler/:id`, `/innstillinger`.

## Marketing site (`/site`)

Public site you send a rørlegger or elektriker to. Same bento system. Interactive demo on the home page (real dashboard cards, not screenshots). Names like Bergen Rør AS are labeled as example data.

- `/site` home + live demo
- `/site/slik-fungerer-det`
- `/site/for-rorleggere`
- `/site/for-elektrikere`
- `/site/kontakt`

Contact form `POST /api/contact` is a real handler (`api/contact.js` on Vercel, Vite middleware in `vite.config.ts`). Submissions append JSON lines to `data/leads.jsonl` locally, or `/tmp/pling-leads.jsonl` on Vercel (ephemeral on serverless until a database is added). Failed saves return an error — the form does not swallow submits.

## Stack

Vite + React + TypeScript. Keep the existing Vercel project; do not create a new one.
