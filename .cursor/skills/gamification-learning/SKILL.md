---
name: gamification-learning
description: Designs or implements gamification for the SQL cech: points, stopnie, badges, streaks, challenges. Use when adding or changing progression, achievements, or zadania/stopnie in AgatasSQLDojo.
---

# Gamification for Learning

## Cech metaphor (Polish only)

- **Cech** = the app or learning environment (the guild). **Warsztat** = workshop, alternative.
- **Zadanie** = a single exercise/challenge.
- **Stopień** = rank: **Uczeń** (apprentice) → **Czeladnik** (journeyman) → **Mistrz** (master); align with SQL concept progression.
- **Mistrz** = the LLM tutor; use in UI (e.g. "Zapytaj Mistrza o podpowiedź").

Use these terms consistently across the codebase and UI.

## Core mechanics

- **XP per completed zadanie:** Grant a base amount; optional bonus for first try or stretch goal.
- **Stopnie (ranks):** Unlock by XP threshold or by completing a set of zadania (e.g. "complete all SELECT zadania for Czeladnik").
- **Streaks:** e.g. days in a row with at least one zadanie completed; show current streak and optional longest.
- **Achievements/badges:** Specific milestones (e.g. "Pierwszy JOIN," "7-day streak," "All Uczeń zadania") with optional icons or titles.

## Challenge design

- **Difficulty tiers:** Tag zadania by difficulty (e.g. 1–3 stars) and optionally gate by stopień.
- **Optional limits:** Time limit or attempt limit per zadanie only if it supports learning (e.g. "challenge mode"); avoid making failure punitive.
- **Daily challenge:** Optional single "featured" zadanie per day for variety and habit.

## Anti-patterns

- Do not make points or rank the primary goal; emphasize "complete the zadanie" and "understand the concept."
- Avoid mechanics that encourage guessing or copying answers (e.g. heavy points for speed without understanding).
- Keep the game layer light so it supports motivation without overshadowing learning.
