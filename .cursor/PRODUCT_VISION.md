# Agatas SQL Cech – Product Vision

Teach an apprentice SQL through a Polish cech–themed, gamified web app with an LLM tutor (Mistrz) that keeps learning first and motivation high.

---

## Core loop

The main cycle is **read zadanie → write SQL → see result → get feedback** (then a light reward). Everything else supports this. The learner should feel “I understood and solved it” before “I earned points.”

- One concept per **zadanie**, in a fixed order (SELECT → WHERE → … → window functions), mapped to **Uczeń → Czeladnik → Mistrz**.
- Minimal schema per zadanie; clear success criteria; auto-check (expected vs actual result).
- Show “Poprawny wynik” (and optional short explanation) before or alongside XP so the win is comprehension, not the number.

---

## Onboarding

- **Minimal signup:** Optional name; start in one click.
- **First session:** One short zadanie, run query, see result, see “Dobrze!” and first completion/XP. Optional: “Jesteś Uczeń.”
- **Obvious next step:** “Następne zadanie” or “Wybierz kolejne z Uczeń” so the learner always knows what to do.

---

## Editor and execution

- **Live schema:** Tables and columns for the current zadanie visible beside the editor (only what this zadanie needs). No guessing names.
- **Run:** Execute against a sandbox DB; show result set or error.
- **Errors:** Map common DB errors to short, friendly messages before calling Mistrz. Mistrz interprets harder errors and suggests one concrete next step.

---

## Mistrz (LLM tutor)

- **Context to LLM:** Current zadanie (goal, concept), schema, user’s last query, DB response (error or row count/sample), attempt count.
- **Behaviour:** Hints and leading questions first (“Jaką tabelę potrzebujesz?”). Escalate to step-by-step hints, then full solution only when stuck or when the learner asks (“pokaż odpowiedź”).
- **UI:** Chat always available (“Zapytaj Mistrza”); streamed replies; optional “Podpowiedź” vs “Pokaż rozwiązanie.”

---

## Progress and gamification

- **Persist:** Completed zadania, current stopień, XP, streak, achievements. Progress survives content updates (e.g. version zadania; no double-counting XP on repeat).
- **Unlock by learning:** Next zadanie unlocks by completing the previous (or by stopień). No arbitrary gates.
- **Progress visible:** e.g. “3 z 12 zadań (Uczeń)”, “Czeladnik: 2/5”. Next step always clear.
- **Streaks:** Timezone-aware “days in a row”; optional “streak at risk” nudge.
- **Celebration:** Short, skippable moment on zadanie complete or stopień unlock; no long modals every time.
- **Retry:** One-click “Spróbuj again” / “Następne zadanie”; no cooldowns or punishment.

---

## Motivation and tone

- **Growth mindset:** “Łapiesz JOINy”, “Jeszcze jedna próba.”, “Prawie – sprawdź WHERE.”
- **Autonomy:** Choose next zadanie among unlocked ones when possible.
- **Avoid:** “Nie jesteś gotowa”, “Znowu źle”, big difficulty spikes, or making failure feel heavy.

---

## Technical principles

- **Separation:** Content (zadania: title, goal, schema DDL, seed data, expected result) versioned; progress (completions, XP, stopień, streak, achievements) stored per learner in Postgres. Students and teachers log in; progress is independent of browser and device.
- **Execution:** Sandbox only; parameterized execution; never concatenate user input into SQL.
- **Accessibility:** Progress and rewards accessible (e.g. screen-reader friendly).

---

## What makes it ultimate

- **Learning first:** Clear curriculum, one concept per zadanie, clear success criteria, feedback before points.
- **Socratic tutor:** Mistrz with full context; hints first, solution last.
- **Motivation without distraction:** Progress visible, small wins, light streaks and badges.
- **Solid implementation:** Persisted progress, idempotent updates, learning-first UX, no grinding, no surprise resets.
- **Coherent theme:** Polish cech (zadanie, stopień, Mistrz) and consistent naming everywhere.
- **Polonia (practice data):** The tables and examples learners query use a Polish-community-in-America setting—events, members, attendance, clubs, festivals—so the data feels familiar and motivating (e.g. for a Polish mother in the US). Tone: belonging, "our community"; and **heroic professional**—the learner is an incredible technical professional. Never patronizing; the app reflects mastery and craft (cech = guild of professionals).
- **Multi-theme (future):** Three themes: **Polonia**, **Wizards school** (spells, orders of magical skill), **Two young boys and their St Bernard**. User can choose theme; **experience bar and level are shared across themes**—if you are level 10 in one theme, you are level 10 in all. Persistent growth everywhere.
