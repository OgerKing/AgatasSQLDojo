/**
 * Wizards school theme – minimal set (SELECT, WHERE, ORDER BY). Same concepts as Polonia, different schema/copy.
 * @see TECHNICAL_SPEC §12
 */
const SCHEMA_DDL = `CREATE TABLE spells (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  element TEXT,
  level_required INTEGER,
  mana_cost INTEGER
);`;

const SEED_SQL = `INSERT INTO spells (id, name, element, level_required, mana_cost) VALUES
(1, 'Fireball', 'fire', 1, 10),
(2, 'Ice Shard', 'ice', 1, 8),
(3, 'Heal', 'light', 2, 15),
(4, 'Lightning', 'storm', 3, 25),
(5, 'Shield', 'earth', 1, 12),
(6, 'Blizzard', 'ice', 4, 40),
(7, 'Flash', 'light', 2, 5);`;

export const ZADANIA = [
  {
    id: "wizards-select-all",
    theme: "wizards",
    title: "All spells",
    goal: "Show all rows from the spells table (SELECT *).",
    concept: "SELECT",
    stopien: "uczen",
    reference: "https://www.sqlite.org/lang_select.html",
    schema_ddl: SCHEMA_DDL,
    seed_sql: SEED_SQL,
    expected_result: [
      { id: 1, name: "Fireball", element: "fire", level_required: 1, mana_cost: 10 },
      { id: 2, name: "Ice Shard", element: "ice", level_required: 1, mana_cost: 8 },
      { id: 3, name: "Heal", element: "light", level_required: 2, mana_cost: 15 },
      { id: 4, name: "Lightning", element: "storm", level_required: 3, mana_cost: 25 },
      { id: 5, name: "Shield", element: "earth", level_required: 1, mana_cost: 12 },
      { id: 6, name: "Blizzard", element: "ice", level_required: 4, mana_cost: 40 },
      { id: 7, name: "Flash", element: "light", level_required: 2, mana_cost: 5 },
    ],
    solution_sql: "SELECT * FROM spells",
    version: 1,
  },
  {
    id: "wizards-where-element",
    theme: "wizards",
    title: "Ice spells",
    goal: "Show only spells whose element is 'ice' (WHERE).",
    concept: "WHERE",
    stopien: "uczen",
    reference: "https://www.sqlite.org/lang_expr.html",
    schema_ddl: SCHEMA_DDL,
    seed_sql: SEED_SQL,
    expected_result: [
      { id: 2, name: "Ice Shard", element: "ice", level_required: 1, mana_cost: 8 },
      { id: 6, name: "Blizzard", element: "ice", level_required: 4, mana_cost: 40 },
    ],
    solution_sql: "SELECT * FROM spells WHERE element = 'ice'",
    version: 1,
  },
  {
    id: "wizards-order-level",
    theme: "wizards",
    title: "Spells by level",
    goal: "Show all spells ordered by level_required ascending (ORDER BY).",
    concept: "ORDER BY",
    stopien: "uczen",
    reference: "https://www.sqlite.org/lang_select.html",
    schema_ddl: SCHEMA_DDL,
    seed_sql: SEED_SQL,
    expected_result: [
      { id: 1, name: "Fireball", element: "fire", level_required: 1, mana_cost: 10 },
      { id: 2, name: "Ice Shard", element: "ice", level_required: 1, mana_cost: 8 },
      { id: 5, name: "Shield", element: "earth", level_required: 1, mana_cost: 12 },
      { id: 3, name: "Heal", element: "light", level_required: 2, mana_cost: 15 },
      { id: 7, name: "Flash", element: "light", level_required: 2, mana_cost: 5 },
      { id: 4, name: "Lightning", element: "storm", level_required: 3, mana_cost: 25 },
      { id: 6, name: "Blizzard", element: "ice", level_required: 4, mana_cost: 40 },
    ],
    solution_sql: "SELECT * FROM spells ORDER BY level_required ASC",
    version: 1,
  },
  {
    id: "wizards-select-columns",
    theme: "wizards",
    title: "Name and element",
    goal: "Show only columns name and element (column selection).",
    concept: "SELECT",
    stopien: "uczen",
    reference: "https://www.sqlite.org/lang_select.html",
    schema_ddl: SCHEMA_DDL,
    seed_sql: SEED_SQL,
    expected_result: [
      { name: "Fireball", element: "fire" },
      { name: "Ice Shard", element: "ice" },
      { name: "Heal", element: "light" },
      { name: "Lightning", element: "storm" },
      { name: "Shield", element: "earth" },
      { name: "Blizzard", element: "ice" },
      { name: "Flash", element: "light" },
    ],
    solution_sql: "SELECT name, element FROM spells",
    version: 1,
  },
];
