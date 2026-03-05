#!/usr/bin/env bash
# Agatas SQL Cech – start dev environment in order: Postgres → API → Client
# Usage: ./scripts/start-dev.sh   (from repo root)
# Or:    bash scripts/start-dev.sh

set -e
cd "$(dirname "$0")/.."
ROOT="$PWD"

echo "== Agatas SQL Cech – dev startup =="

# 1. Postgres
echo ""
echo "[1/5] Postgres..."
if docker compose ps postgres 2>/dev/null | grep -q "Up"; then
  echo "      Postgres already running."
else
  echo "      Starting Postgres (docker compose up -d postgres)..."
  docker compose up -d postgres
fi

# 2. Wait for Postgres
echo ""
echo "[2/5] Waiting for Postgres to accept connections..."
for i in 1 2 3 4 5 6 7 8 9 10; do
  if docker compose exec -T postgres pg_isready -U cech -d cech 2>/dev/null; then
    echo "      Postgres is ready."
    break
  fi
  if [ "$i" -eq 10 ]; then
    echo "      ERROR: Postgres did not become ready in time."
    exit 1
  fi
  sleep 1
done

# 3. Server .env
echo ""
echo "[3/5] Server env..."
if [ ! -f "$ROOT/server/.env" ]; then
  if [ -f "$ROOT/server/.env.example" ]; then
    cp "$ROOT/server/.env.example" "$ROOT/server/.env"
    echo "      Created server/.env from .env.example – check DATABASE_URL and optional OPENAI_API_KEY."
  else
    echo "      WARNING: server/.env not found. Create it with DATABASE_URL, PORT, RUN_MIGRATIONS=1."
  fi
else
  echo "      server/.env present."
fi

# 4. Dependencies
echo ""
echo "[4/5] Dependencies..."
npm install

# 5. Start server in background, then client
echo ""
echo "[5/5] Starting API and Client..."
echo "      API will run on http://localhost:3001"
echo "      Client will run on http://localhost:5173 (proxies /api to API)"
echo ""

# Start server in background; trap to kill on exit
(
  cd "$ROOT/server"
  export DATABASE_URL="${DATABASE_URL:-postgres://cech:cech@localhost:5432/cech}"
  node --watch src/index.js
) &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null || true" EXIT

# Wait for API to be up
echo "      Waiting for API..."
for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/health 2>/dev/null | grep -q 200; then
    echo "      API is up."
    break
  fi
  if [ "$i" -eq 15 ]; then
    echo "      WARNING: API did not respond in time. Check server/.env and DATABASE_URL."
  fi
  sleep 1
done

# Start client in foreground (so user sees logs and URL)
echo ""
echo "      Starting Vite dev server (client)..."
echo "      Open http://localhost:5173 in your browser."
echo ""
cd "$ROOT/client"
exec npm run dev
