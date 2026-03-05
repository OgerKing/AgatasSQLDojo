import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTeacherStudents } from "../api";

export function Teacher() {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    getTeacherStudents()
      .then(setStudents)
      .catch(() => setError("access")) // translated in render
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="teacher-dashboard">
      <h1>{t("teacher.title")}</h1>
      <p><Link to="/">← {t("nav.cech")}</Link></p>
      {loading && <p>{t("teacher.loading")}</p>}
      {error && <p className="error">{error === "access" ? t("teacher.errorAccess") : error}</p>}
      {!loading && !error && (
        <>
          {students.length === 0 ? (
            <p>{t("teacher.noStudents")}</p>
          ) : (
            <ul className="teacher-student-list">
              {students.map((s) => (
                <li key={s.id} className="teacher-student-card">
                  <h2>{s.email}</h2>
                  <dl>
                    <dt>{t("teacher.completedTasks")}</dt>
                    <dd>{s.completed_zadania?.length ?? 0}</dd>
                    <dt>{t("teacher.stopien")}</dt>
                    <dd>{STOPIEN_LABEL[s.current_stopien] ?? s.current_stopien}</dd>
                    <dt>{t("teacher.xp")}</dt>
                    <dd>{s.xp ?? 0}</dd>
                    <dt>{t("teacher.streakDays")}</dt>
                    <dd>{s.streak ?? 0}</dd>
                    {s.last_activity_date && (
                      <>
                        <dt>{t("teacher.lastActivity")}</dt>
                        <dd>{new Date(s.last_activity_date).toLocaleDateString()}</dd>
                      </>
                    )}
                  </dl>
                  {s.achievements?.length > 0 && (
                    <div className="progress-achievements">
                      {s.achievements.map((key) => (
                        <span key={key} className="achievement-badge" title={ACHIEVEMENT_LABELS[key] || key}>
                          {ACHIEVEMENT_LABELS[key] || key}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
