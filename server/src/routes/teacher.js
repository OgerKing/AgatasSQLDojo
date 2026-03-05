import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

export const teacherRouter = Router();
teacherRouter.use(requireAuth);

/**
 * GET /api/teacher/students – list students linked to this teacher with their progress.
 * Auth: teacher only. Scope: students where teacher_id = req.user.id.
 */
teacherRouter.get("/students", async (req, res) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ error: true, code: "FORBIDDEN", message: "Tylko dla nauczyciela." });
  }
  const r = await db.query(
    `SELECT u.id, u.email,
            p.completed_zadania, p.current_stopien, p.xp, p.streak_days, p.last_activity_date, p.achievements
     FROM users u
     LEFT JOIN progress p ON p.student_id = u.id
     WHERE u.teacher_id = $1 AND u.role = 'student'
     ORDER BY u.email`,
    [req.user.id]
  );
  const students = r.rows.map((row) => ({
    id: row.id,
    email: row.email,
    completed_zadania: row.completed_zadania || [],
    current_stopien: row.current_stopien || "uczen",
    xp: row.xp ?? 0,
    streak: row.streak_days ?? 0,
    last_activity_date: row.last_activity_date,
    achievements: row.achievements || [],
  }));
  res.json(students);
});
