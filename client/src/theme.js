const THEME_STORAGE_KEY = "cech_theme";
const DEFAULT_THEME = "polonia";
const VALID_THEMES = new Set(["polonia", "wizards", "urban_mom"]);

export function normalizeTheme(theme) {
  if (!theme || !VALID_THEMES.has(theme)) return DEFAULT_THEME;
  return theme;
}

export function applyTheme(theme) {
  const nextTheme = normalizeTheme(theme);
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  return nextTheme;
}

export function applyInitialTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return applyTheme(storedTheme || DEFAULT_THEME);
}
