---
name: website-tester
description: Tests websites via interactive browser (Playwright MCP) or E2E tests. Use when testing the app in the browser, checking flows, regression, smoke tests, or when the user asks to test the website.
---

# Website Tester

## Purpose

Verify that the website works: critical user flows, key pages load, forms submit, and no obvious breakage. Use this skill when testing the app in a browser, running smoke/regression checks, or validating after changes.

## When to use

- User asks to "test the website", "check if the app works", or "run smoke tests"
- After UI or API changes that might affect the front end
- Before release or when validating a feature end-to-end
- When debugging "it doesn’t work in the browser" reports

---

## Option A: Interactive testing (Playwright MCP)

If the **Playwright MCP** server is enabled, use it to drive a real browser.

1. **Ensure dev server is running** (e.g. `npm run dev` or `npm run dev:client` + `npm run dev:server`). Note the app URL (e.g. `http://localhost:5173`).
2. **Navigate**: Use the MCP tool to open the app URL (e.g. `browser_navigate` or equivalent).
3. **Snapshot**: Take an accessibility snapshot of the page to see structure and elements.
4. **Exercise flows**: Use MCP tools to click, fill forms, and navigate (e.g. login, start a lesson, run SQL).
5. **Verify**: Check that key elements appear, messages are correct, and no error states block the flow.
6. **Report**: Summarize what was tested and any failures or issues found.

**Adding Playwright MCP (optional):** In Cursor → Settings → Tools & MCP → Add MCP Server, add a stdio server with command `npx` and args `-y @playwright/mcp@latest`. Then the agent can use browser tools for interactive testing.

---

## Option B: Without browser MCP

If no browser MCP is available:

1. **Manual test checklist** – Produce a short checklist (URLs + steps + expected outcome) for the user to run in their browser.
2. **E2E tests** – If the project has Playwright or Cypress, run the E2E suite (e.g. `npm run test:e2e`) and report results. If not, suggest adding an E2E framework and outline a minimal smoke test.
3. **Fetch-based smoke check** – For simple "does it respond?" checks, use `mcp_web_fetch` on the app root or key API URLs. This does not run JavaScript or exercise UI.

---

## What to test (checklist)

- [ ] App root loads (no 5xx, blank page, or console crash).
- [ ] Critical path: e.g. open lesson → see schema/task → run SQL → see result/feedback.
- [ ] Auth (if applicable): login/logout or session behavior.
- [ ] No persistent console errors or failed network requests on the happy path.
- [ ] Key links/navigation work (e.g. curriculum, progress, settings).

Adapt the list to the project (e.g. AgatasSQLDojo: lesson list, single zadanie, Run SQL, Mistrz chat).

---

## Reporting

- **Pass**: What was tested and that it passed (e.g. "Loaded app, opened lesson X, ran solution, got success.").
- **Fail**: What was tried, what happened (error message, screenshot/snapshot if available), and suggested fix or next step.
