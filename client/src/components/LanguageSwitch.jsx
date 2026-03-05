import { useTranslation } from "react-i18next";

/**
 * Small flag control: Polish = PL locale, US = English. Persisted via i18n (localStorage).
 */
export function LanguageSwitch() {
  const { i18n } = useTranslation();
  const isPl = i18n.language === "pl" || i18n.language.startsWith("pl");

  const { t } = useTranslation();
  return (
    <div className="language-switch" role="group" aria-label={t("common.language")}>
      <button
        type="button"
        className={"lang-btn" + (isPl ? " active" : "")}
        onClick={() => i18n.changeLanguage("pl")}
        aria-pressed={isPl}
        aria-label={t("common.polish")}
        title={t("common.polish")}
      >
        <span aria-hidden>🇵🇱</span>
      </button>
      <button
        type="button"
        className={"lang-btn" + (!isPl ? " active" : "")}
        onClick={() => i18n.changeLanguage("en")}
        aria-pressed={!isPl}
        aria-label={t("common.english")}
        title={t("common.english")}
      >
        <span aria-hidden>🇺🇸</span>
      </button>
    </div>
  );
}
