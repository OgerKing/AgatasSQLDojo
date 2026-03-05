import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitch } from "./LanguageSwitch";

/**
 * Persistent header with app name (home link) and language switch. Always visible.
 */
export function AppHeader() {
  const { t } = useTranslation();

  return (
    <header className="app-header">
      <Link to="/" className="app-header-home">
        {t("home.title")}
      </Link>
      <LanguageSwitch />
    </header>
  );
}
