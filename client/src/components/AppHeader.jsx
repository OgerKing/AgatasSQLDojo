import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeSwitcher } from "./ThemeSwitcher";

/**
 * Persistent header with app name (home link), theme switch (students), and language switch. Always visible.
 */
export function AppHeader() {
  const { t } = useTranslation();

  return (
    <header className="app-header">
      <Link to="/" className="app-header-home">
        {t("home.title")}
      </Link>
      <ThemeSwitcher />
      <LanguageSwitch />
    </header>
  );
}
