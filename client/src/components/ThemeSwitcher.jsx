import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { apiFetch, API_BASE, isLoggedIn, getStoredUser } from "../api";

const THEME_IDS = ["polonia", "wizards", "urban_mom"];
const THEME_LABELS = {
  polonia: "Polonia",
  wizards: "Wizards school",
  urban_mom: "Two boys & St Bernard",
};

/**
 * Switch preferred_theme (persisted via PATCH /progress). Dispatches "theme-changed" so ProgressBar and Zadania refetch.
 * @see TECHNICAL_SPEC §12
 */
export function ThemeSwitcher() {
  const { t } = useTranslation();
  const [preferredTheme, setPreferredTheme] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn() || getStoredUser()?.role !== "student") return;
    apiFetch(API_BASE + "/progress")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setPreferredTheme(data.preferred_theme || "polonia"));
  }, []);

  async function selectTheme(theme) {
    if (theme === preferredTheme || loading) return;
    setLoading(true);
    try {
      const r = await apiFetch(API_BASE + "/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferred_theme: theme }),
      });
      if (r.ok) {
        setPreferredTheme(theme);
        window.dispatchEvent(new Event("theme-changed"));
      }
    } finally {
      setLoading(false);
    }
  }

  if (!isLoggedIn() || getStoredUser()?.role !== "student") return null;
  if (preferredTheme == null) return null;

  return (
    <div className="theme-switcher" role="group" aria-label={t("theme.ariaLabel")}>
      {THEME_IDS.map((id) => (
        <button
          key={id}
          type="button"
          className={"theme-btn" + (preferredTheme === id ? " active" : "")}
          onClick={() => selectTheme(id)}
          disabled={loading}
          title={THEME_LABELS[id] || id}
        >
          {THEME_LABELS[id] || id}
        </button>
      ))}
    </div>
  );
}
