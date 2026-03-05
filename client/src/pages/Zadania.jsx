import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiFetch, isLoggedIn } from "../api";
import { ProgressBar } from "../components/ProgressBar";

export function Zadania() {
  const { t } = useTranslation();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const stopienLabel = (key) => {
    if (key === "uczen") return t("progress.stopienUczen");
    if (key === "czeladnik") return t("progress.stopienCzeladnik");
    if (key === "mistrz") return t("progress.stopienMistrz");
    return key;
  };

  useEffect(() => {
    apiFetch("/api/zadania")
      .then((r) => r.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="zadania">
      <h1>{t("zadania.title")}</h1>
      {isLoggedIn() && <ProgressBar totalZadania={list.length} />}
      <p><Link to="/">← {t("nav.cech")}</Link></p>
      {loading ? (
        <p>{t("zadania.loading")}</p>
      ) : (
        <ul>
          {list.map((z) => (
            <li key={z.id}>
              {z.unlocked ? (
                <Link to={`/zadanie/${z.id}`}>{z.title}</Link>
              ) : (
                <span className="locked">{z.title}</span>
              )}
              {z.completed && <span className="completed"> ✓</span>}
              <span className="stopien"> ({stopienLabel(z.stopien)})</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
