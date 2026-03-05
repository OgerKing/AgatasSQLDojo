/**
 * Curated English copy for Zadanie detail page.
 * Keyed by zadanie id; only `title` and `goal` are localized here.
 */
export const EN_DETAIL_BY_ID = {
  // Polonia (high-traffic early lessons)
  "podstawy-select": {
    title: "All events",
    goal: "Show all rows from the `wydarzenia` table (`SELECT *`).",
  },
  "where-miejsce": {
    title: "Events in one location",
    goal: "Show only events where `miejsce` is 'Rynek' (`WHERE`).",
  },
  "order-by-data": {
    title: "Events by date",
    goal: "Show all events ordered by `data_wydarzenia` ascending (`ORDER BY`).",
  },
  "select-kolumny": {
    title: "Only name and date",
    goal: "Show only the `nazwa` and `data_wydarzenia` columns (column selection).",
  },
  "select-literaly": {
    title: "Literals in a query",
    goal: "Show the event name and a constant text 'Polonia' as a column (literals).",
  },
  "where-rowne": {
    title: "Event by id",
    goal: "Show exactly one row: the event with `id = 2`.",
  },
  "where-rozne": {
    title: "All except one location",
    goal: "Show events where `miejsce` is not 'Park miejski'.",
  },
  "where-wieksze": {
    title: "Events after a date",
    goal: "Show events with `data_wydarzenia` after 2025-09-30 (`WHERE` with `>` or `>=`).",
  },
  "where-and": {
    title: "Location and date",
    goal: "Show events in Rynek with `data_wydarzenia` before 2025-12-01 (`AND`).",
  },
  "where-or": {
    title: "Rynek or Park",
    goal: "Show events where `miejsce` is 'Rynek' or 'Park miejski' (`OR`).",
  },
  "where-in": {
    title: "Location from a list",
    goal: "Show events where `miejsce` is in this list: Rynek, Dom parafialny (`IN`).",
  },
  "where-like": {
    title: "Name contains text",
    goal: "Show events where `nazwa` contains 'cech' (`LIKE`).",
  },
  "where-like-pct": {
    title: "Name starts with text",
    goal: "Show events where `nazwa` starts with 'Kiermasz' (`LIKE '...%'`).",
  },
  "where-null": {
    title: "Location is NULL",
    goal: "Show events where `miejsce` is `NULL` (`IS NULL`).",
  },
  "where-not-null": {
    title: "Location is not NULL",
    goal: "Show events where `miejsce` is not `NULL` (`IS NOT NULL`).",
  },
  "order-by-desc": {
    title: "Events from latest",
    goal: "Show all events ordered by `data_wydarzenia` descending (`DESC`).",
  },

  // Wizards
  "wizards-select-all": {
    title: "All spells",
    goal: "Show all rows from the `spells` table (`SELECT *`).",
  },
  "wizards-where-element": {
    title: "Ice spells",
    goal: "Show only spells whose `element` is 'ice' (`WHERE`).",
  },
  "wizards-order-level": {
    title: "Spells by level",
    goal: "Show all spells ordered by `level_required` ascending (`ORDER BY`).",
  },
  "wizards-select-columns": {
    title: "Name and element",
    goal: "Show only the `name` and `element` columns (column selection).",
  },

  // Two boys and St Bernard
  "urban-select-all": {
    title: "All outings",
    goal: "Show all rows from the `outings` table (`SELECT *`).",
  },
  "urban-where-dog": {
    title: "Outings with the dog",
    goal: "Show only outings where `with_dog` is 1 (`WHERE`).",
  },
  "urban-order-duration": {
    title: "Outings by duration",
    goal: "Show all outings ordered by `duration_min` ascending (`ORDER BY`).",
  },
  "urban-select-columns": {
    title: "Place and day",
    goal: "Show only the `place` and `day` columns (column selection).",
  },
};
