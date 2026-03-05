import pg from "pg";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { Pool } = pg;
const __dirname = dirname(fileURLToPath(import.meta.url));

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/** Run schema if RUN_MIGRATIONS=1 (e.g. in Docker or first run). */
export async function runMigrations() {
  if (process.env.RUN_MIGRATIONS !== "1") return;
  const schemaPath = join(__dirname, "..", "schema", "001_initial.sql");
  const sql = readFileSync(schemaPath, "utf8");
  await db.query(sql);
  console.log("Schema 001_initial applied.");
}
