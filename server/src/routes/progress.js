import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { updateStreak, isStreakAtRisk } from "../streak.js";
import { getHighestStopien, getZadanieById } from "../zadania/content.js";
import { verifyCompletionToken } from "../middleware/auth.js";

export const progressRouter = Router();
progressRouter.use(requireAuth);

const XP_PER_ZADANIE = 10;

progressRouter.get("/", async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ error: true, code: "FORBIDDEN", message: "Tylko dla ucznia." });
  }
  const r = await db.query(
    "SELECT completed_zadania, current_stopien, xp, streak_days, last_activity_date, achievements, preferred_theme FROM progress WHERE student_id = $1",
    [req.user.id]
  );
  const row = r.rows[0];
  if (!row) {
    return res.json({
      completed_zadania: [],
      current_stopien: "uczen",
      xp: 0,
      streak: 0,
      last_activity_date: null,
      achievements: [],
      preferred_theme: "polonia",
      streak_at_risk: true,
    });
  }
  res.json({
    completed_zadania: row.completed_zadania || [],
    current_stopien: row.current_stopien,
    xp: row.xp,
    streak: row.streak_days,
    last_activity_date: row.last_activity_date,
    achievements: row.achievements || [],
    preferred_theme: row.preferred_theme || "polonia",
    streak_at_risk: isStreakAtRisk(row.last_activity_date),
  });
});

progressRouter.post("/", async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ error: true, code: "FORBIDDEN", message: "Tylko dla ucznia." });
  }
  const { zadanie_id: zadanieId } = req.body || {};
  const { completion_token: completionToken } = req.body || {};
  if (!zadanieId || !completionToken) {
    return res.status(400).json({
      error: true,
      code: "BAD_REQUEST",
      message: "Potrzebne: zadanie_id oraz completion_token.",
    });
  }
  const zadanie = getZadanieById(zadanieId);
  if (!zadanie) {
    return res.status(404).json({ error: true, code: "NOT_FOUND", message: "Nie znaleziono zadania." });
  }
  const completionPayload = verifyCompletionToken(completionToken);
  if (
    !completionPayload ||
    completionPayload.user_id !== req.user.id ||
    completionPayload.zadanie_id !== zadanieId
  ) {
    return res.status(403).json({
      error: true,
      code: "INVALID_COMPLETION_TOKEN",
      message: "Nieprawidłowe potwierdzenie ukończenia zadania.",
    });
  }

  const cur = await db.query(
    "SELECT completed_zadania, current_stopien, xp, streak_days, last_activity_date, achievements FROM progress WHERE student_id = $1",
    [req.user.id]
  );
  const curRow = cur.rows[0];
  const completed = (curRow?.completed_zadania || []).slice();
  const already = completed.includes(zadanieId);

  let newXp = curRow?.xp || 0;
  let newStreak = curRow?.streak_days || 0;
  let newLastDate = curRow?.last_activity_date;
  let newAchievements = (curRow?.achievements || []).slice();

  let newCurrentStopien = curRow?.current_stopien || "uczen";
  if (!already) {
    completed.push(zadanieId);
    newXp += XP_PER_ZADANIE;
    newCurrentStopien = getHighestStopien(completed);
    const streakUpdate = updateStreak(curRow?.last_activity_date, curRow?.streak_days || 0);
    newStreak = streakUpdate.streak_days;
    newLastDate = streakUpdate.last_activity_date;
    if (completed.length === 1 && !newAchievements.includes("pierwsze-zadanie")) {
      newAchievements.push("pierwsze-zadanie");
    }
    if (newStreak >= 3 && !newAchievements.includes("seria-3")) {
      newAchievements.push("seria-3");
    }
    await db.query(
      `INSERT INTO progress (student_id, completed_zadania, current_stopien, xp, streak_days, last_activity_date, achievements, updated_at)
       VALUES ($1, $2::jsonb, $3, $4, $5, $6::date, $7::jsonb, now())
       ON CONFLICT (student_id) DO UPDATE SET
         completed_zadania = $2::jsonb,
         current_stopien = $3,
         xp = $4,
         streak_days = $5,
         last_activity_date = $6::date,
         achievements = $7::jsonb,
         updated_at = now()`,
      [req.user.id, JSON.stringify(completed), newCurrentStopien, newXp, newStreak, newLastDate, JSON.stringify(newAchievements)]
    );
  }

  const updated = await db.query(
    "SELECT completed_zadania, current_stopien, xp, streak_days, last_activity_date, achievements FROM progress WHERE student_id = $1",
    [req.user.id]
  );
  const row = updated.rows[0];
  res.json({
    completed_zadania: row?.completed_zadania || [],
    current_stopien: row?.current_stopien || "uczen",
    xp: row?.xp ?? 0,
    streak: row?.streak_days ?? 0,
    last_activity_date: row?.last_activity_date,
    achievements: row?.achievements || [],
  });
});

/** PATCH / – update preferred_theme (persist theme choice). @see TECHNICAL_SPEC §12 */
const VALID_THEMES = ["polonia", "wizards", "urban_mom"];
progressRouter.patch("/", async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ error: true, code: "FORBIDDEN", message: "Tylko dla ucznia." });
  }
  const { preferred_theme: preferredTheme } = req.body || {};
  if (!preferredTheme || !VALID_THEMES.includes(preferredTheme)) {
    return res.status(400).json({
      error: true,
      code: "BAD_REQUEST",
      message: "Potrzebne: preferred_theme (polonia | wizards | urban_mom).",
    });
  }
  await db.query(
    `INSERT INTO progress (student_id, preferred_theme, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (student_id) DO UPDATE SET preferred_theme = $2, updated_at = now()`,
    [req.user.id, preferredTheme]
  );
  const r = await db.query(
    "SELECT completed_zadania, current_stopien, xp, streak_days, last_activity_date, achievements, preferred_theme FROM progress WHERE student_id = $1",
    [req.user.id]
  );
  const row = r.rows[0];
  res.json({
    completed_zadania: row?.completed_zadania || [],
    current_stopien: row?.current_stopien || "uczen",
    xp: row?.xp ?? 0,
    streak: row?.streak_days ?? 0,
    last_activity_date: row?.last_activity_date,
    achievements: row?.achievements || [],
    preferred_theme: row?.preferred_theme || "polonia",
  });
});
