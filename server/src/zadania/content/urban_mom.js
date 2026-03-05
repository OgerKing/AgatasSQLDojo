/**
 * Two young boys and their St Bernard (urban_mom) – minimal set. Same concepts, household/dog theme.
 * @see TECHNICAL_SPEC §12
 */
const SCHEMA_DDL = `CREATE TABLE outings (
  id INTEGER PRIMARY KEY,
  place TEXT NOT NULL,
  day TEXT,
  with_dog INTEGER,
  duration_min INTEGER
);`;

const SEED_SQL = `INSERT INTO outings (id, place, day, with_dog, duration_min) VALUES
(1, 'Park', 'Saturday', 1, 60),
(2, 'School', 'Monday', 0, 30),
(3, 'Lake', 'Sunday', 1, 120),
(4, 'Mall', 'Saturday', 0, 90),
(5, 'Trail', 'Sunday', 1, 45),
(6, 'Library', 'Wednesday', 0, 45),
(7, 'Beach', 'Sunday', 1, 180);`;

export const ZADANIA = [
  {
    id: "urban-select-all",
    theme: "urban_mom",
    title: "All outings",
    goal: "Show all rows from the outings table (SELECT *).",
    concept: "SELECT",
    stopien: "uczen",
    reference: "https://www.sqlite.org/lang_select.html",
    schema_ddl: SCHEMA_DDL,
    seed_sql: SEED_SQL,
    expected_result: [
      { id: 1, place: "Park", day: "Saturday", with_dog: 1, duration_min: 60 },
      { id: 2, place: "School", day: "Monday", with_dog: 0, duration_min: 30 },
      { id: 3, place: "Lake", day: "Sunday", with_dog: 1, duration_min: 120 },
      { id: 4, place: "Mall", day: "Saturday", with_dog: 0, duration_min: 90 },
      { id: 5, place: "Trail", day: "Sunday", with_dog: 1, duration_min: 45 },
      { id: 6, place: "Library", day: "Wednesday", with_dog: 0, duration_min: 45 },
      { id: 7, place: "Beach", day: "Sunday", with_dog: 1, duration_min: 180 },
    ],
    solution_sql: "SELECT * FROM outings",
    version: 1,
  },
  {
    id: "urban-where-dog",
    theme: "urban_mom",
    title: "Outings with the dog",
    goal: "Show only outings where with_dog is 1 (WHERE).",
    concept: "WHERE",
    stopien: "uczen",
    reference: "https://www.sqlite.org/lang_expr.html",
    schema_ddl: SCHEMA_DDL,
    seed_sql: SEED_SQL,
    expected_result: [
      { id: 1, place: "Park", day: "Saturday", with_dog: 1, duration_min: 60 },
      { id: 3, place: "Lake", day: "Sunday", with_dog: 1, duration_min: 120 },
      { id: 5, place: "Trail", day: "Sunday", with_dog: 1, duration_min: 45 },
      { id: 7, place: "Beach", day: "Sunday", with_dog: 1, duration_min: 180 },
    ],
    solution_sql: "SELECT * FROM outings WHERE with_dog = 1",
    version: 1,
  },
  {
    id: "urban-order-duration",
    theme: "urban_mom",
    title: "Outings by duration",
    goal: "Show all outings ordered by duration_min ascending (ORDER BY).",
    concept: "ORDER BY",
    stopien: "uczen",
    reference: "https://www.sqlite.org/lang_select.html",
    schema_ddl: SCHEMA_DDL,
    seed_sql: SEED_SQL,
    expected_result: [
      { id: 2, place: "School", day: "Monday", with_dog: 0, duration_min: 30 },
      { id: 5, place: "Trail", day: "Sunday", with_dog: 1, duration_min: 45 },
      { id: 6, place: "Library", day: "Wednesday", with_dog: 0, duration_min: 45 },
      { id: 1, place: "Park", day: "Saturday", with_dog: 1, duration_min: 60 },
      { id: 4, place: "Mall", day: "Saturday", with_dog: 0, duration_min: 90 },
      { id: 3, place: "Lake", day: "Sunday", with_dog: 1, duration_min: 120 },
      { id: 7, place: "Beach", day: "Sunday", with_dog: 1, duration_min: 180 },
    ],
    solution_sql: "SELECT * FROM outings ORDER BY duration_min ASC",
    version: 1,
  },
  {
    id: "urban-select-columns",
    theme: "urban_mom",
    title: "Place and day",
    goal: "Show only columns place and day (column selection).",
    concept: "SELECT",
    stopien: "uczen",
    reference: "https://www.sqlite.org/lang_select.html",
    schema_ddl: SCHEMA_DDL,
    seed_sql: SEED_SQL,
    expected_result: [
      { place: "Park", day: "Saturday" },
      { place: "School", day: "Monday" },
      { place: "Lake", day: "Sunday" },
      { place: "Mall", day: "Saturday" },
      { place: "Trail", day: "Sunday" },
      { place: "Library", day: "Wednesday" },
      { place: "Beach", day: "Sunday" },
    ],
    solution_sql: "SELECT place, day FROM outings",
    version: 1,
  },
];
