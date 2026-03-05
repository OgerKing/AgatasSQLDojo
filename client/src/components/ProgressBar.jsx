import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { apiFetch, API_BASE } from "../api";

const FALLBACK_STOPIEN = { uczen: "Uczeń", czeladnik: "Czeladnik", mistrz: "Mistrz" };
const XP_PER_LEVEL = 100;

export function ProgressBar({ totalZadania: totalProp }) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(null);
  const [themeConfig, setThemeConfig] = useState(null);
  const [totalZadania, setTotalZadania] = useState(totalProp ?? 0);
  const ACHIEVEMENT_LABELS = {
    "pierwsze-zadanie": t("progress.achievementFirst"),
    "seria-3": t("progress.achievementStreak3"),
  };

  const refetchProgress = () => {
    apiFetch(API_BASE + "/progress")
      .then((r) => (r.ok ? r.json() : null))
      .then(setProgress);
  };

  useEffect(() => {
    refetchProgress();
  }, []);

  useEffect(() => {
    fetch(API_BASE + "/themes")
      .then((r) => (r.ok ? r.json() : null))
      .then(setThemeConfig);
  }, []);

  useEffect(() => {
    const onThemeChanged = () => refetchProgress();
    window.addEventListener("theme-changed", onThemeChanged);
    return () => window.removeEventListener("theme-changed", onThemeChanged);
  }, []);

  useEffect(() => {
    if (totalProp != null) {
      setTotalZadania(totalProp);
      return;
    }
    apiFetch("/api/zadania")
      .then((r) => r.json())
      .then((list) => setTotalZadania(list?.length ?? 0));
  }, [totalProp]);

  if (!progress) return null;

  const total = totalZadania || 1;
  const theme = progress.preferred_theme || "polonia";
  const rankLabels = themeConfig?.[theme]?.rankLabels || FALLBACK_STOPIEN;
  const completed = progress.completed_zadania?.length ?? 0;
  const stopienLabel = rankLabels[progress.current_stopien] || progress.current_stopien;
  const xp = progress.xp ?? 0;
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = xp % XP_PER_LEVEL;
  const xpToNextLevel = XP_PER_LEVEL - xpIntoLevel;
  const xpPercent = Math.max(0, Math.min(100, (xpIntoLevel / XP_PER_LEVEL) * 100));

  return (
    <aside className="progress-bar" aria-label={t("progress.ariaSummary")}>
      <div className="progress-summary">
        <span className="progress-count">
          {completed} {t("progress.of")} {total} {t("progress.ofTasks")}
        </span>
        <span className="progress-stopien">({stopienLabel})</span>
      </div>
      <div className="progress-xp">
        {t("progress.xp")}: {xp} · {t("progress.level")}: {level}
      </div>
      <div
        className="xp-meter"
        role="progressbar"
        aria-label={t("progress.xpProgress")}
        aria-valuemin={0}
        aria-valuemax={XP_PER_LEVEL}
        aria-valuenow={xpIntoLevel}
      >
        <div className="xp-meter-fill" style={{ width: `${xpPercent}%` }} />
      </div>
      <div className="xp-meta">
        <span>{xpIntoLevel}/{XP_PER_LEVEL}</span>
        <span>{t("progress.toNextLevel", { count: xpToNextLevel })}</span>
      </div>
      {progress.streak != null && progress.streak > 0 && (
        <div className="progress-streak">
          {t("progress.streak")}: {progress.streak} {progress.streak === 1 ? t("progress.streakDay") : t("progress.streakDays")}
        </div>
      )}
      {progress.streak_at_risk && (
        <div className="progress-streak-risk">{t("progress.streakAtRisk")}</div>
      )}
      {progress.achievements?.length > 0 && (
        <div className="progress-achievements">
          {progress.achievements.map((key) => (
            <span key={key} className="achievement-badge" title={ACHIEVEMENT_LABELS[key] || key}>
              {ACHIEVEMENT_LABELS[key] || key}
            </span>
          ))}
        </div>
      )}
    </aside>
  );
}
