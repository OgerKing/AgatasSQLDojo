import jwt from "jsonwebtoken";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is required. Set it in your environment before starting the server.");
  }
  return secret;
}

export function signToken(payload, options = {}) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d", ...options });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, getJwtSecret());
  } catch {
    return null;
  }
}

export function signCompletionToken(payload, options = {}) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "10m",
    ...options,
  });
}

export function verifyCompletionToken(token) {
  try {
    const payload = jwt.verify(token, getJwtSecret());
    if (payload?.type !== "zadanie_completion") return null;
    return payload;
  } catch {
    return null;
  }
}

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: true, code: "UNAUTHORIZED", message: "Brak tokenu." });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: true, code: "UNAUTHORIZED", message: "Nieprawidłowy lub wygasły token." });
  }
  req.user = { ...payload, id: payload.id ?? payload.sub };
  if (!req.user.id) {
    return res.status(401).json({ error: true, code: "UNAUTHORIZED", message: "Nieprawidłowy token użytkownika." });
  }
  next();
}

export function optionalAuth(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      const id = payload.id ?? payload.sub;
      if (id) req.user = { ...payload, id };
    }
  }
  next();
}
