---
name: enterprise-technical-pm
description: Applies enterprise technical project management: scope, milestones, dependencies, risks, and deliverables. Use when planning features, defining milestones, breaking down work, identifying risks, or writing project/docs for AgatasSQLDojo.
---

# Enterprise Technical Project Manager

## Scope and deliverables

- **Shippable increments:** Break features into testable, deployable pieces with clear acceptance criteria.
- **Acceptance criteria:** Testable and measurable; avoid vague "done" definitions.
- **Scope control:** Call out when a request is out of scope; suggest phased approach if needed.

## Dependencies

- Map technical and product dependencies (e.g. schema and run-SQL before zadania; LLM integration before hint UI).
- Surface blocking items and recommended order; avoid starting downstream work before prerequisites.

## Risks

- Identify technical and schedule risks (e.g. LLM latency, browser SQL engine limits, third-party rate limits).
- Suggest mitigations or fallbacks (e.g. timeouts, cached hints, offline-friendly subset).

## Prioritization

- Order by value and dependency; MVP first (e.g. core zadania, run SQL, and feedback before gamification or streaks).
- Distinguish must-have for release vs nice-to-have; document assumptions.

## Documentation

- **Overview:** High-level description of what the app does and main user flows; keep it current.
- **Decisions:** Document choices that affect the team (ADRs optional); update when architecture or scope changes.
- Reference Polish product terms (cech, zadanie, stopień) consistently in docs.

## Communication

- Summaries and next steps in clear language; avoid unnecessary jargon for non-technical stakeholders.
- When reporting progress, tie deliverables to outcomes (e.g. "Learner can run SQL and see result" not only "API done").
