# Agatas SQL Cech – Build Plan

This plan breaks the [product vision](.cursor/PRODUCT_VISION.md) into shippable phases with dependencies, acceptance criteria, and risks. Follow [TECHNICAL_SPEC.md](.cursor/TECHNICAL_SPEC.md) for stack and architecture.

---

## 1. Overview

### 1.1 Outcome summary

| Phase | Outcome (what the learner can do) |
|-------|-----------------------------------|
| 0 | Backend + Postgres (app DB) and scaffold; stack documented. |
| 1 | See one zadanie, run SQL, see result or error. |
| 2 | Log in as student or teacher. Complete core loop: read zadanie → write SQL → see result → get "Poprawny wynik" or friendly error; pick next zadanie. Progress saved to Postgres (device-independent). |
| 3 | Ask Mistrz for a hint and get a streamed, contextual reply (Polish until Phase 5). |
| 4 | See progress (completed zadań, stopień, XP) from Postgres; progress persists across devices; optional streaks/celebrations. |
| 5 | Polish and scale: onboarding, accessibility, **teacher view** (view student progress), **language switch (EN/PL)**. Deployment. |

---

## 2. Phases

### 2.0 Phase 0: Foundation (stack and scaffold)

**Goal:** Lock stack and create a minimal runnable app with backend and Postgres. No learning features yet.

**Deliverables:**
- [ ] **Stack decided** and documented in TECHNICAL_SPEC.md and agatas-dojo-conventions: **SPA client** (e.g. React+Vite), **Node** backend, **Postgres** (users and progress), **SQLite** sandbox, LLM (SSE), **JWT** + email/password, **Eastern** streak, **one teacher / many students**, **Docker** on **EC2 Ubuntu**.
- [ ] **Backend scaffold:** **Node** (e.g. Express); connects to Postgres; env for DB URL and secrets. App (SPA + API) runnable in **Docker**; target **EC2 Ubuntu** for deployment.
- [ ] **Postgres:** App database with tables for users (students, teachers) and progress (or migrations ready). No progress data until Phase 2/4; auth tables or schema in place.
- [ ] **Frontend scaffold:** Repo runs (e.g. `npm run dev`); folder structure per spec (e.g. `api/`, `components/`, `zadania/` or equivalent).
- [ ] **One static page** that renders a placeholder (e.g. "Cech" title) and navigates to a zadanie route.

**Dependencies:** None.

**Risks:** None critical.

**Acceptance criteria:** App runs locally with backend and Postgres; one route shows placeholder content; stack is documented. Site will run independent of browser localStorage; all results and progress will be saved in Postgres.

### 2.1 Phase 1: Run SQL and see result

**Goal:** Learner can open one zadanie, write SQL, run it against a sandbox, and see the result set or an error.

**Deliverables:**
- [ ] **Content model:** At least one zadanie defined (id, title, goal, schema DDL, seed data, expected result). Stored as static data or JSON. **Theme: Polonia** (Polish community)—schema and seed use domain such as events, members, attendance, donations; tone: belonging and community, and **heroic professional** (learner as incredible technical professional; never patronizing).
- [ ] **Sandbox execution (server-side):** Backend runs learner SQL in a **SQLite** sandbox per zadanie/session. Frontend sends query to API; backend executes and returns result or error. No concatenation of user input; execute learner query as-is in the seed DB. Accounts and progress stay in Postgres only.
- [ ] **Editor UI:** Text area for SQL; "Uruchom" (run) button; result panel (rows/columns or error).
- [ ] **Schema visibility:** Current zadanie’s tables/columns visible beside the editor (from zadanie content).
- [ ] **Error mapping:** At least 2–3 common DB errors mapped to short Polish messages (e.g. "no such column" → "Sprawdź schemat – ta kolumna może mieć inną nazwę.").

**Dependencies:** Phase 0 (stack, scaffold). Content model and execution must be done before full zadanie flow in Phase 2.

**Risks:** Sandbox isolation and resource limits on the server; use one DB/copy per request or session and timeouts.

**Acceptance criteria:** Learner can type a query, click run, and see either the result table or a friendly error message. Schema is visible for the current zadanie.

### 2.2 Phase 2: Auth and core loop (feedback and navigation)

**Goal:** Student and teacher login; full core loop with progress saved to Postgres (device-independent). No Mistrz yet.

**Deliverables:**
- [ ] **Auth (student and teacher):** Login with **email + password**; role = student or teacher. **JWT** after login. Backend validates and stores users in Postgres; passwords hashed (e.g. bcrypt). **One teacher, many students:** students have teacher_id so teacher sees only their students.
- [ ] **Progress in Postgres:** On zadanie completion, call backend to persist progress (completed_zadania, xp, current_stopien, streak, etc.) to Postgres. Progress get/update scoped to authenticated student. No localStorage for progress; site runs independent of device.
- [ ] **Success check:** Compare query result to zadanie’s expected result in a way that maximizes learner engagement (e.g. order-insensitive match per TECHNICAL_SPEC §6). Show "Poprawny wynik" (and optional short explanation) when correct.
- [ ] **Failure feedback:** On wrong result or error, show encouraging message (e.g. "Prawie – sprawdź WHERE.") and allow retry. Use error mapping from Phase 1.
- [ ] **Zadanie list:** List of zadania (at least 3–5 for Uczeń); order by curriculum (sql-teaching-progression). Unlock: next unlocks on previous completion (or linear for MVP).
- [ ] **Navigation:** From zadanie view: "Następne zadanie" / "Wybierz zadanie"; from list: click to open a zadanie. Obvious next step.
- [ ] **Minimal onboarding:** After login, first screen leads to first zadanie; no long signup beyond login.

**Dependencies:** Phase 1 (run SQL, one zadanie, schema, errors). Phase 0 (backend + Postgres).

**Acceptance criteria:** Student and teacher can log in. Learner (student) can complete a zadanie, see "Poprawny wynik," go to the next zadanie, and retry on failure without friction. Progress is saved to Postgres and persists across devices (same student, any browser/device after login).

### 2.3 Phase 3: Mistrz (LLM tutor)

**Goal:** Learner can ask Mistrz for help and receive contextual, streamed hints (no full solution on first ask).

**Deliverables:**
- [ ] **Backend proxy:** Endpoint (e.g. POST /api/mistrz or /api/v1/chat) that accepts message + context (zadanie_id, schema, last_query, db_response, attempt_count); calls LLM; streams response (SSE). API key only on backend.
- [ ] **System prompt:** Socratic tutor, Polish; hints first, full solution only when stuck or "pokaż odpowiedź." See llm-tutor-chat skill.
- [ ] **Chat UI:** "Zapytaj Mistrza" opens chat; user types message; reply streams in. Optional: "Podpowiedź" vs "Pokaż rozwiązanie" buttons that send predefined prompts.
- [ ] **Context wiring:** Frontend sends current zadanie, schema, last query, DB response (error or row count/sample), attempt count with each request. (Locale sent in Phase 5 when language switch is added; until then Mistrz replies in Polish.)

**Dependencies:** Phase 2 (core loop). Backend required for Mistrz (key security). Node API runs in Docker on EC2.

**Risks:** LLM latency or rate limits; mitigate with timeouts, loading state, and optional "try again." Cost; set usage expectations.

**Acceptance criteria:** Learner can ask a question in chat and receive a relevant, streamed reply in Polish. Full solution appears only when requested or after multiple failed attempts (per skill). (After Phase 5, replies follow selected language.)

### 2.4 Phase 4: Progress and gamification

**Goal:** Progress (completed zadań, stopień, XP, optional streaks) is loaded from and saved to Postgres; visible in UI; unlocks and celebrations in place.

**Deliverables:**
- [ ] **Progress store:** Backend (Postgres). Model: completed_zadania (set or table), current_stopien, xp, streak_days, last_activity_date, achievements per student. Idempotent: first completion per zadanie grants XP; repeat does not. All progress persisted in Postgres; no dependency on localStorage or device.
- [ ] **Unlock rule:** Next zadanie unlocks when previous is completed (or by stopień). List shows only unlocked + completed state.
- [ ] **Progress UI:** e.g. "3 z 12 zadań (Uczeń)" or "Czeladnik: 2/5"; progress bar or list. Always show next step. Data loaded from Postgres for authenticated student.
- [ ] **Streak (optional):** **Eastern (America/New_York)** for "day"; update on zadanie completion; show current streak; optional "streak at risk" if no activity today (Eastern).
- [ ] **Celebration:** Short, skippable feedback on zadanie complete or stopień unlock (no long modal every time).
- [ ] **Achievements (optional):** At least 1–2 (e.g. "Pierwszy JOIN," "7-day streak"); store keys in Postgres and show in UI.

**Dependencies:** Phase 2 (core loop with completion, auth, Postgres progress). Mistrz (Phase 3) can be in parallel or after; progress does not depend on Mistrz.

**Risks:** Streak edge cases; "day" is Eastern per TECHNICAL_SPEC; stick to it.

**Acceptance criteria:** Learner sees progress (e.g. "3 z 12 zadań") loaded from Postgres; completing a zadanie updates progress in Postgres and unlocks the next; progress persists after refresh and on any device when the student logs in. Optional: streak and one celebration moment work.

### 2.5 Phase 5: Polish and scale (optional)

**Goal:** Onboarding, accessibility, **teacher view** (view student progress), language switch (EN/PL), and deployment so the app is production-friendly.

**Deliverables:**
- [ ] **Onboarding:** After login, first screen → first zadanie → first completion → "Jesteś Uczeń" (or similar). Obvious next step.
- [ ] **Accessibility:** Progress and rewards readable by screen readers; celebration not only visual; keyboard-friendly where relevant.
- [ ] **Teacher view:** Teacher dashboard or page where the teacher can view their linked student(s) progress: completed zadania, current stopień, XP, streak, achievements. Data read from Postgres via API (auth: teacher; scope: only linked students). See TECHNICAL_SPEC.md APIs: "Teacher: student progress."
- [ ] **Language switch (EN/PL):** Implemented with **i18next** (react-i18next when using React). Small flag control (US flag = English, Polish flag = Polish). Default: entire site renders in Polish. Hitting the US flag switches the **entire site** to English; Polish flag switches back to Polish. One active locale; choice persisted (e.g. i18next persistence or localStorage for locale only). All visible content in translation files. **Mistrz locale:** Frontend sends selected language with each chat request; backend system prompt instructs Mistrz to respond in that language.
- [ ] **Deployment:** **AWS EC2 Ubuntu.** App (SPA + Node API) in **Docker** container; deploy to EC2 Ubuntu server. Postgres on same host or RDS. Env vars documented; logging/errors in place.

**Dependencies:** Phases 1–4.

**Risks:** Scope creep; keep Phase 5 to "polish" and defer extra features to later.

**Acceptance criteria:** New learner can log in and complete first zadanie within a few minutes. Progress and Mistrz work in deployed environment; progress is in Postgres and device-independent. Teacher can log in and view their student(s) progress. Accessibility basics covered. Learner can switch language (US/PL flags); Mistrz replies match the selected language.

---

## 3. Dependency order

```
Phase 0 (Foundation)
    → Phase 1 (Run SQL)
        → Phase 2 (Core loop)
            → Phase 3 (Mistrz)   ← requires backend
            → Phase 4 (Progress)
                → Phase 5 (Polish)
```

Phase 3 and 4 can be parallel after Phase 2 if team capacity allows.

---

## 4. Risks and mitigations

| Risk | Mitigation |
|------|------------|
| LLM latency or downtime | Timeout and loading state; optional "try again"; consider cached hints for common errors later. |
| Practice DB server load | One sandbox per request/session; timeouts; optional rate limits per student. |
| Scope creep | Stick to MVP per phase; defer "nice-to-have" (e.g. daily challenge, many achievements) to post–Phase 5. Multi-theme (Wizards, Urban mom) and shared XP/level are in scope per TECHNICAL_SPEC §12. |
| Progress loss | Progress is in Postgres; device-independent. Back up Postgres; document recovery. |
| EN/PL copy drift | Keep strings for both locales in sync; use native-polish-speaker for Polish quality; add English equivalents for all visible content. |

---

## 5. Next steps

1. **Decide stack** (Phase 0): **SPA client** (e.g. React+Vite), **Node** backend, **Postgres** (users and progress), **SQLite** sandbox, LLM (SSE), **JWT** + email/password, **Eastern** streak, one teacher / many students, **Docker** on **EC2 Ubuntu**. Update TECHNICAL_SPEC.md and conventions.
2. **Create scaffold** (Phase 0): **Node** backend + Postgres (users, progress schema); SPA with one route and placeholder; **Docker** setup for app; target **EC2 Ubuntu**.
3. **Implement Phase 1:** One zadanie (content + schema + seed), **SQLite** sandbox (backend runs SQL), editor, run button, result/error panel, schema display, error mapping.
4. **Then Phase 2:** Auth (email + password, **JWT**; one teacher, many students), success check (engagement-maximizing per spec), progress save to Postgres, zadanie list, navigation.
5. **Phase 5:** Teacher view (view student progress from Postgres), language switch (EN/PL), deployment.
6. **Multi-theme (post–Phase 5 or later phase):** Add **Wizards school** and **Two young boys and their St Bernard** themes per TECHNICAL_SPEC §12. Theme selection per user; **experience bar and level shared across all themes** (level 10 in one theme = level 10 in every theme). Content: theme-specific zadania (schema, seed, copy) and rank labels; one global XP/level.

---

## 6. Expansion: 100 tasks and next-task flow

**Goal:** Scale from 3 to 100 SQL tasks and support a “next task only” flow so learners can continue without scrolling a long list.

### 6.1 Deliverables

| # | Deliverable | Notes |
|---|-------------|--------|
| 1 | **Expand to 100 zadania** | Add 97 tasks to `server/src/zadania/content.js` (or a data module it imports). Follow [sql-teaching-progression](.cursor/skills/sql-teaching-progression/SKILL.md): SELECT → WHERE → ORDER BY → DISTINCT → Aggregates → GROUP BY → HAVING → JOINs → Subqueries → Window functions. One concept per exercise; map ranks (uczeń → czeladnik → mistrz). Reuse shared schemas (e.g. `wydarzenia`, then add tables for JOINs) to avoid duplication. |
| 2 | **Shared schema pattern** | Define base DDL + seed once per “schema key”; each task references a schema and supplies id, title, goal, concept, stopień, expected_result. Keeps content maintainable and file size reasonable. |
| 3 | **GET /api/zadania/next** | New endpoint (optionalAuth): returns the next unlocked, incomplete task for the current student (or first task if not logged in). Response: same shape as GET /api/zadania/:id (no expected_result/seed_sql). 204 when no next (all done). |
| 4 | **“Next task” in UI** | On the Zadania page (or home): show a single “Your next task” card/link that calls `/api/zadania/next` and links to that zadanie. Full list can remain below (or behind “Show all tasks”) so we don’t have to list all 100. |
| 5 | **Optional: hide full list** | Config or UX choice: either “next only” by default with “Show full list” expandable, or keep list but make “Continue → Next task” the primary CTA. |

### 6.2 Task count and progression (100 total)

- **~1–5:** SELECT (all rows, specific columns).
- **~6–20:** WHERE (=, &lt;&gt;, &gt;, &lt;, AND, OR, IN, LIKE, IS NULL).
- **~21–28:** ORDER BY (ASC, DESC, multiple columns).
- **~29–32:** DISTINCT.
- **~33–35:** LIMIT (optional).
- **~36–50:** Aggregates (COUNT, SUM, AVG, MIN, MAX).
- **~51–62:** GROUP BY.
- **~63–68:** HAVING.
- **~69–85:** JOINs (INNER, then LEFT; multiple tables).
- **~86–92:** Subqueries (WHERE, FROM, SELECT).
- **~93–100:** Window functions (OVER, PARTITION BY, ORDER BY in window).

Ranks: early tasks **uczeń**, mid **czeladnik**, advanced **mistrz**. Use 2–3 base table sets (e.g. `wydarzenia`; then `wydarzenia` + `miejsca` or `czlonkowie` + `uczestnictwa`) so JOIN and subquery tasks have minimal schema.

### 6.3 Implementation order

1. **API:** Add `GET /api/zadania/next` in `server/src/routes/zadania.js` (use existing `listZadania(completedIds)` and `getZadanieById`; return first unlocked incomplete, or first task if anonymous).
2. **UI:** Add “Your next task” (fetch `/api/zadania/next`, link to `/zadanie/:id`). Keep or relax full list on Zadania page.
3. **Content:** Introduce shared schemas (e.g. constants or a small `schemas` object) in `server/src/zadania/` and refactor the existing 3 tasks to use them.
4. **Bulk add tasks:** Add tasks in batches by concept (e.g. 1–20 SELECT/WHERE/ORDER BY, then DISTINCT, then aggregates, etc.), each with correct expected_result for the sandbox checker.
5. **Smoke test:** Run through first 5 and a few later ones (e.g. JOIN, subquery) to confirm unlock order and correct/incorrect detection.

### 6.4 References

- [sql-teaching-progression](.cursor/skills/sql-teaching-progression/SKILL.md) – concept order and exercise design.
- [TECHNICAL_SPEC](.cursor/TECHNICAL_SPEC.md) §4 (content), §6 (sandbox).
- Existing: `server/src/zadania/content.js`, `server/src/routes/zadania.js`, `client/src/pages/Zadania.jsx`.

---

## 7. References and conventions

Use Polish terms (cech, zadanie, stopień, Mistrz) consistently in code and UI. Refer to [PRODUCT_VISION.md](.cursor/PRODUCT_VISION.md) and [TECHNICAL_SPEC.md](.cursor/TECHNICAL_SPEC.md) when in doubt.
