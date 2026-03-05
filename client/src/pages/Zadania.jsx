import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiFetch, isLoggedIn, API_BASE } from "../api";
import { ProgressBar } from "../components/ProgressBar";

const FALLBACK_STOPIEN = { uczen: "Uczeń", czeladnik: "Czeladnik", mistrz: "Mistrz" };

export function Zadania() {
  const { t, i18n } = useTranslation();
  const [list, setList] = useState([]);
  const [themeConfig, setThemeConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadZadania = () => {
    setLoading(true);
    const locale = i18n.language?.startsWith("en") ? "en" : "pl";
    apiFetch(API_BASE + `/zadania?locale=${locale}`)
      .then((r) => r.json())
      .then(setList)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadZadania();
  }, [i18n.language]);

  useEffect(() => {
    fetch(API_BASE + "/themes")
      .then((r) => (r.ok ? r.json() : null))
      .then(setThemeConfig);
  }, []);

  useEffect(() => {
    const onThemeChanged = () => loadZadania();
    window.addEventListener("theme-changed", onThemeChanged);
    return () => window.removeEventListener("theme-changed", onThemeChanged);
  }, []);

  const stopienLabel = (key, preferredTheme) => {
    const theme = preferredTheme || "polonia";
    const labels = themeConfig?.[theme]?.rankLabels || FALLBACK_STOPIEN;
    return labels[key] || key;
  };

  return (
    <main className="zadania">
      <h1>{t("zadania.title")}</h1>
      {isLoggedIn() && <ProgressBar totalZadania={list.length} />}
      {isLoggedIn() && (
        <p className="theme-hint">
          {t("zadania.themeHint")} <em>{t("zadania.themeHintHeader")}</em>
        </p>
      )}
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
              <span className="stopien"> ({stopienLabel(z.stopien, list[0]?.theme)})</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
