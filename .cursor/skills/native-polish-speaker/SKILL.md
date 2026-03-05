---
name: native-polish-speaker
description: Writes natural, idiomatic Polish for UI copy, hints, feedback, and learner-facing text. Use when writing or reviewing Polish strings, Mistrz replies, button labels, error messages, or any user-facing text in AgatasSQLDojo.
---

# Native Polish Speaker

Produce Polish that sounds natural to a native speaker, not translated word-for-word from English. Align with [agatas-dojo-conventions](.cursor/skills/agatas-dojo-conventions/SKILL.md) glossary and [motivation-psychology](.cursor/skills/motivation-psychology/SKILL.md) tone.

## Register and address

- **Learner:** Use **ty** (informal "you") and feminine or masculine forms as appropriate for the apprentice (e.g. "Udało Ci się" / "Jesteś Uczeń" vs "Jesteś Uczniem" if male). Default to forms that fit the context if gender is unknown.
- **Tone:** Friendly and encouraging; not corporate or stiff. Short sentences; avoid long, formal clauses.

## Natural phrasing

- **Prefer natural collocations:** e.g. "Udało się!" (It worked!), "Daj z siebie wszystko" (Give it your best), "Łapiesz to" (You're getting it). Avoid literal calques from English ("To jest poprawne" is fine; "To jest prawidłowy wynik" can sound stiff; "Poprawny wynik" or "Dobrze, wynik się zgadza" sound natural).
- **Verbs and aspect:** Use appropriate aspect (perfective/imperfective) and tense. e.g. "Sprawdź WHERE" (one-time check), "Sprawdzaj kolejne zadania" (repeated action). Imperative for instructions: "Uruchom zapytanie," "Wybierz następne zadanie."
- **Numbers and progress:** "3 z 12 zadań," "2 z 5 ukończonych" (not "3 z 12 zadań ukończone" in isolation). "Dzień 7 z rzędu" for streaks.

## Glossary in Polish

Use project terms consistently in Polish: **cech**, **zadanie** (zadania), **stopień** (stopnie), **Uczeń / Czeladnik / Mistrz**, **Mistrz** (tutor). No dojo/kata/belt/sensei. For SQL concepts in hints, mix Polish explanation with English keywords when standard (e.g. "Użyj WHERE, żeby zostawić tylko te wiersze" – Use WHERE to keep only those rows).

## Examples (natural vs avoid)

| Context | Prefer | Avoid |
|--------|--------|--------|
| Success | "Dobrze! Zgadza się." / "Udało się!" | "Twój wynik jest poprawny." (stiff) |
| Retry | "Spróbuj jeszcze raz." / "Jeszcze jedna próba." | "Proszę spróbować ponownie." (formal) |
| Hint | "Pomyśl, które wiersze chcesz zostawić przed GROUP BY." | "Należy rozważyć filtrowanie wierszy przed grupowaniem." (translated) |
| Button | "Uruchom" / "Następne zadanie" / "Zapytaj Mistrza" | "Wykonaj zapytanie" (ok but "Uruchom" more natural for Run) |
| Error | "Zapytanie zwróciło 0 wierszy – zawęź filtr." | "Brak wyników. Zmodyfikuj kryteria." (stiff) |

## Grammar and spelling

- **Case:** Nouns and pronouns in correct case (nominative, accusative, instrumental, etc.). e.g. "Zapytaj Mistrza" (acc.), "Jesteś Uczniem" (instr. for male) / "Jesteś Uczeń" (if treating as title).
- **Gender agreement:** Adjectives and past verbs agree with subject. e.g. "Ukończyłaś zadanie" (f.) / "Ukończyłeś zadanie" (m.).
- **Spelling:** ą, ę, ó, ś, ź, ć, ń, ł; no ASCII substitutes in user-facing text.

## Mistrz and hints

When generating Mistrz (LLM) replies or hint text: use the same register (ty, friendly), natural Polish sentences, and project terms. Explain SQL steps in Polish with English keywords where standard ("Dodaj warunek WHERE", "Pogrupuj po kolumnie X"). Keep hints short; avoid long paragraphs.
