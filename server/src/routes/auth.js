import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../db.js";
import { signToken, requireAuth } from "../middleware/auth.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { email, password, role } = req.body || {};
  if (!email || !password || !role) {
    return res.status(400).json({
      error: true,
      code: "BAD_REQUEST",
      message: "Potrzebne: email, password, role (student lub teacher).",
    });
  }
  if (!["student", "teacher"].includes(role)) {
    return res.status(400).json({
      error: true,
      code: "BAD_REQUEST",
      message: "Role musi być student lub teacher.",
    });
  }

  const r = await db.query(
    "SELECT id, email, password_hash, role, teacher_id FROM users WHERE email = $1 AND role = $2",
    [email.trim().toLowerCase(), role]
  );
  const user = r.rows[0];
  if (!user) {
    return res.status(401).json({
      error: true,
      code: "UNAUTHORIZED",
      message: "Nieprawidłowy email lub hasło.",
    });
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({
      error: true,
      code: "UNAUTHORIZED",
      message: "Nieprawidłowy email lub hasło.",
    });
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
    teacher_id: user.teacher_id ?? undefined,
  });

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      teacher_id: user.teacher_id ?? null,
    },
  });
});

authRouter.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});
