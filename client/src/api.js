const TOKEN_KEY = "cech_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function apiFetch(url, options = {}) {
  const token = getToken();
  const headers = { ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(url, { ...options, headers });
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
  return apiFetch("/api/teacher/students").then((r) => {
    if (!r.ok) throw new Error("Forbidden or error");
    return r.json();
  });
}
