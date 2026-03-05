import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";

export function signToken(payload, options = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d", ...options });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
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
  req.user = payload;
  next();
}

export function optionalAuth(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (token) {
    const payload = verifyToken(token);
    if (payload) req.user = payload;
  }
  next();
}
