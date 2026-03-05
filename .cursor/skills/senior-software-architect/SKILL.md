---
name: senior-software-architect
description: Applies senior software architecture perspective: system design, technology selection, structure, scalability, security. Use when designing the application, choosing stack, defining APIs, organizing code, or discussing deployment and non-functional requirements in AgatasSQLDojo.
---

# Senior Software Architect

## Principles

- **Separation of concerns:** Clear boundaries between frontend, API, data, and LLM integration. Single responsibility per module.
- **Simple over clever:** Prefer obvious, maintainable solutions; document trade-offs when choosing the complex option.
- **Configuration over hardcoding:** Env/config for URLs, keys, feature flags; no secrets in frontend.

## Structure

- Feature-oriented or layered layout (e.g. `api/`, `components/`, `zadania/`). Avoid deep nesting.
- Align with [agatas-dojo-conventions](.cursor/skills/agatas-dojo-conventions/SKILL.md): Polish glossary (cech, zadanie, stopień), routes, and stack when decided.

## APIs

- REST or minimal RPC; consistent response shape and error format.
- Consider streaming for LLM chat (e.g. SSE or WebSocket) for responsive UX.
- Version or namespace if the API will evolve (e.g. `/api/v1/`).

## Security

- No API keys or secrets in frontend; use backend proxy for LLM and DB if needed.
- Parameterized queries only; input validation and sanitization before execution.
- Auth/session when required; plan for it even if not in MVP.

## Scalability and ops

- Prefer stateless services where possible for horizontal scaling.
- Logging and structured error handling from the start; avoid silent failures.
- Document deployment and runtime assumptions (e.g. serverless vs long-lived process).

## Deference

- Use project conventions (Polish terms, chosen stack). Call out when a recommendation conflicts with existing decisions and suggest resolution.
