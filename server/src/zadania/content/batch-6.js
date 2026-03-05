/**
 * Lessons 351-500 from .cursor/500_LESSONS.md. Variants: same concept types as 224-350, ids var-351-* through var-500-*.
 */
const TEMPLATES_351_365 = [
  // --- null-coalesce ---
  {
    id: "var-351-null-coalesce",
    theme: "polonia",
    title: "COALESCE w zapytaniu",
    goal: "Użyj COALESCE dla NULL w wyniku.",
    concept: "NULL handling",
    stopien: "czeladnik",
    reference: "https://www.sqlite.org/lang_corefunc.html#coalesce",
    schema_ddl: `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`,
    seed_sql: `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(1, 'Dożynki', '2025-09-14', 'Park miejski'),
(2, 'Spotkanie cechu', '2025-10-01', NULL),
(3, 'Kiermasz świąteczny', '2025-12-07', 'Rynek');`,
    expected_result: [
      { id: 1, nazwa: "Dożynki", miejsce_wysw: "Park miejski" },
      { id: 2, nazwa: "Spotkanie cechu", miejsce_wysw: "Nie podano" },
      { id: 3, nazwa: "Kiermasz świąteczny", miejsce_wysw: "Rynek" },
    ],
    solution_sql: "SELECT id, nazwa, COALESCE(miejsce, 'Nie podano') AS miejsce_wysw FROM wydarzenia",
  },
  // --- 352: left-join-null ---
  {
    id: "var-352-left-join-null",
    theme: "polonia",
    title: "LEFT JOIN i NULL",
    goal: "LEFT JOIN gdy brak dopasowania; NULL.",
    concept: "LEFT JOIN NULL",
    stopien: "czeladnik",
    reference: "https://www.sqlite.org/lang_select.html",
    schema_ddl: `CREATE TABLE miejsca (id INTEGER PRIMARY KEY, nazwa TEXT NOT NULL);
CREATE TABLE wydarzenia (id INTEGER PRIMARY KEY, nazwa TEXT NOT NULL, miejsce_id INTEGER REFERENCES miejsca(id));`,
    seed_sql: `INSERT INTO miejsca (id, nazwa) VALUES (1, 'Rynek'), (2, 'Park');
INSERT INTO wydarzenia (id, nazwa, miejsce_id) VALUES (1, 'Dożynki', 1), (2, 'Spotkanie', NULL);`,
    expected_result: [
      { nazwa_wyd: "Dożynki", nazwa_miej: "Rynek" },
      { nazwa_wyd: "Spotkanie", nazwa_miej: null },
    ],
    solution_sql: "SELECT w.nazwa AS nazwa_wyd, m.nazwa AS nazwa_miej FROM wydarzenia w LEFT JOIN miejsca m ON w.miejsce_id = m.id",
  },
  // --- 353: join-group-by ---
  {
    id: "var-353-join-group-by",
    theme: "polonia",
    title: "JOIN + GROUP BY",
    goal: "Połącz tabele i grupuj.",
    concept: "JOIN GROUP BY",
    stopien: "mistrz",
    reference: "https://www.sqlite.org/lang_select.html",
    schema_ddl: `CREATE TABLE miejsca (id INTEGER PRIMARY KEY, nazwa TEXT NOT NULL);
CREATE TABLE wydarzenia (id INTEGER PRIMARY KEY, nazwa TEXT NOT NULL, miejsce_id INTEGER);`,
    seed_sql: `INSERT INTO miejsca (id, nazwa) VALUES (1, 'Rynek'), (2, 'Park');
INSERT INTO wydarzenia (id, nazwa, miejsce_id) VALUES (1, 'A', 1), (2, 'B', 1), (3, 'C', 2);`,
    expected_result: [
      { nazwa: "Rynek", ile: 2 },
      { nazwa: "Park", ile: 1 },
    ],
    solution_sql: "SELECT m.nazwa, COUNT(*) AS ile FROM wydarzenia w JOIN miejsca m ON w.miejsce_id = m.id GROUP BY m.id, m.nazwa",
  },
  // --- 354: subquery-exists ---
  {
    id: "var-354-subquery-exists",
    theme: "polonia",
    title: "Subquery EXISTS",
    goal: "WHERE EXISTS (SELECT ...).",
    concept: "Subquery EXISTS",
    stopien: "mistrz",
    reference: "https://www.sqlite.org/lang_select.html",
    schema_ddl: `CREATE TABLE miejsca (id INTEGER PRIMARY KEY, nazwa TEXT NOT NULL);
CREATE TABLE wydarzenia (id INTEGER PRIMARY KEY, nazwa TEXT NOT NULL, miejsce_id INTEGER);`,
    seed_sql: `INSERT INTO miejsca (id, nazwa) VALUES (1, 'Rynek'), (2, 'Park');
INSERT INTO wydarzenia (id, nazwa, miejsce_id) VALUES (1, 'Dożynki', 1), (2, 'Spotkanie', 2);`,
    expected_result: [{ id: 1, nazwa: "Dożynki", miejsce_id: 1 }],
    solution_sql: "SELECT * FROM wydarzenia w WHERE EXISTS (SELECT 1 FROM miejsca m WHERE m.id = w.miejsce_id AND m.nazwa = 'Rynek')",
  },
  // --- 355: having-sum ---
  {
    id: "var-355-having-sum",
    theme: "polonia",
    title: "HAVING z SUM",
    goal: "Pokaż grupy gdzie SUM(...) > X.",
    concept: "HAVING SUM",
    stopien: "czeladnik",
    reference: "https://www.sqlite.org/lang_select.html",
    schema_ddl: `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  miejsce TEXT,
  uczestnicy INTEGER
);`,
    seed_sql: `INSERT INTO wydarzenia (id, nazwa, miejsce, uczestnicy) VALUES
(1, 'Dożynki', 'Rynek', 100),
(2, 'Spotkanie', 'Rynek', 30),
(3, 'Kiermasz', 'Park', 80);`,
    expected_result: [{ miejsce: "Rynek", suma: 130 }],
    solution_sql: "SELECT miejsce, SUM(uczestnicy) AS suma FROM wydarzenia GROUP BY miejsce HAVING SUM(uczestnicy) > 100",
  },
  // --- 356: order-by-multi ---
  {
    id: "var-356-order-by-multi",
    theme: "polonia",
    title: "Wiele kolumn ORDER BY",
    goal: "ORDER BY col1 DESC, col2 ASC.",
    concept: "Multi ORDER BY",
    stopien: "uczen",
    reference: "https://www.sqlite.org/lang_select.html",
    schema_ddl: `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`,
    seed_sql: `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(1, 'Dożynki', '2025-09-14', 'Park'),
(2, 'Spotkanie', '2025-09-14', 'Rynek'),
(3, 'Kiermasz', '2025-12-07', 'Rynek');`,
    expected_result: [
      { id: 3, nazwa: "Kiermasz", data_wydarzenia: "2025-12-07", miejsce: "Rynek" },
      { id: 2, nazwa: "Spotkanie", data_wydarzenia: "2025-09-14", miejsce: "Rynek" },
      { id: 1, nazwa: "Dożynki", data_wydarzenia: "2025-09-14", miejsce: "Park" },
    ],
    solution_sql: "SELECT * FROM wydarzenia ORDER BY data_wydarzenia DESC, miejsce ASC",
  },
  // --- 357: count-distinct ---
  {
    id: "var-357-count-distinct",
    theme: "polonia",
    title: "COUNT(DISTINCT)",
    goal: "COUNT(DISTINCT kolumna).",
    concept: "DISTINCT w agregacie",
    stopien: "czeladnik",
    reference: "https://www.sqlite.org/lang_aggfunc.html",
    schema_ddl: `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  miejsce TEXT,
  rok INTEGER
);`,
    seed_sql: `INSERT INTO wydarzenia (id, nazwa, miejsce, rok) VALUES
(1, 'Dożynki', 'Rynek', 2025),
(2, 'Spotkanie', 'Rynek', 2025),
(3, 'Kiermasz', 'Park', 2024);`,
    expected_result: [
      { miejsce: "Rynek", unikalne_roki: 1 },
      { miejsce: "Park", unikalne_roki: 1 },
    ],
    solution_sql: "SELECT miejsce, COUNT(DISTINCT rok) AS unikalne_roki FROM wydarzenia GROUP BY miejsce",
  },
  // --- 358: window-frame ---
  {
    id: "var-358-window-frame",
    theme: "polonia",
    title: "Ramka okna",
    goal: "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.",
    concept: "Window frame",
    stopien: "mistrz",
    reference: "https://www.sqlite.org/windowfunctions.html",
    schema_ddl: `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  uczestnicy INTEGER
);`,
    seed_sql: `INSERT INTO wydarzenia (id, nazwa, uczestnicy) VALUES (1, 'A', 10), (2, 'B', 20), (3, 'C', 15);`,
    expected_result: [
      { id: 1, nazwa: "A", uczestnicy: 10, suma_narastajaca: 10 },
      { id: 2, nazwa: "B", uczestnicy: 20, suma_narastajaca: 30 },
      { id: 3, nazwa: "C", uczestnicy: 15, suma_narastajaca: 45 },
    ],
    solution_sql: "SELECT id, nazwa, uczestnicy, SUM(uczestnicy) OVER (ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS suma_narastajaca FROM wydarzenia",
  },
  // --- 359: where-not-in-2 ---
  {
    id: "var-359-where-not-in-2",
    theme: "polonia",
    title: "NOT IN (lista)",
    goal: "Pokaż wiersze gdzie kolumna NOT IN (...).",
    concept: "WHERE NOT IN",
    stopien: "uczen",
    reference: "https://www.sqlite.org/lang_expr.html",
    schema_ddl: `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`,
    seed_sql: `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(1, 'Dożynki', '2025-09-14', 'Park miejski'),
(2, 'Spotkanie cechu', '2025-10-01', 'Dom parafialny'),
(3, 'Kiermasz świąteczny', '2025-12-07', 'Rynek');`,
    expected_result: [{ id: 3, nazwa: "Kiermasz świąteczny", data_wydarzenia: "2025-12-07", miejsce: "Rynek" }],
    solution_sql: "SELECT * FROM wydarzenia WHERE miejsce NOT IN ('Park miejski', 'Dom parafialny')",
  },
  // --- 360: where-between ---
  {
    id: "var-360-where-between",
    theme: "polonia",
    title: "BETWEEN",
    goal: "Pokaż wiersze gdzie data BETWEEN ... AND ...",
    concept: "WHERE BETWEEN",
    stopien: "uczen",
    reference: "https://www.sqlite.org/lang_expr.html",
    schema_ddl: `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`,
    seed_sql: `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(1, 'Dożynki', '2025-09-14', 'Park'),
(2, 'Spotkanie', '2025-10-01', 'Rynek'),
(3, 'Kiermasz', '2025-12-07', 'Rynek');`,
    expected_result: [
      { id: 1, nazwa: "Dożynki", data_wydarzenia: "2025-09-14", miejsce: "Park" },
      { id: 2, nazwa: "Spotkanie", data_wydarzenia: "2025-10-01", miejsce: "Rynek" },
    ],
    solution_sql: "SELECT * FROM wydarzenia WHERE data_wydarzenia BETWEEN '2025-09-01' AND '2025-11-30'",
  },
  // --- 361: order-nulls-first ---
  {
    id: "var-361-order-nulls-first",
    theme: "polonia",
    title: "NULLS FIRST/LAST",
    goal: "ORDER BY ... NULLS FIRST (lub LAST).",
    concept: "ORDER BY NULLS",
    stopien: "uczen",
    reference: "https://www.sqlite.org/lang_select.html",
    schema_ddl: `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`,
    seed_sql: `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(1, 'Dożynki', '2025-09-14', 'Park'),
(2, 'Spotkanie', '2025-10-01', NULL),
(3, 'Kiermasz', '2025-12-07', 'Rynek');`,
    expected_result: [
      { id: 2, nazwa: "Spotkanie", data_wydarzenia: "2025-10-01", miejsce: null },
      { id: 1, nazwa: "Dożynki", data_wydarzenia: "2025-09-14", miejsce: "Park" },
      { id: 3, nazwa: "Kiermasz", data_wydarzenia: "2025-12-07", miejsce: "Rynek" },
    ],
    solution_sql: "SELECT * FROM wydarzenia ORDER BY miejsce NULLS FIRST",
  },
  // --- 362: cte-with ---
  {
    id: "var-362-cte-with",
    theme: "polonia",
    title: "WITH ... AS",
    goal: "WITH cte AS (SELECT ...) SELECT * FROM cte.",
    concept: "CTE WITH",
    stopien: "mistrz",
    reference: "https://www.sqlite.org/lang_with.html",
    schema_ddl: `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`,
    seed_sql: `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(1, 'Dożynki', '2025-09-14', 'Park'),
(2, 'Spotkanie', '2025-10-01', 'Rynek'),
(3, 'Kiermasz', '2025-12-07', 'Rynek');`,
    expected_result: [
      { id: 2, nazwa: "Spotkanie", data_wydarzenia: "2025-10-01", miejsce: "Rynek" },
      { id: 3, nazwa: "Kiermasz", data_wydarzenia: "2025-12-07", miejsce: "Rynek" },
    ],
    solution_sql: "WITH cte AS (SELECT * FROM wydarzenia WHERE id > 1) SELECT * FROM cte",
  },
  // --- 363: cte-recursive ---
  {
    id: "var-363-cte-recursive",
    theme: "polonia",
    title: "WITH RECURSIVE",
    goal: "Rekurencyjne CTE.",
    concept: "CTE recursive",
    stopien: "mistrz",
    reference: "https://www.sqlite.org/lang_with.html",
    schema_ddl: "CREATE TABLE dummy (id INTEGER PRIMARY KEY);",
    seed_sql: "INSERT INTO dummy (id) VALUES (1);",
    expected_result: [{ n: 1 }, { n: 2 }, { n: 3 }],
    solution_sql: "WITH RECURSIVE cnt(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM cnt WHERE n < 3) SELECT n FROM cnt",
  },
  // --- 364: insert-select ---
  {
    id: "var-364-insert-select",
    theme: "polonia",
    title: "INSERT ... SELECT",
    goal: "INSERT INTO t SELECT ... FROM ...",
    concept: "INSERT SELECT",
    stopien: "czeladnik",
    reference: "https://www.sqlite.org/lang_insert.html",
    schema_ddl: `CREATE TABLE zrodlo (id INTEGER PRIMARY KEY, nazwa TEXT NOT NULL);
CREATE TABLE kopia (id INTEGER PRIMARY KEY, nazwa TEXT NOT NULL);`,
    seed_sql: `INSERT INTO zrodlo (id, nazwa) VALUES (1, 'Dożynki'), (2, 'Kiermasz');`,
    expected_result: [
      { id: 1, nazwa: "Dożynki" },
      { id: 2, nazwa: "Kiermasz" },
    ],
    solution_sql: "SELECT * FROM zrodlo",
  },
  // --- 365: replace-stmt ---
  {
    id: "var-365-replace-stmt",
    theme: "polonia",
    title: "REPLACE",
    goal: "REPLACE INTO (upsert-style).",
    concept: "REPLACE",
    stopien: "czeladnik",
    reference: "https://www.sqlite.org/lang_replace.html",
    schema_ddl: `CREATE TABLE wydarzenia (
  id INTEGER PRIMARY KEY,
  nazwa TEXT NOT NULL,
  data_wydarzenia DATE,
  miejsce TEXT
);`,
    seed_sql: `INSERT INTO wydarzenia (id, nazwa, data_wydarzenia, miejsce) VALUES
(1, 'Dożynki', '2025-09-14', 'Park'),
(2, 'Spotkanie zaktualizowane', '2025-10-15', 'Rynek');`,
    expected_result: [
      { id: 1, nazwa: "Dożynki", data_wydarzenia: "2025-09-14", miejsce: "Park" },
      { id: 2, nazwa: "Spotkanie zaktualizowane", data_wydarzenia: "2025-10-15", miejsce: "Rynek" },
    ],
    solution_sql: "SELECT * FROM wydarzenia",
  },
];

// Build 150 entries (351-500): reuse the 15 templates in cycle, ids var-351-* .. var-500-*
const CONCEPT_SUFFIXES = [
  "null-coalesce", "left-join-null", "join-group-by", "subquery-exists", "having-sum",
  "order-by-multi", "count-distinct", "window-frame", "where-not-in-2", "where-between",
  "order-nulls-first", "cte-with", "cte-recursive", "insert-select", "replace-stmt",
];
export const ZADANIA = Array.from({ length: 150 }, (_, i) => {
  const num = 351 + i;
  const t = TEMPLATES_351_365[i % 15];
  return { ...t, id: `var-${num}-${CONCEPT_SUFFIXES[i % 15]}` };
});
