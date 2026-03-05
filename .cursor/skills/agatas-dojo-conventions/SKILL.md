---
name: agatas-dojo-conventions
description: Applies project conventions for stack, naming, and structure in AgatasSQLDojo. Use when choosing technologies, naming entities, or organizing files and features.
---

# Agatas SQL Cech – Conventions

## Glossary (Polish only)

Theme is the Polish craft guild (cech). Use these terms consistently in UI copy, variable/route names, and docs.

- **Cech** – The guild; the app or learning environment. (Alternative: **Warsztat** = workshop.)
- **Zadanie** – A single SQL exercise/challenge (task). Prefer "zadanie" over "exercise" in user-facing copy and code.
- **Stopień** – Rank in the guild. Three ranks: **Uczeń** (apprentice) → **Czeladnik** (journeyman) → **Mistrz** (master). Map SQL progression (SELECT → … → window functions) to these.
- **Mistrz** – The LLM tutor; the "master" who teaches (e.g. "Zapytaj Mistrza" / "Ask the Mistrz"). Also the highest learner rank.

Use Polish terms only; no dojo/kata/belt/sensei in the product.

## Stack (to be decided)

Define and document in this skill when chosen:

- **Frontend:** e.g. React, Next.js, or vanilla; include state and routing preferences.
- **Practice DB:** e.g. SQLite in-browser (sql.js) or Postgres; how schema and seed data are loaded.
- **LLM:** Provider and pattern (e.g. OpenAI API, streaming, system prompt location).

Until then, keep backend/frontend choices consistent with existing code in the repo.

## Structure

- **.cursor/skills/** – Project skills: sql-teaching-progression, llm-tutor-chat, gamification-learning, motivation-psychology, senior-software-architect, expert-sql-engineer, enterprise-technical-pm, this file. Do not remove or rename without updating references.
- Prefer a flat or shallow folder structure for app code; group by feature or by layer (e.g. `api/`, `components/`, `zadania/`).

## Naming

- **Routes/URLs:** Lowercase, hyphenated (e.g. `/zadania`, `/stopnie`, `/zadanie/podstawy-select`).
- **IDs:** Prefer kebab-case or snake_case for zadanie/stopień IDs (e.g. `podstawy-select`, `pierwszy-join`). For ranks: `uczen`, `czeladnik`, `mistrz`.
