import { Router } from "express";
import { db } from "../db.js";
import { optionalAuth } from "../middleware/auth.js";
import { listZadania, getZadanieById } from "../zadania/content.js";

export const zadaniaRouter = Router();

zadaniaRouter.get("/", optionalAuth, async (req, res) => {
  let completedIds = [];
  if (req.user?.role === "student") {
    const r = await db.query("SELECT completed_zadania FROM progress WHERE student_id = $1", [req.user.id]);
    completedIds = r.rows[0]?.completed_zadania || [];
  }
  res.json(listZadania(completedIds));
});

zadaniaRouter.get("/:id", (req, res) => {
  const zadanie = getZadanieById(req.params.id);
  if (!zadanie) {
    return res.status(404).json({
      error: true,
      code: "NOT_FOUND",
      message: "Nie znaleziono zadania.",
    });
  }
  // Don't send expected_result or seed_sql to client (would give away answer)
  const { expected_result, seed_sql, ...rest } = zadanie;
  res.json(rest);
});
