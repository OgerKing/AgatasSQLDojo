import "dotenv/config";
import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health.js";
import { authRouter } from "./routes/auth.js";
import { progressRouter } from "./routes/progress.js";
import { runSqlRouter } from "./routes/runSql.js";
import { zadaniaRouter } from "./routes/zadania.js";
import { mistrzRouter } from "./routes/mistrz.js";
import { db, runMigrations } from "./db.js";
import { seedUsersIfEmpty } from "./seedUsers.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/progress", progressRouter);
app.use("/api/run-sql", runSqlRouter);
app.use("/api/zadania", zadaniaRouter);
app.use("/api/mistrz", mistrzRouter);

app.get("/api", (_req, res) => {
  res.json({ app: "Agatas SQL Cech", version: "0.1.0" });
});

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
