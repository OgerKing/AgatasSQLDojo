/**
 * Zadania content: Polonia (full) + Wizards and Urban_mom (minimal). Merged from batch files.
 * @see TECHNICAL_SPEC §4, §12
 */

import { ZADANIA as B1 } from "./content/batch-1.js";
import { ZADANIA as B2 } from "./content/batch-2.js";
import { ZADANIA as B3 } from "./content/batch-3.js";
import { ZADANIA as B4 } from "./content/batch-4.js";
import { ZADANIA as B5 } from "./content/batch-5.js";
import { ZADANIA as B6 } from "./content/batch-6.js";
import { ZADANIA as Wizards } from "./content/wizards.js";
import { ZADANIA as UrbanMom } from "./content/urban_mom.js";
import { EN_DETAIL_BY_ID } from "./translations/en-detail.js";

export const ZADANIA = [...B1, ...B2, ...B3, ...B4, ...B5, ...B6, ...Wizards, ...UrbanMom];

const STOPIEN_ORDER = { uczen: 1, czeladnik: 2, mistrz: 3 };

export function getZadanieById(id) {
  return ZADANIA.find((z) => z.id === id) ?? null;
}

/** Highest stopień from a list of zadanie ids (uczen < czeladnik < mistrz). */
export function getHighestStopien(zadanieIds) {
  let max = 0;
  for (const id of zadanieIds || []) {
    const z = getZadanieById(id);
    if (z?.stopien && STOPIEN_ORDER[z.stopien] > max) {
      max = STOPIEN_ORDER[z.stopien];
    }
  }
  const entry = Object.entries(STOPIEN_ORDER).find(([, v]) => v === max);
  return entry ? entry[0] : "uczen";
}

const SQLITE_REFERENCE_MAP = [
  ["lang_select.html", "https://www.sqlitetutorial.net/sqlite-select/"],
  ["lang_expr.html", "https://www.sqlitetutorial.net/sqlite-where/"],
  ["lang_aggfunc.html#count", "https://www.sqlitetutorial.net/sqlite-count-function/"],
  ["lang_aggfunc.html#avg", "https://www.sqlitetutorial.net/sqlite-avg/"],
  ["lang_aggfunc.html", "https://www.sqlitetutorial.net/sqlite-aggregate-functions/"],
  ["windowfunctions.html", "https://www.sqlitetutorial.net/sqlite-window-functions/"],
  ["lang_with.html", "https://www.sqlitetutorial.net/sqlite-cte/"],
  ["lang_insert.html", "https://www.sqlitetutorial.net/sqlite-insert/"],
  ["lang_replace.html", "https://www.sqlitetutorial.net/sqlite-replace-statement/"],
  ["lang_update.html", "https://www.sqlitetutorial.net/sqlite-update/"],
  ["lang_delete.html", "https://www.sqlitetutorial.net/sqlite-delete/"],
  ["lang_transaction.html", "https://www.sqlitetutorial.net/sqlite-transaction/"],
  ["lang_savepoint.html", "https://www.sqlitetutorial.net/sqlite-transaction/"],
  ["lang_createtable.html", "https://www.sqlitetutorial.net/sqlite-create-table/"],
  ["lang_createindex.html", "https://www.sqlitetutorial.net/sqlite-index/"],
  ["lang_createview.html", "https://www.sqlitetutorial.net/sqlite-create-view/"],
  ["lang_altertable.html", "https://www.sqlitetutorial.net/sqlite-alter-table/"],
  ["lang_datatype3.html", "https://www.sqlitetutorial.net/sqlite-data-types/"],
  ["lang_keywords.html", "https://www.sqlitetutorial.net/sqlite-keywords/"],
  ["lang_attach.html", "https://www.sqlitetutorial.net/sqlite-attach-database/"],
  ["lang_createtrigger.html", "https://www.sqlitetutorial.net/sqlite-trigger/"],
  ["lang_corefunc.html#coalesce", "https://www.sqlitetutorial.net/sqlite-functions/sqlite-coalesce/"],
  ["lang_corefunc.html#lower", "https://www.sqlitetutorial.net/sqlite-functions/sqlite-lower/"],
  ["lang_corefunc.html#upper", "https://www.sqlitetutorial.net/sqlite-functions/sqlite-upper/"],
  ["lang_corefunc.html#trim", "https://www.sqlitetutorial.net/sqlite-functions/sqlite-trim/"],
  ["lang_corefunc.html#ltrim", "https://www.sqlitetutorial.net/sqlite-functions/sqlite-ltrim/"],
  ["lang_corefunc.html#rtrim", "https://www.sqlitetutorial.net/sqlite-functions/sqlite-rtrim/"],
  ["lang_corefunc.html#substr", "https://www.sqlitetutorial.net/sqlite-functions/sqlite-substr/"],
  ["lang_corefunc.html#concat", "https://www.sqlitetutorial.net/sqlite-string-functions/sqlite-concat/"],
  ["lang_corefunc.html#concat_ws", "https://www.sqlitetutorial.net/sqlite-string-functions/"],
  ["lang_corefunc.html#format", "https://www.sqlitetutorial.net/sqlite-string-functions/"],
  ["lang_corefunc.html#quote", "https://www.sqlitetutorial.net/sqlite-functions/sqlite-quote/"],
  ["lang_corefunc.html#typeof", "https://www.sqlitetutorial.net/sqlite-functions/sqlite-typeof/"],
];

/**
 * Convert sqlite.org references to learner-friendly SQLite tutorial links.
 * Leaves non-sqlite.org URLs unchanged.
 */
export function getFriendlyReference(reference) {
  if (!reference) return null;
  if (!reference.includes("sqlite.org/")) return reference;
  const match = SQLITE_REFERENCE_MAP.find(([needle]) => reference.includes(needle));
  return match ? match[1] : "https://www.sqlitetutorial.net/";
}

const PL_GOAL_REPLACEMENTS = [
  [/\bPokaż tylko\b/gi, "Show only"],
  [/\bPokaż wszystkie\b/gi, "Show all"],
  [/\bPokaż\b/gi, "Show"],
  [/\bWybierz\b/gi, "Select"],
  [/\bPolicz\b/gi, "Count"],
  [/\bUżyj\b/gi, "Use"],
  [/\bSprawdź\b/gi, "Check"],
  [/\bPorównaj\b/gi, "Compare"],
  [/\bSortuj\b/gi, "Sort"],
  [/\bPosortuj\b/gi, "Sort"],
  [/\bFiltruj\b/gi, "Filter"],
  [/\bGrupuj\b/gi, "Group"],
  [/\bWstaw\b/gi, "Insert"],
  [/\bZaktualizuj\b/gi, "Update"],
  [/\bUsuń\b/gi, "Delete"],
  [/\bUstaw\b/gi, "Set"],
  [/\bDla każdego\b/gi, "For each"],
  [/\bnazwy?\b/gi, "name"],
  [/\bmiejsca?\b/gi, "location"],
  [/\bdat(?:a|y)\b/gi, "date"],
  [/\bwydarzenia\b/gi, "events"],
  [/\bwydarzenie\b/gi, "event"],
  [/\bkolumn(?:y|a|ach|ę)?\b/gi, "column"],
  [/\bkolumn\b/gi, "columns"],
  [/\bwiersz(?:e|y)?\b/gi, "rows"],
  [/\btabel(?:i|a|ę)?\b/gi, "table"],
  [/\bliczb(?:a|ę)\b/gi, "count"],
  [/\bnajwcześniejszą\b/gi, "earliest"],
  [/\bnajpóźniejszą\b/gi, "latest"],
  [/\bśrednią\b/gi, "average"],
  [/\bunikalnych\b/gi, "unique"],
  [/\bunikalne\b/gi, "unique"],
  [/\bpierwsze\b/gi, "first"],
  [/\bdrugie\b/gi, "second"],
  [/\bdokładnie\b/gi, "exactly"],
  [/\bspełniające\b/gi, "matching"],
  [/\bspełniających\b/gi, "matching"],
  [/\bwarunek\b/gi, "condition"],
  [/\bwarunki\b/gi, "conditions"],
  [/\bpodanej\b/gi, "provided"],
  [/\bliście\b/gi, "list"],
  [/\bgdzie\b/gi, "where"],
  [/\boraz\b/gi, "and"],
  [/\bi\b/gi, "and"],
  [/\blob\b/gi, "or"],
  [/\bnie jest\b/gi, "is not"],
  [/\bjest\b/gi, "is"],
  [/\bpo\b/gi, "by"],
  [/\broku\b/gi, "year"],
  [/\brosnąco\b/gi, "ascending"],
  [/\bmalejąco\b/gi, "descending"],
  [/\bbez\b/gi, "without"],
  [/\bdla\b/gi, "for"],
  [/\bz\b/gi, "from"],
  [/\bna\b/gi, "on"],
  [/\bw\b/gi, "in"],
];

/**
 * Lightweight localization for Polonia tasks when UI locale is English.
 * This avoids raw Polish goals in the English UI until full hand-authored translations are added.
 */
function localizePoloniaTextToEnglish(text) {
  if (!text || typeof text !== "string") return text;
  let out = text;
  for (const [pattern, replacement] of PL_GOAL_REPLACEMENTS) {
    out = out.replace(pattern, replacement);
  }
  out = out
    .replace(/\bz datą po\b/gi, "with date after")
    .replace(/\bz datą przed\b/gi, "with date before")
    .replace(/\bzwiększą niż\b/gi, "greater than")
    .replace(/\bmniejszą niż\b/gi, "less than")
    .replace(/\bz listy\b/gi, "from the list")
    .replace(/\bw kolejności\b/gi, "in order")
    .replace(/\bwiele VALUES\b/gi, "multiple VALUES")
    .replace(/\bwiele kolumn\b/gi, "multiple columns")
    .replace(/\bwybór kolumn\b/gi, "column selection")
    .replace(/\bniepustym\b/gi, "non-null")
    .replace(/\bniepuste\b/gi, "non-null");
  // Clean up duplicated spaces introduced by replacements.
  out = out.replace(/\s{2,}/g, " ").trim();
  // Keep sentence-style capitalization.
  if (out.length > 0) out = out[0].toUpperCase() + out.slice(1);
  return out;
}

const LIKELY_POLISH_RE = /[ąćęłńóśźż]|(^|\s)(pokaż|użyj|sprawdź|porównaj|sortuj|filtruj|grupuj|wstaw|usuń|zaktualizuj|tabel|wiersz|kolumn|zapytani|schemat|zadani|wydarze|miejsce|nazwa)(\b|$)/i;

function buildEnglishGoalFallback(zadanie) {
  const concept = typeof zadanie?.concept === "string" ? zadanie.concept.trim() : "";
  if (concept) return `Practice ${concept} in this task.`;
  return "Complete this SQL task using the schema and expected result.";
}

function buildEnglishTitleFallback(zadanie) {
  const concept = typeof zadanie?.concept === "string" ? zadanie.concept.trim() : "";
  if (concept) return `${concept} challenge`;
  return "SQL challenge";
}

function ensureEnglishChallengeCopy(zadanie) {
  if (!zadanie) return zadanie;
  const next = { ...zadanie };
  const title = typeof next.title === "string" ? next.title.trim() : "";
  const goal = typeof next.goal === "string" ? next.goal.trim() : "";
  if (!title || LIKELY_POLISH_RE.test(title)) {
    next.title = buildEnglishTitleFallback(next);
  }
  if (!goal || LIKELY_POLISH_RE.test(goal)) {
    next.goal = buildEnglishGoalFallback(next);
  }
  return next;
}

/** Localize title/goal text in API payloads by locale. */
export function localizeZadanieForLocale(zadanie, locale = "pl") {
  if (!zadanie) return zadanie;
  if (locale !== "en") return zadanie;
  const title =
    zadanie.theme === "polonia" ? localizePoloniaTextToEnglish(zadanie.title) : zadanie.title;
  const goal =
    zadanie.theme === "polonia" ? localizePoloniaTextToEnglish(zadanie.goal) : zadanie.goal;
  return ensureEnglishChallengeCopy({
    ...zadanie,
    title,
    goal,
  });
}

/**
 * Curated detail-localization for single zadanie view.
 * Precedence for `en`: curated catalog by id -> runtime fallback localization.
 */
export function getCuratedDetailLocalization(zadanie, locale = "pl") {
  if (!zadanie) return zadanie;
  if (locale !== "en") return zadanie;
  const curated = EN_DETAIL_BY_ID[zadanie.id];
  if (curated) {
    return ensureEnglishChallengeCopy({
      ...zadanie,
      title: curated.title,
      goal: curated.goal,
    });
  }
  return ensureEnglishChallengeCopy(localizeZadanieForLocale(zadanie, locale));
}

/** @param {string[]} completedIds - optional; if provided, each zadanie gets completed and unlocked. */
/** @param {string} [theme] - optional; filter by theme (polonia | wizards | urban_mom). */
/** @param {string} [locale] - optional; "pl" (default) or "en". */
export function listZadania(completedIds = [], theme, locale = "pl") {
  const list = theme ? ZADANIA.filter((z) => z.theme === theme) : ZADANIA;
  const ids = list.map((z) => z.id);
  return list.map((z, i) => {
    const localized = localizeZadanieForLocale(z, locale);
    return {
      id: z.id,
      theme: z.theme,
      title: localized.title,
      goal: localized.goal,
      stopien: z.stopien,
      reference: getFriendlyReference(z.reference),
      completed: completedIds.includes(z.id),
      unlocked: i === 0 || completedIds.includes(ids[i - 1]),
    };
  });
}

import { THEME_IDS } from "./themes.js";
/** All supported themes. @see TECHNICAL_SPEC §12 */
export const THEMES = THEME_IDS;
