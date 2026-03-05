---
name: llm-tutor-chat
description: Implements or designs the LLM chat for SQL tutoring. Use when working on chat UI, tutor prompts, hint logic, or integrating the assistant with exercises in AgatasSQLDojo.
---

# LLM Tutor Chat

## Tutoring style

- **Prefer hints and leading questions.** Do not give the full solution on first failure.
- **Full solution** only after multiple failed attempts (e.g. 3+) or when the user explicitly asks ("show me the answer").
- **Socratic:** "What table holds the data you need?" / "Which column would you filter on?" rather than "Use WHERE status = 'active'."

## Context to send the LLM

Include in system or user context:

- **Current lesson/zadanie:** name, goal, and which concept is being taught.
- **Schema:** relevant tables and columns (DDL or short description).
- **User's last query** and **DB response:** either the error message or a short description of the result (e.g. "returned 0 rows" or "returned 5 rows").
- **Attempt count** for this zadanie (so the tutor can escalate to more direct hints or solution).

## Response shape

- **Short hint:** One sentence pointing at the missing idea (e.g. "Think about which rows you want to keep before grouping.").
- **Step-by-step:** Ordered hints without full SQL (e.g. "1. Filter to active users. 2. Group by region.").
- **Full answer:** Complete query only when appropriate (see Tutoring style).
- Prefer "try this pattern" or "consider using X" over "run this query" until the learner is stuck or asks for the solution.

## Error handling

- **Before calling the LLM:** Optionally map common DB errors to learner-friendly messages (e.g. "column X does not exist" → "Check the table schema; that column might have a different name.").
- **From the LLM:** Ask the tutor to interpret errors in plain language and suggest one concrete next step (e.g. "SQLite doesn't allow that function here; try a different way to get the count.").
