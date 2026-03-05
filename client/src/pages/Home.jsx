import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, setToken } from "../api";

export function Home() {
  const navigate = useNavigate();
  function logout() {
    setToken(null);
    navigate("/", { replace: true });
  }
  return (
    <main className="home">
      <h1>Cech</h1>
      <p>
        <Link to="/zadania">Zadania</Link>
        {isLoggedIn() ? (
          <> · <button type="button" className="link-button" onClick={logout}>Wyloguj</button></>
        ) : (
          <> · <Link to="/login">Zaloguj</Link></>
        )}
      </p>
    </main>
  );
}
