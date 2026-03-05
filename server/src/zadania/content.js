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

/** @param {string[]} completedIds - optional; if provided, each zadanie gets completed and unlocked. */
/** @param {string} [theme] - optional; filter by theme (polonia | wizards | urban_mom). */
export function listZadania(completedIds = [], theme) {
  const list = theme ? ZADANIA.filter((z) => z.theme === theme) : ZADANIA;
  const ids = list.map((z) => z.id);
  return list.map((z, i) => ({
    id: z.id,
    theme: z.theme,
    title: z.title,
    goal: z.goal,
    stopien: z.stopien,
    reference: z.reference ?? null,
    completed: completedIds.includes(z.id),
    unlocked: i === 0 || completedIds.includes(ids[i - 1]),
  }));
}

import { THEME_IDS } from "./themes.js";
/** All supported themes. @see TECHNICAL_SPEC §12 */
export const THEMES = THEME_IDS;
