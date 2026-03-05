import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setToken, API_BASE } from "../api";

export function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    fetch(API_BASE + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          const msg = data.code === "MISSING_FIELDS"
            ? t("login.errorRole")
            : data.code === "INVALID_ROLE"
            ? t("errors.invalidRole")
            : data.code === "INVALID_CREDENTIALS"
            ? t("errors.invalidCredentials")
            : (data.message || t("login.errorLogin"));
          setError(msg);
          return;
        }
        setToken(data.token);
        if (role === "teacher") {
          navigate("/nauczyciel", { replace: true });
        } else {
          navigate("/zadanie/podstawy-select", { replace: true });
        }
      })
      .catch(() => setError(t("login.errorConnection")))
      .finally(() => setLoading(false));
  }

  return (
    <main className="login">
      <h1>{t("login.title")}</h1>
      <p className="hint">{t("login.hint")}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">{t("login.email")}</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <label htmlFor="password">{t("login.password")}</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <label htmlFor="role">{t("login.role")}</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">{t("login.roleStudent")}</option>
          <option value="teacher">{t("login.roleTeacher")}</option>
        </select>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? t("login.submitting") : t("login.submit")}
        </button>
      </form>
    </main>
  );
}
