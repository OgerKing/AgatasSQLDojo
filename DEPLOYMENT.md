# Agatas SQL Cech – Deployment

Target: **AWS EC2 Ubuntu**. App runs in **Docker**; Postgres on same host or RDS. See [TECHNICAL_SPEC §10](.cursor/TECHNICAL_SPEC.md).

## Prerequisites

- AWS account; EC2 instance (Ubuntu 22.04 LTS recommended)
- Domain or public IP for the app
- Postgres (on EC2 or RDS) with database `cech` and user/password

## 1. EC2 setup

- Launch Ubuntu 22.04 AMI; open ports 22 (SSH), 80 (HTTP), 443 (HTTPS if using TLS).
- Install Docker and Docker Compose:
  ```bash
  sudo apt update && sudo apt install -y docker.io docker-compose-v2
  sudo usermod -aG docker $USER
  ```
- (Optional) Install nginx as reverse proxy for TLS and static files.

## 2. App and Postgres with Docker Compose

Example `docker-compose.yml` (adjust paths and env):

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: cech
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: cech
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped

  api:
    build: ./server
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgres://cech:${POSTGRES_PASSWORD}@postgres:5432/cech
      RUN_MIGRATIONS: "1"
      OPENAI_API_KEY: ${OPENAI_API_KEY}
      OPENAI_MODEL: ${OPENAI_MODEL:-gpt-4o-mini}
      PORT: 3001
    depends_on:
      - postgres
    restart: unless-stopped

  client:
    build: ./client   # if you have a Dockerfile that builds Vite and serves static
    # Or serve built client from nginx / api static middleware
```

- Set `RUN_MIGRATIONS=1` on **first deploy** to apply `server/schema/001_initial.sql`. On later deploys you can omit it or set to `0`.
- Store secrets in a `.env` file (not committed): `POSTGRES_PASSWORD`, `OPENAI_API_KEY`, optional `OPENAI_MODEL`.

## 3. Build client for production

```bash
cd client && npm ci && npm run build
```

Serve the `client/dist` folder via:

- **Option A:** Express static in the Node server (mount `express.static('client/dist')` and SPA fallback).
- **Option B:** nginx as reverse proxy: proxy `/api` and `/api/v1` to the Node server; serve `client/dist` for other paths.

## 4. Runtime assumptions

- **Stateless API:** No in-memory session store; JWT only. Safe for multiple API containers behind a load balancer.
- **Logging:** Server logs to stdout/stderr; capture with Docker or systemd for debugging.
- **Errors:** Startup failures and Mistrz errors go to `console.error`; ensure log aggregation if needed.
- **Health:** `GET /api/health` or `GET /api/v1/health` for liveness.

## 5. Checklist

- [ ] Postgres running; `DATABASE_URL` correct; migrations applied once.
- [ ] `OPENAI_API_KEY` set if Mistrz is required.
- [ ] Client built and served (static + API proxy).
- [ ] Ports 80/443 (and 3001 if not behind proxy) open; firewall configured.
- [ ] Env files not committed; secrets in `.env` or secret manager.
