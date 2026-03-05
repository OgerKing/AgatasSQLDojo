/**
 * Lessons 224-350 from .cursor/500_LESSONS.md. Variants: WHERE NOT IN, BETWEEN, ORDER BY NULLS,
 * CTE, INSERT SELECT, REPLACE, COALESCE, LEFT JOIN, JOIN+GROUP BY, EXISTS, HAVING SUM,
 * COUNT DISTINCT, window frame (repeated with different ids).
 */
const CONCEPT_SLUGS = [
  "where-not-in-2", "where-between", "order-nulls-first", "cte-with", "cte-recursive",
  "insert-select", "replace-stmt", "null-coalesce", "left-join-null", "join-group-by",
  "subquery-exists", "having-sum", "order-by-multi", "count-distinct", "window-frame"
];

const CONCEPT_META = {
  "where-not-in-2": { title: "NOT IN (lista)", goal: "Pokaż wiersze gdzie kolumna NOT IN (...).", concept: "WHERE NOT IN", stopien: "uczen", reference: "https://www.sqlite.org/lang_expr.html" },
  "where-between": { title: "BETWEEN", goal: "Pokaż wiersze gdzie data BETWEEN ... AND ...", concept: "WHERE BETWEEN", stopien: "uczen", reference: "https://www.sqlite.org/lang_expr.html" },
  "order-nulls-first": { title: "NULLS FIRST/LAST", goal: "ORDER BY ... NULLS FIRST (lub LAST).", concept: "ORDER BY NULLS", stopien: "uczen", reference: "https://www.sqlite.org/lang_select.html" },
  "cte-with": { title: "WITH ... AS", goal: "WITH cte AS (SELECT ...) SELECT * FROM cte.", concept: "CTE WITH", stopien: "mistrz", reference: "https://www.sqlite.org/lang_with.html" },
  "cte-recursive": { title: "WITH RECURSIVE", goal: "Rekurencyjne CTE.", concept: "CTE recursive", stopien: "mistrz", reference: "https://www.sqlite.org/lang_with.html" },
  "insert-select": { title: "INSERT ... SELECT", goal: "INSERT INTO t SELECT ... FROM ...", concept: "INSERT SELECT", stopien: "czeladnik", reference: "https://www.sqlite.org/lang_insert.html" },
  "replace-stmt": { title: "REPLACE", goal: "REPLACE INTO (upsert-style).", concept: "REPLACE", stopien: "czeladnik", reference: "https://www.sqlite.org/lang_replace.html" },
  "null-coalesce": { title: "COALESCE w zapytaniu", goal: "Użyj COALESCE dla NULL w wyniku.", concept: "NULL handling", stopien: "czeladnik", reference: "https://www.sqlite.org/lang_corefunc.html#coalesce" },
  "left-join-null": { title: "LEFT JOIN i NULL", goal: "LEFT JOIN gdy brak dopasowania; NULL.", concept: "LEFT JOIN NULL", stopien: "czeladnik", reference: "https://www.sqlite.org/lang_select.html" },
  "join-group-by": { title: "JOIN + GROUP BY", goal: "Połącz tabele i grupuj.", concept: "JOIN GROUP BY", stopien: "mistrz", reference: "https://www.sqlite.org/lang_select.html" },
  "subquery-exists": { title: "EXISTS", goal: "WHERE EXISTS (SELECT ...).", concept: "Subquery EXISTS", stopien: "mistrz", reference: "https://www.sqlite.org/lang_select.html" },
  "having-sum": { title: "HAVING z SUM", goal: "Pokaż grupy gdzie SUM(...) > X.", concept: "HAVING SUM", stopien: "czeladnik", reference: "https://www.sqlite.org/lang_select.html" },
  "order-by-multi": { title: "Wiele kolumn ORDER BY", goal: "ORDER BY col1 DESC, col2 ASC.", concept: "Multi ORDER BY", stopien: "uczen", reference: "https://www.sqlite.org/lang_select.html" },
  "count-distinct": { title: "COUNT(DISTINCT)", goal: "COUNT(DISTINCT kolumna).", concept: "DISTINCT w agregacie", stopien: "czeladnik", reference: "https://www.sqlite.org/lang_aggfunc.html" },
  "window-frame": { title: "Ramka okna", goal: "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.", concept: "Window frame", stopien: "mistrz", reference: "https://www.sqlite.org/windowfunctions.html" },
};

function buildZadanie(L) {
  const off = L - 224;
  const slug = CONCEPT_SLUGS[off % 15];
  const meta = CONCEPT_META[slug];
  const id = `var-${L}-${slug}`;
  const base = off * 100;

  let schema_ddl, seed_sql, expected_result, solution_sql;

  switch (slug) {
    case "where-not-in-2": {
      schema_ddl = `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`;
      seed_sql = `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(${base+1}, 'Dożynki', '2025-09-14', 'Park miejski'),
(${base+2}, 'Spotkanie cechu', '2025-10-01', 'Dom parafialny'),
(${base+3}, 'Kiermasz świąteczny', '2025-12-07', 'Rynek'),
(${base+4}, 'Koncert', '2025-11-15', 'Rynek'),
(${base+5}, 'Wystawa', '2025-10-20', 'Galeria');`;
      solution_sql = "SELECT * FROM wydarzenia WHERE miejsce NOT IN ('Park miejski', 'Dom parafialny')";
      expected_result = [
        { id: base+3, nazwa: "Kiermasz świąteczny", data_wydarzenia: "2025-12-07", miejsce: "Rynek" },
        { id: base+4, nazwa: "Koncert", data_wydarzenia: "2025-11-15", miejsce: "Rynek" },
        { id: base+5, nazwa: "Wystawa", data_wydarzenia: "2025-10-20", miejsce: "Galeria" },
      ];
      break;
    }
    case "where-between": {
      schema_ddl = `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`;
      const d1 = `2025-${String(10 + (off % 2)).padStart(2,'0')}-01`;
      const d2 = `2025-${String(11 + (off % 2)).padStart(2,'0')}-30`;
      seed_sql = `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(${base+1}, 'Dożynki', '2025-09-14', 'Park'),
(${base+2}, 'Spotkanie', '${d1}', 'Rynek'),
(${base+3}, 'Kiermasz', '2025-12-07', 'Rynek'),
(${base+4}, 'Koncert', '${d2}', 'Dom');`;
      solution_sql = `SELECT * FROM wydarzenia WHERE data_wydarzenia BETWEEN '${d1}' AND '${d2}' ORDER BY data_wydarzenia`;
      expected_result = (off % 2) === 1
        ? [
            { id: base+2, nazwa: "Spotkanie", data_wydarzenia: d1, miejsce: "Rynek" },
            { id: base+3, nazwa: "Kiermasz", data_wydarzenia: "2025-12-07", miejsce: "Rynek" },
            { id: base+4, nazwa: "Koncert", data_wydarzenia: d2, miejsce: "Dom" },
          ]
        : [
            { id: base+2, nazwa: "Spotkanie", data_wydarzenia: d1, miejsce: "Rynek" },
            { id: base+4, nazwa: "Koncert", data_wydarzenia: d2, miejsce: "Dom" },
          ];
      break;
    }
    case "order-nulls-first": {
      schema_ddl = `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`;
      seed_sql = `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(${base+1}, 'Dożynki', '2025-09-14', 'Park'),
(${base+2}, 'Spotkanie', '2025-10-01', NULL),
(${base+3}, 'Kiermasz', '2025-12-07', 'Rynek');`;
      solution_sql = "SELECT * FROM wydarzenia ORDER BY miejsce NULLS LAST";
      expected_result = [
        { id: base+1, nazwa: "Dożynki", data_wydarzenia: "2025-09-14", miejsce: "Park" },
        { id: base+3, nazwa: "Kiermasz", data_wydarzenia: "2025-12-07", miejsce: "Rynek" },
        { id: base+2, nazwa: "Spotkanie", data_wydarzenia: "2025-10-01", miejsce: null },
      ];
      break;
    }
    case "cte-with": {
      schema_ddl = `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`;
      seed_sql = `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(${base+1}, 'Dożynki', '2025-09-14', 'Park'),
(${base+2}, 'Kiermasz', '2025-12-07', 'Rynek');`;
      solution_sql = "WITH cte AS (SELECT * FROM wydarzenia) SELECT * FROM cte";
      expected_result = [
        { id: base+1, nazwa: "Dożynki", data_wydarzenia: "2025-09-14", miejsce: "Park" },
        { id: base+2, nazwa: "Kiermasz", data_wydarzenia: "2025-12-07", miejsce: "Rynek" },
      ];
      break;
    }
    case "cte-recursive": {
      const k = 5 + (off % 3);
      schema_ddl = `CREATE TABLE wydarzenia (id INTEGER PRIMARY KEY, nazwa TEXT);`;
      seed_sql = `INSERT INTO wydarzenia (id, nazwa) VALUES (1, 'x');`;
      solution_sql = `WITH RECURSIVE seq(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM seq WHERE n<${k}) SELECT n FROM seq`;
      expected_result = Array.from({ length: k }, (_, i) => ({ n: i + 1 }));
      break;
    }
    case "insert-select": {
      schema_ddl = `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);
CREATE TABLE kopia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`;
      seed_sql = `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(${base+1}, 'Dożynki', '2025-09-14', 'Park'),
(${base+2}, 'Kiermasz', '2025-12-07', 'Rynek');`;
      solution_sql = "INSERT INTO kopia SELECT * FROM wydarzenia";
      expected_result = [];
      break;
    }
    case "replace-stmt": {
      schema_ddl = `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`;
      seed_sql = `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(${base+1}, 'Dożynki', '2025-09-14', 'Park'),
(${base+2}, 'Spotkanie', '2025-10-01', 'Rynek');`;
      solution_sql = `REPLACE INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES (${base+2}, 'Spotkanie zaktualizowane', '2025-10-15', 'Rynek')`;
      expected_result = [];
      break;
    }
    case "null-coalesce": {
      schema_ddl = `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`;
      seed_sql = `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(${base+1}, 'Dożynki', '2025-09-14', 'Park'),
(${base+2}, 'Spotkanie', '2025-10-01', NULL);`;
      solution_sql = "SELECT id, nazwa, data_wydarzenia, COALESCE(miejsce, 'Nie podano') AS miejsce FROM wydarzenia";
      expected_result = [
        { id: base+1, nazwa: "Dożynki", data_wydarzenia: "2025-09-14", miejsce: "Park" },
        { id: base+2, nazwa: "Spotkanie", data_wydarzenia: "2025-10-01", miejsce: "Nie podano" },
      ];
      break;
    }
    case "left-join-null": {
      schema_ddl = `CREATE TABLE miejsca (id INTEGER PRIMARY KEY, nazwa TEXT);
CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce_id INTEGER,
  FOREIGN KEY (miejsce_id) REFERENCES miejsca(id)
);`;
      seed_sql = `INSERT INTO miejsca (id, nazwa) VALUES (${base+1}, 'Rynek'), (${base+2}, 'Park');
INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce_id) VALUES
(${base+1}, 'Kiermasz', '2025-12-07', ${base+1});`;
      solution_sql = "SELECT m.nazwa AS miejsce, w.nazwa AS wydarzenie FROM miejsca m LEFT JOIN wydarzenia w ON w.miejsce_id = m.id";
      expected_result = [
        { miejsce: "Rynek", wydarzenie: "Kiermasz" },
        { miejsce: "Park", wydarzenie: null },
      ];
      break;
    }
    case "join-group-by": {
      schema_ddl = `CREATE TABLE miejsca (id INTEGER PRIMARY KEY, nazwa TEXT);
CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce_id INTEGER,
  FOREIGN KEY (miejsce_id) REFERENCES miejsca(id)
);`;
      seed_sql = `INSERT INTO miejsca (id, nazwa) VALUES (${base+1}, 'Rynek'), (${base+2}, 'Park');
INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce_id) VALUES
(${base+1}, 'Kiermasz', '2025-12-07', ${base+1}),
(${base+2}, 'Koncert', '2025-11-01', ${base+1}),
(${base+3}, 'Dożynki', '2025-09-14', ${base+2});`;
      solution_sql = "SELECT m.nazwa, COUNT(*) AS liczba FROM wydarzenia w JOIN miejsca m ON w.miejsce_id = m.id GROUP BY m.id ORDER BY m.nazwa";
      expected_result = [
        { nazwa: "Park", liczba: 1 },
        { nazwa: "Rynek", liczba: 2 },
      ];
      break;
    }
    case "subquery-exists": {
      schema_ddl = `CREATE TABLE miejsca (id INTEGER PRIMARY KEY, nazwa TEXT);
CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce_id INTEGER,
  FOREIGN KEY (miejsce_id) REFERENCES miejsca(id)
);`;
      seed_sql = `INSERT INTO miejsca (id, nazwa) VALUES (${base+1}, 'Rynek'), (${base+2}, 'Park');
INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce_id) VALUES
(${base+1}, 'Kiermasz', '2025-12-07', ${base+1}),
(${base+2}, 'Dożynki', '2025-09-14', ${base+2});`;
      solution_sql = "SELECT * FROM wydarzenia w WHERE EXISTS (SELECT 1 FROM miejsca m WHERE m.id = w.miejsce_id AND m.nazwa = 'Rynek')";
      expected_result = [
        { id: base+1, nazwa: "Kiermasz", data_wydarzenia: "2025-12-07", miejsce_id: base+1 },
      ];
      break;
    }
    case "having-sum": {
      schema_ddl = `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  miejsce_id INTEGER,
  uczestnicy INTEGER
);`;
      seed_sql = `INSERT INTO wydarzenia (id, nazwa, miejsce_id, uczestnicy) VALUES
(${base+1}, 'Dożynki', 1, 30),
(${base+2}, 'Kiermasz', 1, 40),
(${base+3}, 'Koncert', 2, 25);`;
      solution_sql = "SELECT miejsce_id, SUM(uczestnicy) AS suma FROM wydarzenia GROUP BY miejsce_id HAVING SUM(uczestnicy) > 50";
      expected_result = [{ miejsce_id: 1, suma: 70 }];
      break;
    }
    case "order-by-multi": {
      schema_ddl = `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`;
      seed_sql = `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(${base+1}, 'Dożynki', '2025-09-14', 'Park'),
(${base+2}, 'Kiermasz', '2025-12-07', 'Rynek'),
(${base+3}, 'Koncert', '2025-11-01', 'Rynek');`;
      solution_sql = "SELECT * FROM wydarzenia ORDER BY miejsce DESC, data_wydarzenia ASC";
      expected_result = [
        { id: base+2, nazwa: "Kiermasz", data_wydarzenia: "2025-12-07", miejsce: "Rynek" },
        { id: base+3, nazwa: "Koncert", data_wydarzenia: "2025-11-01", miejsce: "Rynek" },
        { id: base+1, nazwa: "Dożynki", data_wydarzenia: "2025-09-14", miejsce: "Park" },
      ];
      break;
    }
    case "count-distinct": {
      schema_ddl = `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  miejsce TEXT
);`;
      seed_sql = `INSERT INTO wydarzenia (id, nazwa, miejsce) VALUES
(${base+1}, 'Kiermasz', 'Rynek'),
(${base+2}, 'Koncert', 'Rynek'),
(${base+3}, 'Dożynki', 'Park');`;
      solution_sql = "SELECT miejsce, COUNT(DISTINCT nazwa) AS unikalne FROM wydarzenia GROUP BY miejsce ORDER BY miejsce";
      expected_result = [
        { miejsce: "Park", unikalne: 1 },
        { miejsce: "Rynek", unikalne: 2 },
      ];
      break;
    }
    case "window-frame": {
      schema_ddl = `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  uczestnicy INTEGER
);`;
      seed_sql = `INSERT INTO wydarzenia (id, nazwa, uczestnicy) VALUES
(${base+1}, 'Dożynki', 10),
(${base+2}, 'Kiermasz', 20),
(${base+3}, 'Koncert', 15);`;
      solution_sql = "SELECT id, nazwa, SUM(uczestnicy) OVER (ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS suma_narastajaca FROM wydarzenia";
      expected_result = [
        { id: base+1, nazwa: "Dożynki", suma_narastajaca: 10 },
        { id: base+2, nazwa: "Kiermasz", suma_narastajaca: 30 },
        { id: base+3, nazwa: "Koncert", suma_narastajaca: 45 },
      ];
      break;
    }
    default:
      schema_ddl = `CREATE TABLE wydarzenia (id INTEGER PRIMARY KEY, nazwa TEXT);`;
      seed_sql = `INSERT INTO wydarzenia (id, nazwa) VALUES (${base+1}, 'x');`;
      solution_sql = "SELECT * FROM wydarzenia";
      expected_result = [{ id: base+1, nazwa: "x" }];
  }

  return {
    id,
    theme: "polonia",
    title: meta.title,
    goal: meta.goal,
    concept: meta.concept,
    stopien: meta.stopien,
    reference: meta.reference,
    schema_ddl,
    seed_sql,
    expected_result,
    solution_sql,
  };
}

export const ZADANIA = Array.from({ length: 127 }, (_, i) => buildZadanie(224 + i));
