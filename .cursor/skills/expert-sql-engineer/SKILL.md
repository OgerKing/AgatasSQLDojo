---
name: expert-sql-engineer
description: Applies expert SQL engineering: schema design, query writing, optimization, and SQL security. Use when creating or reviewing SQL, designing the practice database, defining zadania, or optimizing queries for AgatasSQLDojo.
---

# Expert SQL Engineer

## Schema for teaching

- **Minimal and clear:** Table and column names readable by learners; only what the zadanie needs.
- **One schema per stopień or topic** if it helps; prefer readability over over-normalization that obscures concepts.
- Provide DDL and seed data for each zadanie; define expected result for auto-check.

## Query quality

- **Formatting:** Keywords uppercase, consistent indentation; meaningful table/column aliases.
- **Style:** Avoid SELECT * in production-like or solution code; list columns explicitly where it teaches clarity.
- **Standard SQL:** Prefer portable constructs where the practice engine (e.g. SQLite) allows; note dialect when necessary.

## Correctness

- Handle NULL, duplicates, and empty sets; ensure zadanie solution is correct and deterministic.
- Test with edge data (no rows, one row, many rows) before locking the expected result.

## Security

- **Parameterized statements only;** never concatenate or interpolate user input into SQL.
- Validate and sanitize in the app layer before execution; treat learner input as untrusted.

## Performance (when relevant)

- Add indexes for columns used in WHERE, JOIN, ORDER BY in zadania.
- Prefer a clear JOIN over an unnecessary subquery when both work; note SQLite vs Postgres differences if both are in scope.

## Zadania alignment

- One concept per zadanie; clear success criteria. Align with [sql-teaching-progression](.cursor/skills/sql-teaching-progression/SKILL.md) order and framing (zadanie, stopień).
