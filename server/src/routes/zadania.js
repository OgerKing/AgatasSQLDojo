import { Router } from "express";
import { db } from "../db.js";
import { optionalAuth } from "../middleware/auth.js";
import { listZadania, getZadanieById, THEMES } from "../zadania/content.js";

export const zadaniaRouter = Router();

zadaniaRouter.get("/", optionalAuth, async (req, res) => {
  let completedIds = [];
  let preferredTheme = "polonia";
  if (req.user?.role === "student") {
    const r = await db.query(
      "SELECT completed_zadania, preferred_theme FROM progress WHERE student_id = $1",
      [req.user.id]
    );
    const row = r.rows[0];
    completedIds = row?.completed_zadania || [];
    preferredTheme = row?.preferred_theme || "polonia";
  }
  const themeParam = req.query.theme;
  const theme =
    themeParam && THEMES.includes(themeParam) ? themeParam : preferredTheme;
  res.json(listZadania(completedIds, theme));
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
  // Don't send expected_result, seed_sql, or solution_sql to client (would give away answer)
  const { expected_result, seed_sql, solution_sql, ...rest } = zadanie;
  res.json(rest);
});
