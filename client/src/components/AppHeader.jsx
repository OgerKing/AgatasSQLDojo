import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { isLoggedIn, setToken } from "../api";

/**
 * Persistent header with app name (home link), theme switch (students), language switch, and logout. Always visible.
 */
export function AppHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function handleLogout() {
    setToken(null);
    navigate("/login");
  }

  return (
    <header className="app-header">
      <Link to="/" className="app-header-home">
        {t("home.title")}
      </Link>
      <ThemeSwitcher />
      <LanguageSwitch />
      {isLoggedIn() && (
        <button type="button" className="logout-btn" onClick={handleLogout}>
          {t("nav.logout")}
        </button>
      )}
    </header>
  );
}
