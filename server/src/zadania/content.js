/**
 * Zadania content (Polonia theme). One zadanie per concept; schema + seed for SQLite sandbox.
 * @see TECHNICAL_SPEC §4, BUILD_PLAN Phase 1
 */

export const ZADANIA = [
  {
    id: "podstawy-select",
    theme: "polonia",
    title: "Wszystkie wydarzenia",
    goal: "Pokaż wszystkie wydarzenia z tabeli wydarzenia (użyj SELECT).",
    concept: "SELECT",
    stopien: "uczen",
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
    expected_result: [
      { id: 1, nazwa: "Dożynki", data_wydarzenia: "2025-09-14", miejsce: "Park miejski" },
      { id: 2, nazwa: "Spotkanie cechu", data_wydarzenia: "2025-10-01", miejsce: "Dom parafialny" },
      { id: 3, nazwa: "Kiermasz świąteczny", data_wydarzenia: "2025-12-07", miejsce: "Rynek" },
    ],
    version: 1,
  },
  {
    id: "where-miejsce",
    theme: "polonia",
    title: "Wydarzenia w jednym miejscu",
    goal: "Pokaż tylko wydarzenia, których miejsce to 'Rynek' (użyj WHERE).",
    concept: "WHERE",
    stopien: "uczen",
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
    expected_result: [
      { id: 3, nazwa: "Kiermasz świąteczny", data_wydarzenia: "2025-12-07", miejsce: "Rynek" },
    ],
    version: 1,
  },
  {
    id: "order-by-data",
    theme: "polonia",
    title: "Wydarzenia od najbliższego",
    goal: "Pokaż wszystkie wydarzenia posortowane po dacie rosnąco (najbliższe pierwsze). Użyj ORDER BY.",
    concept: "ORDER BY",
    stopien: "uczen",
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
    expected_result: [
      { id: 1, nazwa: "Dożynki", data_wydarzenia: "2025-09-14", miejsce: "Park miejski" },
      { id: 2, nazwa: "Spotkanie cechu", data_wydarzenia: "2025-10-01", miejsce: "Dom parafialny" },
      { id: 3, nazwa: "Kiermasz świąteczny", data_wydarzenia: "2025-12-07", miejsce: "Rynek" },
    ],
    version: 1,
  },
];

export function getZadanieById(id) {
  return ZADANIA.find((z) => z.id === id) ?? null;
}

/** @param {string[]} completedIds - optional; if provided, each zadanie gets completed and unlocked. */
export function listZadania(completedIds = []) {
  const ids = ZADANIA.map((z) => z.id);
  return ZADANIA.map((z, i) => ({
    id: z.id,
    theme: z.theme,
    title: z.title,
    goal: z.goal,
    stopien: z.stopien,
    completed: completedIds.includes(z.id),
    unlocked: i === 0 || completedIds.includes(ids[i - 1]),
  }));
}
