const TOKEN_KEY = "cech_token";

/** API base path; use v1 for versioned contract. @see TECHNICAL_SPEC §5 */
export const API_BASE = "/api/v1";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

function toApiUrl(url) {
  if (url.startsWith(API_BASE) || url.startsWith("http")) return url;
  return url.replace(/^\/api\//, API_BASE + "/");
}

export function apiFetch(url, options = {}) {
  const token = getToken();
  const headers = { ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(toApiUrl(url), { ...options, headers });
}

export function isLoggedIn() {
  return !!getToken();
}

/** Decode JWT payload (no verify; for role only). */
export function getStoredUser() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { id: payload.sub, role: payload.role };
  } catch {
    return null;
  }
}

export function getTeacherStudents() {
  return apiFetch(API_BASE + "/teacher/students").then((r) => {
    if (!r.ok) throw new Error("Forbidden or error");
    return r.json();
  });
}
