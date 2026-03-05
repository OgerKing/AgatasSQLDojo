---
name: sql-test-lessons
description: Verifies that all zadania (lessons) are solvable by running reference solutions in the SQLite sandbox and comparing to expected_result. Use when adding or changing lessons, validating curriculum content, or when the user asks to verify or test that lessons are solvable.
---

# SQL Test Lessons – Verify zadania are solvable

## Purpose

Ensure every zadanie has a **reference solution** that, when run in the sandbox (schema_ddl + seed_sql), produces exactly the **expected_result**. This catches mistakes in schema, seed data, or expected_result before learners hit them.

## When to use

- After adding or editing zadania in `server/src/zadania/content.js`
- When validating the full curriculum (e.g. before release or after bulk generation)
- When the user asks to "verify lessons are solvable" or "test all SQL lessons"

## Quick workflow

1. **Run the verification script** (from project root or from `server/`):
   ```bash
   npm run verify-lessons
   ```
   Or: `node server/scripts/verify-zadania-solvable.js` (root), or `node scripts/verify-zadania-solvable.js` (from `server/`).
2. If any zadanie fails: fix `schema_ddl`, `seed_sql`, `expected_result`, or `solution_sql` so the solution produces the expected rows.
3. Re-run until exit code 0.

## Zadanie shape for solvability

- **Required for run:** `schema_ddl`, `seed_sql`, `expected_result` (already required by `validate-zadania.js`).
- **Required for solvability check:** optional **`solution_sql`** – a SELECT query that is the reference correct answer. The script runs it in the sandbox and compares result to `expected_result` (order-insensitive row set match, same as the Run SQL API).

If a zadanie has no `solution_sql`, the script skips the run check for that zadanie (and in strict mode can fail). When adding new lessons, add `solution_sql` so solvability can be verified.

## Script behaviour

- **Location:** `server/scripts/verify-zadania-solvable.js`
- Loads `ZADANIA` from `../src/zadania/content.js`.
- For each zadanie that has `schema_ddl`, `seed_sql`, `expected_result`, and `solution_sql`:
  - Runs `solution_sql` via `runInSandbox(zadanie, solution_sql)`.
  - Compares `result.rows` to `zadanie.expected_result` with `rowsMatchExpected` (same as Run SQL API).
- Reports: which zadania passed, which failed (with id and error or mismatch), and which were skipped (no solution_sql or missing schema/seed).
- **Exit code:** 0 if all runnable zadania passed; 1 if any failed or (optional) if any are missing solution_sql in strict mode.

## Fixing failures

| Symptom | Likely cause | Fix |
|--------|----------------|-----|
| Sandbox error (e.g. no such column) | `solution_sql` or schema typo | Correct `solution_sql` or `schema_ddl` to match. |
| Rows don't match expected | Wrong `expected_result` or wrong `solution_sql` | Align `expected_result` with the result of the intended solution, or fix `solution_sql`. |
| Skipped (no solution_sql) | New zadanie without reference solution | Add `solution_sql` that produces `expected_result`. |

## Relation to other validation

- **`validate-zadania.js`** – Structure only: count, unique ids, required fields, presence of schema_ddl/seed_sql (or schema_key). Run it for structural checks.
- **`verify-zadania-solvable.js`** – Runtime check: run reference solution and compare to expected_result. Run it to confirm every lesson is solvable.

Run both when validating content; order doesn't matter.
