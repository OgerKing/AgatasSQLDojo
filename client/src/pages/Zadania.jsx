import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../api";

export function Zadania() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/zadania")
      .then((r) => r.json())
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="zadania">
      <h1>Zadania</h1>
      <p><Link to="/">← Cech</Link></p>
      {loading ? (
        <p>Ładowanie…</p>
      ) : (
        <ul>
          {list.map((z) => (
            <li key={z.id}>
              {z.unlocked ? (
                <Link to={`/zadanie/${z.id}`}>{z.title}</Link>
              ) : (
                <span className="locked">{z.title}</span>
              )}
              {z.completed && <span className="completed"> ✓</span>}
              <span className="stopien"> ({z.stopien})</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
