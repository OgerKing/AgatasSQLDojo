import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../api";
import { MistrzChat } from "../components/MistrzChat";

export function ZadanieDetail() {
  const { id } = useParams();
  const [zadanie, setZadanie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [nextId, setNextId] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/zadania/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Not found"))))
      .then((data) => {
        if (!cancelled) setZadanie(data);
      })
      .catch(() => {
        if (!cancelled) setZadanie(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

  async function handleRun() {
    setRunning(true);
    setResult(null);
    setNextId(null);
    setAttemptCount((c) => c + 1);
    try {
      const res = await fetch("/api/run-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zadanie_id: id, query }),
      });
      const data = await res.json();
      setResult(data);
      if (data.correct === true) {
        const token = localStorage.getItem("cech_token");
        if (token) {
          await apiFetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ zadanie_id: id }),
          });
          const listRes = await apiFetch("/api/zadania");
          const list = await listRes.json();
          const idx = list.findIndex((z) => z.id === id);
          const next = list[idx + 1];
          if (next?.unlocked) setNextId(next.id);
        }
      }
    } finally {
      setRunning(false);
    }
  }

  if (loading) return <main className="zadanie-detail"><p>Ładowanie…</p></main>;
  if (!zadanie) return (
    <main className="zadanie-detail">
      <p>Nie znaleziono zadania.</p>
      <Link to="/zadania">← Lista zadań</Link>
    </main>
  );

  return (
    <main className="zadanie-detail">
      <p><Link to="/">Cech</Link> → <Link to="/zadania">Zadania</Link> → {zadanie.title}</p>
      <h1>{zadanie.title}</h1>
      <p className="goal"><strong>Cel:</strong> {zadanie.goal}</p>

      <div className="editor-layout">
        <section className="schema-panel">
          <h2>Schemat</h2>
          <pre className="schema-ddl">{zadanie.schema_ddl}</pre>
        </section>
        <section className="editor-panel">
          <label htmlFor="sql">Zapytanie SQL</label>
          <textarea
            id="sql"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={6}
            placeholder="np. SELECT * FROM wydarzenia"
          />
          <button type="button" onClick={handleRun} disabled={running}>
            {running ? "Uruchamianie…" : "Uruchom"}
          </button>
        </section>
      </div>

      {result && (
        <section className="result-panel">
          <h2>Wynik</h2>
          {result.error ? (
            <p className="error">{result.error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  {(result.columns || []).map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(result.rows || []).map((row, i) => (
                  <tr key={i}>
                    {(result.columns || []).map((col) => (
                      <td key={col}>{String(row[col] ?? "")}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {result.correct === true && nextId && (
            <p><Link to={`/zadanie/${nextId}`}>Następne zadanie →</Link></p>
          )}
          {result.correct === true && !nextId && (
            <p><Link to="/zadania">Wybierz zadanie</Link></p>
          )}
        </section>
      )}

      <MistrzChat
        disabled={!zadanie}
        context={{
          zadanie_id: id,
          goal: zadanie?.goal,
          concept: zadanie?.concept,
          schema: zadanie?.schema_ddl,
          last_query: query || undefined,
          db_response: result?.error ?? (result?.rows != null ? `Zwrócono ${result.rows.length} wierszy` : undefined),
          attempt_count: attemptCount,
        }}
      />
    </main>
  );
}
