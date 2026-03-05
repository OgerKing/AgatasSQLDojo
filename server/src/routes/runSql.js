import { Router } from "express";
import { getZadanieById } from "../zadania/content.js";
import { runInSandbox } from "../sandbox.js";
import { rowsMatchExpected } from "../progress.js";
import { requireAuth, signCompletionToken } from "../middleware/auth.js";
import { rateLimit } from "../middleware/rateLimit.js";

export const runSqlRouter = Router();
runSqlRouter.use(requireAuth);
runSqlRouter.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    keyFn: (req) => `run-sql:${req.user?.id ?? req.ip}`,
  })
);

function assertStudent(req, res) {
  if (req.user.role !== "student") {
    res.status(403).json({ error: true, code: "FORBIDDEN", message: "Tylko dla ucznia." });
    return false;
  }
  return true;
}

runSqlRouter.post("/", (req, res) => {
  if (!assertStudent(req, res)) return;
  const { zadanie_id: zadanieId, query, locale } = req.body || {};
  if (!zadanieId || typeof query !== "string") {
    return res.status(400).json({
      error: true,
      code: "NEED_ZADANIE_AND_QUERY",
      message: "Potrzebne: zadanie_id i query.",
    });
  }

  const zadanie = getZadanieById(zadanieId);
  if (!zadanie) {
    return res.status(404).json({
      error: true,
      code: "NOT_FOUND",
      message: "Nie znaleziono zadania.",
    });
  }

  const result = runInSandbox(zadanie, query, { locale });
  if (result.error) {
    return res.json({ error: result.error });
  }

  const correct = zadanie.expected_result
    ? rowsMatchExpected(result.rows, zadanie.expected_result)
    : null;

  const completionToken =
    correct === true
      ? signCompletionToken({
          type: "zadanie_completion",
          user_id: req.user.id,
          zadanie_id: zadanieId,
        })
      : undefined;

  res.json({
    columns: result.columns,
    rows: result.rows,
    correct: correct ?? undefined,
    completion_token: completionToken,
  });
});
