const buckets = new Map();

/**
 * In-memory fixed-window rate limit.
 * Suitable for single-instance dev/small deployments.
 */
export function rateLimit({ windowMs, max, keyFn }) {
  return (req, res, next) => {
    const key = keyFn(req);
    const now = Date.now();
    const current = buckets.get(key);

    if (!current || now >= current.resetAt) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (current.count >= max) {
      const retryAfterSec = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
      res.setHeader("Retry-After", String(retryAfterSec));
      return res.status(429).json({
        error: true,
        code: "RATE_LIMITED",
        message: "Za dużo żądań. Spróbuj ponownie za chwilę.",
      });
    }

    current.count += 1;
    next();
  };
}
