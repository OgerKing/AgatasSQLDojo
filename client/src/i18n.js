import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

const STORAGE_KEY = "cech_locale";

function getStoredLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "pl") return stored;
  } catch (_) {}
  return "pl";
}

i18n.use(initReactI18next).init({
  resources: { pl: { translation: pl }, en: { translation: en } },
  lng: getStoredLocale(),
  fallbackLng: "pl",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch (_) {}
});

export default i18n;
