# Agatas SQL Cech

Gamified SQL learning app with Mistrz (LLM tutor). Polish cech theme; Polonia + Wizards + Urban mom themes; progress in Postgres.

## Stack

- **Client:** SPA (React + Vite), client-side routing
- **Server:** Node (Express), Postgres (users + progress), SQLite sandbox (Phase 1+)
- **Deploy:** Docker, EC2 Ubuntu

See [.cursor/TECHNICAL_SPEC.md](.cursor/TECHNICAL_SPEC.md) and [.cursor/BUILD_PLAN.md](.cursor/BUILD_PLAN.md).

## Run locally

1. **Postgres:** Start Postgres (e.g. `docker compose up -d postgres` or local Postgres). Create DB `cech` and user if needed; or use:
   ```bash
   docker compose up -d postgres
   ```
2. **Env:** Copy `.env.example` to `server/.env` and set `DATABASE_URL`. For Docker Postgres: `postgres://cech:cech@localhost:5432/cech`. Set `RUN_MIGRATIONS=1` once to apply schema.
3. **Server:** `cd server && npm install && npm run dev` (listens on :3001).
4. **Client:** `cd client && npm install && npm run dev` (Vite dev server; proxies /api to server).

Open the client URL (e.g. http://localhost:5173). You should see "Cech" and a link to Zadania. **Login** (optional for running SQL; required to save progress): go to Zaloguj, then use **student@cech.local** or **teacher@cech.local** with password **cech** (seed users created on first server start).

**Mistrz (LLM tutor):** Set `OPENAI_API_KEY` in `server/.env` to enable "Zapytaj Mistrza" on each zadanie. Optional: `OPENAI_MODEL=gpt-4o-mini` (default) or another model.

## Run with Docker (API + Postgres)

```bash
docker compose up --build
```

Server at http://localhost:3001; run client separately with `npm run dev` in `client/` for frontend dev.

## Deployment (Phase 5)

- **Target:** AWS EC2 Ubuntu. Run app (SPA + Node API) in Docker; Postgres on same host or RDS.
- **Env:** Document in `.env.example` / `server/.env`: `DATABASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL`, `PORT`, `RUN_MIGRATIONS`. Logging/errors: server uses `console.error` for startup and Mistrz errors.
- **Build:** `client`: `npm run build` → static assets; serve via Express static or nginx. `server`: run via `node` or Docker; migrations on first deploy with `RUN_MIGRATIONS=1`.

## Project layout

- `client/` – React SPA (Vite)
- `server/` – Node API (Express), `server/schema/` for Postgres migrations
- `.cursor/` – Product vision, technical spec, build plan, skills
