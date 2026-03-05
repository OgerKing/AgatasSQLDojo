import { Router } from "express";
import { getZadanieById } from "../zadania/content.js";
import { runInSandbox } from "../sandbox.js";
import { rowsMatchExpected } from "../progress.js";

export const runSqlRouter = Router();

runSqlRouter.post("/", (req, res) => {
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

  res.json({ columns: result.columns, rows: result.rows, correct: correct ?? undefined });
});
