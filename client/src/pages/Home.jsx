import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isLoggedIn, setToken, getStoredUser } from "../api";

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = getStoredUser();
  function logout() {
    setToken(null);
    navigate("/", { replace: true });
  }
  return (
    <main className="home">
      <h1>{t("home.title")}</h1>
      <p>
        <Link to="/zadania">{t("nav.zadania")}</Link>
        {user?.role === "teacher" && (
          <> · <Link to="/nauczyciel">{t("nav.teacher")}</Link></>
        )}
        {isLoggedIn() ? (
          <> · <button type="button" className="link-button" onClick={logout}>{t("nav.logout")}</button></>
        ) : (
          <> · <Link to="/login">{t("nav.login")}</Link></>
        )}
      </p>
    </main>
  );
}
