-- Agatas SQL Cech – App database (users and progress)
-- Run once to create tables. No progress data until Phase 2/4.

-- Users: students and teachers. Login with email + password; JWT session.
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher')),
  teacher_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- One teacher, many students: students have teacher_id set.
CREATE INDEX IF NOT EXISTS idx_users_teacher_id ON users(teacher_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Progress: one row per student. XP and level shared across themes (TECHNICAL_SPEC §12).
CREATE TABLE IF NOT EXISTS progress (
  student_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  completed_zadania JSONB NOT NULL DEFAULT '[]',  -- array of zadanie_id
  current_stopien TEXT NOT NULL DEFAULT 'uczen',  -- uczen | czeladnik | mistrz
  xp INTEGER NOT NULL DEFAULT 0,
  streak_days INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  achievements JSONB NOT NULL DEFAULT '[]',
  preferred_theme TEXT DEFAULT 'polonia',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE users IS 'Students and teachers; email + password login; JWT session.';
COMMENT ON TABLE progress IS 'Per-student progress; XP/level global across themes. Streak in Eastern (America/New_York).';
