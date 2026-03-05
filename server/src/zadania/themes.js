/**
 * Theme config: rank labels and tutor name per theme. XP and level are global; labels are theme-specific.
 * @see TECHNICAL_SPEC §12
 */
export const THEME_CONFIG = {
  polonia: {
    rankLabels: { uczen: "Uczeń", czeladnik: "Czeladnik", mistrz: "Mistrz" },
    tutorName: "Mistrz",
  },
  wizards: {
    rankLabels: { uczen: "Apprentice", czeladnik: "Adept", mistrz: "Master" },
    tutorName: "Professor",
  },
  urban_mom: {
    rankLabels: { uczen: "Opiekun", czeladnik: "Kapitan", mistrz: "Szef" },
    tutorName: "Kapitan",
  },
};

export const THEME_IDS = Object.keys(THEME_CONFIG);
