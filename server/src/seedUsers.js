import bcrypt from "bcrypt";
import { db } from "./db.js";

const DEFAULT_PASSWORD = "cech";

export async function seedUsersIfEmpty() {
  const r = await db.query("SELECT COUNT(*)::int AS n FROM users");
  if (r.rows[0].n > 0) return;

  const hash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
  await db.query(
    `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, 'teacher') RETURNING id`,
    ["teacher@cech.local", hash]
  );
  const teacher = (await db.query("SELECT id FROM users WHERE role = 'teacher' LIMIT 1")).rows[0];
  await db.query(
    `INSERT INTO users (email, password_hash, role, teacher_id) VALUES ($1, $2, 'student', $3)`,
    ["student@cech.local", hash, teacher.id]
  );
  console.log("Seed users created: teacher@cech.local, student@cech.local (password: cech)");
}
