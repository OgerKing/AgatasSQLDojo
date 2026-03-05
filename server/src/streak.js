/**
 * Streak in Eastern (America/New_York). "Day" = calendar day in Eastern.
 * @see TECHNICAL_SPEC §8
 */
export function todayEastern() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}

export function yesterdayEastern() {
  const today = todayEastern();
  const [y, m, d] = today.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d));
  t.setUTCDate(t.getUTCDate() - 1);
  return t.toISOString().slice(0, 10);
}

/**
 * Compute new streak_days and last_activity_date when completing a zadanie today (Eastern).
 */
export function updateStreak(lastActivityDate, currentStreakDays) {
  const today = todayEastern();
  const yesterday = yesterdayEastern();
  if (lastActivityDate === today) {
    return { last_activity_date: today, streak_days: currentStreakDays };
  }
  if (lastActivityDate === yesterday) {
    return { last_activity_date: today, streak_days: (currentStreakDays || 0) + 1 };
  }
  return { last_activity_date: today, streak_days: 1 };
}

export function isStreakAtRisk(lastActivityDate) {
  return lastActivityDate !== todayEastern();
}
