import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../api";

export function Login() {
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
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.message || "Błąd logowania.");
          return;
        }
        setToken(data.token);
        navigate(role === "student" ? "/zadania" : "/zadania", { replace: true });
      })
      .catch(() => setError("Błąd połączenia."))
      .finally(() => setLoading(false));
  }

  return (
    <main className="login">
      <h1>Zaloguj się</h1>
      <p className="hint">Test: student@cech.local / teacher@cech.local, hasło: cech</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <label htmlFor="password">Hasło</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <label htmlFor="role">Rola</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Uczeń</option>
          <option value="teacher">Nauczyciel</option>
        </select>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logowanie…" : "Zaloguj"}
        </button>
      </form>
    </main>
  );
}
