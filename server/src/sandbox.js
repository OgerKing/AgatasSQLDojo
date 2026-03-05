/**
 * SQLite sandbox: one DB per request from zadanie schema + seed. Execute learner query as-is.
 * @see TECHNICAL_SPEC §6
 */

import Database from "better-sqlite3";

const MAX_QUERY_LENGTH = 10_000;
const ALLOWED_PREFIXES = ["SELECT"]; // read-only (SELECT, optionally with WHERE/ORDER BY)

/**
 * Map SQLite error message to learner-friendly Polish.
 * @see BUILD_PLAN Phase 1 – Error mapping
 */
const ERROR_MAP = [
  [/no such column/i, "Sprawdź schemat – ta kolumna może mieć inną nazwę."],
  [/no such table/i, "Sprawdź schemat – ta tabela może mieć inną nazwę."],
  [/syntax error/i, "Sprawdź składnię SQL (np. brakujący cudzysłów lub przecinek)."],
  [/near/i, "Błąd składni w zapytaniu. Sprawdź pisownię i znaki."],
];

function mapError(message) {
  for (const [pattern, friendly] of ERROR_MAP) {
    if (pattern.test(message)) return friendly;
  }
  return "Wystąpił błąd bazy danych. Sprawdź zapytanie i schemat.";
}

/**
 * Run learner query in a fresh SQLite DB built from zadanie's schema_ddl and seed_sql.
 * @param {{ schema_ddl: string, seed_sql: string }} zadanie
 * @param {string} query
 * @returns {{ columns: string[], rows: unknown[] } | { error: string }}
 */
export function runInSandbox(zadanie, query) {
  const trimmed = (query || "").trim();
  if (!trimmed) {
    return { error: "Wpisz zapytanie SQL." };
  }
  if (trimmed.length > MAX_QUERY_LENGTH) {
    return { error: "Zapytanie jest za długie." };
  }

  const upper = trimmed.toUpperCase();
  const allowed = ALLOWED_PREFIXES.some((p) => upper.startsWith(p));
  if (!allowed) {
    return { error: "Do tego zadania dozwolone są tylko zapytania SELECT." };
  }

  const db = new Database(":memory:");
  try {
    db.exec(zadanie.schema_ddl);
    db.exec(zadanie.seed_sql);

    const stmt = db.prepare(trimmed);
    const rows = stmt.all();
    const columns = stmt.columns().map((c) => c.name);

    return { columns, rows };
  } catch (err) {
    return { error: mapError(err.message) };
  } finally {
    db.close();
  }
}
