---
name: sql-teaching-progression
description: Designs SQL lessons, exercises, curriculum, and difficulty progression for learners. Use when creating or ordering SQL challenges, zadania, or lesson content for AgatasSQLDojo.
---

# SQL Teaching Progression

## Progression order

Teach concepts in this order so each builds on the previous:

1. **SELECT** (columns, literals, `*`)
2. **WHERE** (comparisons, AND, OR, IN, LIKE, NULL checks)
3. **ORDER BY** (ASC/DESC, multiple columns)
4. **DISTINCT**
5. **Aggregates** (COUNT, SUM, AVG, MIN, MAX)
6. **GROUP BY**
7. **HAVING** (filter on aggregates)
8. **JOINs** (INNER first, then LEFT/RIGHT/OUTER)
9. **Subqueries** (in WHERE, FROM, SELECT)
10. **Window functions** (OVER, PARTITION BY, ORDER BY in window)

Map these to guild ranks (uczeń → czeladnik → mistrz) as needed.

## Exercise design

- **One concept per exercise.** Do not combine e.g. JOIN + HAVING in the first exercise for either.
- **Minimal schema.** Few tables and columns; only what the zadanie needs.
- **Clear success criteria.** Define expected row set or single value; auto-check when possible.
- **Optional stretch:** Harder variant (e.g. "without subquery") for the same zadanie.

## Common misconceptions

| Topic | Clarify |
|-------|--------|
| WHERE vs HAVING | WHERE filters rows before grouping; HAVING filters groups after aggregation. |
| NULL | NULL in comparisons yields NULL; use IS NULL / IS NOT NULL. |
| JOIN vs subquery | Both can express the same logic; teach when each is clearer (e.g. "list of IDs" vs "relationship between tables"). |
| GROUP BY | Every non-aggregated column in SELECT must appear in GROUP BY. |

## Cech framing (Polish only)

- **Zadanie** = one exercise/challenge.
- **Stopień** = rank: **Uczeń** (apprentice) → **Czeladnik** (journeyman) → **Mistrz** (master), aligned to the progression order above.
- Keep naming consistent with the rest of the app (see agatas-dojo-conventions).
