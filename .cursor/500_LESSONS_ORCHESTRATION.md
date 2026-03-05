# Orchestration Plan: Finishing the 500 SQL Lessons

This document applies **enterprise-technical-PM** practices to finish the curriculum in [.cursor/500_LESSONS.md](.cursor/500_LESSONS.md) by orchestrating multiple agents. Use it to assign work, enforce dependencies, and avoid conflicts.

---

## 1. Scope and deliverables

### 1.1 In scope (this orchestration)

| Deliverable | Description | Acceptance criteria |
|-------------|-------------|---------------------|
| **Shared schemas** | One source of truth for DDL + seed per “schema key” (e.g. `wydarzenia`, `wydarzenia_miejsca`, `types_demo`). | Reusable from `server/src/zadania/schemas.js`; no duplicated DDL in lesson content. |
| **500 zadania entries** | Each lesson from 500_LESSONS.md becomes one object in the content module: `id`, `title`, `goal`, `concept`, `stopien`, `reference`, `schema_key` (or inline `schema_ddl`/`seed_sql` where needed), `expected_result`. | Each zadanie has valid `schema_ddl` + `seed_sql` + `expected_result`; order matches curriculum #1–500. |
| **Sandbox compatibility** | Lessons that only need SELECT run in current sandbox. | No change to sandbox for “content-only” wave. |
| **Validation** | Script to verify: (1) 500 entries, (2) no duplicate ids, (3) required fields and schema_ddl/seed_sql (or schema_key) on each. | From `server/`: run `node scripts/validate-zadania.js`; exit 0. |

### 1.2 Out of scope (separate phases)

- **DML/DDL/Transactions in sandbox:** Lessons 24–31 (INSERT/UPDATE/DELETE), 261–270 (transactions), 293–310 (CREATE scripts) require sandbox and success-check changes. Document as “Phase 2 sandbox” and either stub expected_result / skip run, or implement sandbox extensions first.
- **New API or UI features:** GET /api/zadania/next and “next task” UI are in BUILD_PLAN §6; not required to “finish” the 500 lesson definitions.
- **i18n for 500 titles/goals:** Polish only for this pass; EN can be added later.

---

## 2. Dependencies

```
[Shared schemas]   →  Lessons 1–100 (core)
                   →  Lessons 101–223 (functions, transactions, types, CREATE)
                   →  Lessons 224–500 (variants; can use same schemas)

Lessons 1–100      →  Must be implemented before or in lockstep with 101+ (content.js order).
Lessons 101–223    →  Some schemas (e.g. JSON, dates) needed here; can extend schemas.js.
Lessons 224–500    →  Depend on shared schemas; no dependency on each other (parallelizable by chunk).
```

**Blocking:** No agent should add zadania that reference a schema key not yet defined in `schemas.js`. So: **Batch 0 (shared schemas) first**, then content batches.

---

## 3. Risks and mitigations

| Risk | Mitigation |
|------|------------|
| **Merge conflicts** | One agent per batch; batches write to one file (`content.js`) sequentially, or each batch writes to a fragment file (e.g. `content/batch-2.js`) and a final script merges. Prefer sequential appends to avoid conflicts. |
| **Schema drift** | All agents use only `schemas.js` (or explicit “inline only” list). No ad-hoc DDL in lesson objects except when schema is lesson-specific (e.g. CREATE TABLE zadanie). |
| **Wrong expected_result** | For SELECT-only tasks: run learner solution in sandbox and compare to expected_result in validation script. For DML/DDL: defer or use verification_sql later. |
| **Duplicate or missing ids** | Validation script: 500 unique ids; ids match 500_LESSONS.md. |
| **Variant lessons repetitive** | 224–500 are mostly variants (same concept, different id). One agent can do “template + list of (id, title, goal)” and generate entries from 500_LESSONS.md. |

---

## 4. Agent batches (orchestration)

Agents can be run via Cursor (e.g. `mcp_task` or manual “implement batch X” prompts). Each batch has a **scope**, **input**, **output**, and **acceptance criteria**.

### Batch 0: Shared schemas (single agent, run first)

- **Scope:** Define all schema keys used across 1–500. From 500_LESSONS.md and BUILD_PLAN §6: base tables `wydarzenia`; then `wydarzenia` + `miejsca` (for JOINs); optionally `czlonkowie` / `uczestnictwa`; for functions/JSON/dates add small tables as needed.
- **Input:** `.cursor/500_LESSONS.md`, existing `server/src/zadania/content.js` (current 3 zadania).
- **Output:** New file `server/src/zadania/schemas.js` exporting e.g. `SCHEMAS = { wydarzenia: { ddl, seed }, wydarzenia_miejsca: { ddl, seed }, ... }`. Refactor the 3 existing zadania to use `schema_key: 'wydarzenia'` and pull DDL/seed from SCHEMAS.
- **Acceptance:** content.js still works with getZadanieById/listZadania; sandbox runInSandbox still receives schema_ddl + seed_sql (content layer can resolve schema_key to ddl+seed when serving).

### Batch 1: Lessons 1–50 (core: SELECT → HAVING)

- **Scope:** Lessons 1–50 from 500_LESSONS.md. Already have 1–3 implemented; add 4–50.
- **Input:** 500_LESSONS.md (rows 1–50), `schemas.js`, current `content.js`.
- **Output:** Append to ZADANIA in `content.js` (or add to a fragment). Each entry: id, theme, title, goal, concept, stopien, reference, schema_ddl, seed_sql, expected_result (or schema_key + expected_result if resolved at runtime).
- **Acceptance:** 50 zadania 1–50; SELECT-only; validation script passes for these.

### Batch 2: Lessons 51–100 (JOINs, subqueries, window)

- **Scope:** Lessons 51–100. Requires JOIN schemas (e.g. wydarzenia + miejsca).
- **Input:** 500_LESSONS.md (51–100), `schemas.js`, `content.js`.
- **Output:** Append zadania 51–100. Ensure schema_ddl/seed_sql for JOIN tasks include both tables.
- **Acceptance:** 100 total zadania 1–100; no duplicate ids.

### Batch 3: Lessons 101–173 (functions: scalar, aggregate, date, JSON, window)

- **Scope:** 101–173. Various schemas (same wydarzenia for string functions; small tables for date/JSON if needed).
- **Input:** 500_LESSONS.md (101–173), `schemas.js`, `content.js`.
- **Output:** Append zadania 101–173. Use existing or new schema keys as needed.
- **Acceptance:** 173 total; SELECT-only where applicable; references match SQLite docs.

### Batch 4: Lessons 174–223 (transactions, string concat, UPDATE multi-table, types, CREATE, variants start)

- **Scope:** 174–223. Includes transactions (174–183), string concat (184–189), UPDATE multi-table (190–195), types (196–205), CREATE (206–223), and first variants (224–223).
- **Input:** 500_LESSONS.md (174–223), `schemas.js`, `content.js`.
- **Output:** Append zadania 174–223. For DML/transaction/CREATE lessons: either stub expected_result and document “sandbox Phase 2” or add verification_sql in a follow-up.
- **Acceptance:** 223 total; ids and order correct.

### Batch 5: Lessons 224–350 (variants)

- **Scope:** Variant lessons 224–350. Same concept types (e.g. WHERE NOT IN, BETWEEN, CTE, INSERT SELECT, REPLACE, COALESCE, LEFT JOIN, JOIN+GROUP BY, EXISTS, HAVING SUM, ORDER BY multi, COUNT DISTINCT, window frame); different ids.
- **Input:** 500_LESSONS.md (224–350), `schemas.js`, `content.js`.
- **Output:** Append zadania 224–350. Reuse schemas; expected_result must match correct solution for each variant (can be generated from template + seed).
- **Acceptance:** 350 total; no duplicate ids; SELECT-only variants pass validation.

### Batch 6: Lessons 351–500 (variants)

- **Scope:** Variant lessons 351–500.
- **Input:** 500_LESSONS.md (351–500), `schemas.js`, `content.js`.
- **Output:** Append zadania 351–500.
- **Acceptance:** 500 total; validation script passes; listZadania returns 500 items in order.

---

## 5. Implementation order (recommended)

1. **Run Batch 0** (shared schemas) and refactor existing 3 zadania to use it.
2. **Run Batch 1** then **Batch 2** (lessons 1–100). Optionally run 1 and 2 in sequence in one agent session.
3. **Run Batch 3** (101–173).
4. **Run Batch 4** (174–223).
5. **Run Batch 5** (224–350) and **Batch 6** (351–500). These can be parallelized if content is written to separate fragment files and merged with a script; otherwise run 5 then 6 sequentially.

---

## 6. How to run agents

- **Single agent (sequential):** “Implement Batch 0 from .cursor/500_LESSONS_ORCHESTRATION.md” then “Implement Batch 1”, etc.
- **Parallel (with merge):** “Implement Batch 5 into `server/src/zadania/content/batch-5.js`” and “Implement Batch 6 into `server/src/zadania/content/batch-6.js`”; then add a merge step that concatenates ZADANIA from batch files into main content.js.
- **Validation after each batch:** From repo root: `cd server && node scripts/validate-zadania.js`. Until 500 entries exist, adjust TARGET_COUNT in the script or run for structural checks only.

---

## 7. References

- [.cursor/500_LESSONS.md](.cursor/500_LESSONS.md) – source of truth for lesson ids, titles, goals, concepts, stopień, references.
- [BUILD_PLAN.md](.cursor/BUILD_PLAN.md) §6 – expansion to 100/500 tasks, shared schema pattern, next-task flow.
- [sql-teaching-progression](.cursor/skills/sql-teaching-progression/SKILL.md) – concept order and exercise design.
- [server/src/zadania/content.js](../server/src/zadania/content.js) – current zadania array and list/get API.
- [server/src/sandbox.js](../server/src/sandbox.js) – SELECT-only execution; DML/DDL/transactions noted for future extension.
