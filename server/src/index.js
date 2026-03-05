import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { healthRouter } from "./routes/health.js";
import { authRouter } from "./routes/auth.js";
import { progressRouter } from "./routes/progress.js";
import { runSqlRouter } from "./routes/runSql.js";
import { zadaniaRouter } from "./routes/zadania.js";
import { mistrzRouter } from "./routes/mistrz.js";
import { teacherRouter } from "./routes/teacher.js";
import { themesRouter } from "./routes/themes.js";
import { db, runMigrations } from "./db.js";
import { seedUsersIfEmpty } from "./seedUsers.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: true }));
app.use(express.json());

const apiRouters = [
  ["/health", healthRouter],
  ["/auth", authRouter],
  ["/progress", progressRouter],
  ["/run-sql", runSqlRouter],
  ["/zadania", zadaniaRouter],
  ["/mistrz", mistrzRouter],
  ["/teacher", teacherRouter],
  ["/themes", themesRouter],
];
for (const [path, router] of apiRouters) {
  app.use("/api" + path, router);
  app.use("/api/v1" + path, router);
}

app.get("/api", (_req, res) => {
  res.json({ app: "Agatas SQL Cech", version: "0.1.0" });
});
app.get("/api/v1", (_req, res) => {
  res.json({ app: "Agatas SQL Cech", version: "0.1.0", api: "v1" });
});

// Serve built client when present (e.g. in Docker); same origin so /api works without proxy
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.join(__dirname, "..", "client-dist");
const { existsSync } = await import("fs");
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api")) return next();
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

async function start() {
  if (!process.env.DATABASE_URL) {
    console.error("Failed to start: DATABASE_URL is not set. Copy server/.env.example to server/.env and set DATABASE_URL (e.g. postgres://cech:cech@localhost:5432/cech).");
    process.exit(1);
  }
  try {
    await runMigrations();
    await seedUsersIfEmpty();
    await db.query("SELECT 1");
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start:", err.message || String(err));
    if (err.code) console.error("Code:", err.code);
    process.exit(1);
  }
}

start();
