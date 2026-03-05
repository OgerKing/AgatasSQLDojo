/**
 * SQLite sandbox: one DB per request from zadanie schema + seed. Execute learner query as-is.
 * @see TECHNICAL_SPEC §6
 */

import Database from "better-sqlite3";

const MAX_QUERY_LENGTH = 10_000;
const ALLOWED_PREFIXES = ["SELECT"]; // read-only (SELECT, optionally with WHERE/ORDER BY)

/**
 * Map SQLite error message to learner-friendly text. Supports pl / en.
 * @see BUILD_PLAN Phase 1 – Error mapping
 */
const ERROR_MAP_PL = [
  [/no such column/i, "Sprawdź schemat – ta kolumna może mieć inną nazwę."],
  [/no such table/i, "Sprawdź schemat – ta tabela może mieć inną nazwę."],
  [/syntax error/i, "Sprawdź składnię SQL (np. brakujący cudzysłów lub przecinek)."],
  [/near/i, "Błąd składni w zapytaniu. Sprawdź pisownię i znaki."],
];

const ERROR_MAP_EN = [
  [/no such column/i, "Check the schema – this column may have a different name."],
  [/no such table/i, "Check the schema – this table may have a different name."],
  [/syntax error/i, "Check your SQL syntax (e.g. missing quote or comma)."],
  [/near/i, "Syntax error in the query. Check spelling and characters."],
];

const FALLBACK = { pl: "Wystąpił błąd bazy danych. Sprawdź zapytanie i schemat.", en: "A database error occurred. Check your query and schema." };

function mapError(message, locale = "pl") {
  const map = locale === "en" ? ERROR_MAP_EN : ERROR_MAP_PL;
  for (const [pattern, friendly] of map) {
    if (pattern.test(message)) return friendly;
  }
  return locale === "en" ? FALLBACK.en : FALLBACK.pl;
}

const EMPTY_QUERY = { pl: "Wpisz zapytanie SQL.", en: "Enter an SQL query." };
const QUERY_TOO_LONG = { pl: "Zapytanie jest za długie.", en: "Query is too long." };
const SELECT_ONLY = { pl: "Do tego zadania dozwolone są tylko zapytania SELECT.", en: "Only SELECT queries are allowed for this task." };

/**
 * Run learner query in a fresh SQLite DB built from zadanie's schema_ddl and seed_sql.
 * @param {{ schema_ddl: string, seed_sql: string }} zadanie
 * @param {string} query
 * @param {{ locale?: string }} options locale "en" or "pl" for error messages
 * @returns {{ columns: string[], rows: unknown[] } | { error: string }}
 */
export function runInSandbox(zadanie, query, options = {}) {
  const locale = options.locale === "en" ? "en" : "pl";
  const trimmed = (query || "").trim();
  if (!trimmed) {
    return { error: EMPTY_QUERY[locale] };
  }
  if (trimmed.length > MAX_QUERY_LENGTH) {
    return { error: QUERY_TOO_LONG[locale] };
  }

  const upper = trimmed.toUpperCase();
  const allowed = ALLOWED_PREFIXES.some((p) => upper.startsWith(p));
  if (!allowed) {
    return { error: SELECT_ONLY[locale] };
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
    return { error: mapError(err.message, locale) };
  } finally {
    db.close();
  }
}
