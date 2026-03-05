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

See [.cursor/TECHNICAL_SPEC.md](.cursor/TECHNICAL_SPEC.md) for current or TBD stack and options; keep this skill in sync when stack is decided.

- **Frontend:** SPA (e.g. React+Vite); component-based UI, client-side routing; backend is API-only.
- **Backend:** **Node** (e.g. Express). **Auth:** **email + password**; **JWT** after login. **One teacher, many students** (students have teacher_id).
- **Practice DB:** Server-side only. **SQLite** for sandbox (per zadanie/session); schema and seed loaded on server. **Accounts and progress** in **Postgres** only. **Themes:** Polonia (first), plus **Wizards school** and **Two young boys and their St Bernard** (see TECHNICAL_SPEC §12). **Content theme (Polonia):** events, members, attendance, donations, clubs; tone: belonging and **heroic professional**. See [gamified-training-software](.cursor/skills/gamified-training-software/SKILL.md).
- **Progress across themes:** **XP and level are global.** Experience bar shows **persistent growth across themes**—level 10 in one theme = level 10 in all. Rank labels (e.g. Czeladnik vs Adept) are theme-specific; underlying level is shared.
- **LLM:** OpenAI (or compatible); **SSE** streaming; backend proxy; system prompt on backend.
- **Streak:** "Day" = calendar day in **Eastern (America/New_York)**.
- **Deployment:** **Docker** container; deploy to **AWS EC2 Ubuntu**. Postgres on same host or RDS.
- **i18n:** i18next (react-i18next when using React). Locales: `pl` (default), `en`. See TECHNICAL_SPEC.md §11.

Until then, keep backend/frontend choices consistent with existing code in the repo.

## Structure

- **Product vision:** [.cursor/PRODUCT_VISION.md](.cursor/PRODUCT_VISION.md) – north star for the product; refer when making product or UX decisions.
- **Technical specification:** [.cursor/TECHNICAL_SPEC.md](.cursor/TECHNICAL_SPEC.md) – stack, architecture, data models, APIs; refer when implementing.
- **Build plan:** [.cursor/BUILD_PLAN.md](.cursor/BUILD_PLAN.md) – phased milestones, dependencies, acceptance criteria; refer when planning or implementing features.
- **.cursor/skills/** – Project skills: sql-teaching-progression, llm-tutor-chat, gamification-learning, motivation-psychology, senior-software-architect, expert-sql-engineer, enterprise-technical-pm, gamified-training-software, native-polish-speaker, this file. Do not remove or rename without updating references.
- Prefer a flat or shallow folder structure for app code; group by feature or by layer (e.g. `api/`, `components/`, `zadania/`).

## Naming

- **Routes/URLs:** Lowercase, hyphenated (e.g. `/zadania`, `/stopnie`, `/zadanie/podstawy-select`).
- **IDs:** Prefer kebab-case or snake_case for zadanie/stopień IDs (e.g. `podstawy-select`, `pierwszy-join`). For ranks: `uczen`, `czeladnik`, `mistrz`.
