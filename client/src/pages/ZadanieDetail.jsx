import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiFetch, isLoggedIn, API_BASE } from "../api";
import { MistrzChat } from "../components/MistrzChat";
import { ProgressBar } from "../components/ProgressBar";

export function ZadanieDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [zadanie, setZadanie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [nextId, setNextId] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [celebration, setCelebration] = useState(false);
  const [firstCompletion, setFirstCompletion] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(API_BASE + `/zadania/${id}`)
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
    const locale = i18n.language?.startsWith("en") ? "en" : "pl";
    try {
      const res = await fetch(API_BASE + "/run-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zadanie_id: id, query, locale }),
      });
      const data = await res.json();
      setResult(data);
      if (data.correct === true) {
        setCelebration(true);
        setTimeout(() => setCelebration(false), 2500);
        const token = localStorage.getItem("cech_token");
        if (token) {
          const progressRes = await apiFetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ zadanie_id: id }),
          });
          const progressData = await progressRes.json();
          if (progressData.completed_zadania?.length === 1) setFirstCompletion(true);
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

  if (loading) return <main className="zadanie-detail"><p>{t("zadania.loading")}</p></main>;
  if (!zadanie) return (
    <main className="zadanie-detail">
      <p>{t("zadanie.notFound")}</p>
      <Link to="/zadania">← {t("nav.zadaniaList")}</Link>
    </main>
  );

  return (
    <main className="zadanie-detail">
      {isLoggedIn() && <ProgressBar />}
      <p><Link to="/">{t("nav.cech")}</Link> → <Link to="/zadania">{t("nav.zadania")}</Link> → {zadanie.title}</p>
      <h1>{zadanie.title}</h1>
      <p className="goal"><strong>{t("zadanie.goal")}:</strong> {zadanie.goal}</p>

      <div className="editor-layout">
        <section className="schema-panel">
          <h2>{t("zadanie.schema")}</h2>
          <pre className="schema-ddl">{zadanie.schema_ddl}</pre>
        </section>
        <section className="editor-panel">
          <label htmlFor="sql">{t("zadanie.sqlLabel")}</label>
          <textarea
            id="sql"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={6}
            placeholder={t("zadanie.sqlPlaceholder")}
          />
          <button type="button" onClick={handleRun} disabled={running}>
            {running ? t("zadanie.running") : t("zadanie.run")}
          </button>
        </section>
      </div>

      {result && (
        <section className="result-panel">
          <h2>{t("zadanie.result")}</h2>
          {result.error || result.code ? (
            <p className="error">
              {result.code === "NOT_FOUND"
                ? t("zadanie.notFound")
                : result.code === "NEED_ZADANIE_AND_QUERY"
                ? t("errors.needZadanieAndQuery")
                : typeof result.error === "string"
                ? result.error
                : result.message || String(result.error || "")}
            </p>
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
            <p><Link to={`/zadanie/${nextId}`}>{t("zadanie.nextTask")}</Link></p>
          )}
          {result.correct === true && !nextId && (
            <p><Link to="/zadania">{t("zadanie.chooseTask")}</Link></p>
          )}
        </section>
      )}

      {celebration && (
        <div
          className="celebration-toast"
          role="status"
          aria-live="polite"
          tabIndex={0}
          onClick={() => setCelebration(false)}
          onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setCelebration(false);
          }
        }}
        >
          {firstCompletion ? t("zadanie.firstCorrect") : t("zadanie.correct")}
        </div>
      )}

      <MistrzChat
        disabled={!zadanie}
        context={{
          zadanie_id: id,
          goal: zadanie?.goal,
          concept: zadanie?.concept,
          schema: zadanie?.schema_ddl,
          last_query: query || undefined,
          db_response: result?.error ?? (result?.rows != null ? t("zadanie.rowsReturned", { count: result.rows.length }) : undefined),
          attempt_count: attemptCount,
        }}
      />
    </main>
  );
}
