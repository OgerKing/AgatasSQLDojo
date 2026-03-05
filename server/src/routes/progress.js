import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

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
  });
});

progressRouter.post("/", async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ error: true, code: "FORBIDDEN", message: "Tylko dla ucznia." });
  }
  const { zadanie_id: zadanieId } = req.body || {};
  if (!zadanieId) {
    return res.status(400).json({ error: true, code: "BAD_REQUEST", message: "Potrzebne: zadanie_id." });
  }

  const cur = await db.query(
    "SELECT completed_zadania, xp FROM progress WHERE student_id = $1",
    [req.user.id]
  );
  const completed = (cur.rows[0]?.completed_zadania || []).slice();
  const already = completed.includes(zadanieId);
  if (!already) {
    completed.push(zadanieId);
    const newXp = (cur.rows[0]?.xp || 0) + XP_PER_ZADANIE;
    await db.query(
      `INSERT INTO progress (student_id, completed_zadania, xp, updated_at)
       VALUES ($1, $2::jsonb, $3, now())
       ON CONFLICT (student_id) DO UPDATE SET
         completed_zadania = $2::jsonb,
         xp = $3,
         updated_at = now()`,
      [req.user.id, JSON.stringify(completed), newXp]
    );
  }

  const updated = await db.query(
    "SELECT completed_zadania, current_stopien, xp, streak_days FROM progress WHERE student_id = $1",
    [req.user.id]
  );
  const row = updated.rows[0];
  res.json({
    completed_zadania: row?.completed_zadania || [],
    current_stopien: row?.current_stopien || "uczen",
    xp: row?.xp ?? 0,
    streak: row?.streak_days ?? 0,
  });
});
