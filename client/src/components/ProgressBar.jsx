import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { apiFetch } from "../api";

export function ProgressBar({ totalZadania: totalProp }) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(null);
  const [totalZadania, setTotalZadania] = useState(totalProp ?? 0);
  const STOPIEN_LABEL = {
    uczen: t("progress.stopienUczen"),
    czeladnik: t("progress.stopienCzeladnik"),
    mistrz: t("progress.stopienMistrz"),
  };
  const ACHIEVEMENT_LABELS = {
    "pierwsze-zadanie": t("progress.achievementFirst"),
    "seria-3": t("progress.achievementStreak3"),
  };

  useEffect(() => {
    apiFetch("/api/progress")
      .then((r) => (r.ok ? r.json() : null))
      .then(setProgress);
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

  const completed = progress.completed_zadania?.length ?? 0;
  const stopienLabel = STOPIEN_LABEL[progress.current_stopien] || progress.current_stopien;

  return (
    <aside className="progress-bar" aria-label={t("progress.ariaSummary")}>
      <div className="progress-summary">
        <span className="progress-count">
          {completed} {t("progress.of")} {total} {t("progress.ofTasks")}
        </span>
        <span className="progress-stopien">({stopienLabel})</span>
      </div>
      <div className="progress-xp">{t("progress.xp")}: {progress.xp}</div>
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
