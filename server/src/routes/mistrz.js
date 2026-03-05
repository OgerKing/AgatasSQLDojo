import { Router } from "express";
import OpenAI from "openai";
import { buildSystemPrompt, buildContextBlock } from "../mistrz/systemPrompt.js";
import { requireAuth } from "../middleware/auth.js";
import { rateLimit } from "../middleware/rateLimit.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
export const mistrzRouter = Router();
const MAX_MESSAGE_LENGTH = 2000;
const MAX_CONTEXT_TOTAL_CHARS = 12000;
const CONTEXT_LIMITS = {
  goal: 500,
  concept: 500,
  schema: 4000,
  last_query: 2000,
  db_response: 2000,
};

function clipText(value, maxLen) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.length > maxLen ? trimmed.slice(0, maxLen) : trimmed;
}

function safeJsonStringify(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return "[unserializable]";
  }
}

function sanitizeContext(rawContext) {
  if (!rawContext || typeof rawContext !== "object" || Array.isArray(rawContext)) return {};
  const out = {};
  out.goal = clipText(rawContext.goal, CONTEXT_LIMITS.goal);
  out.concept = clipText(rawContext.concept, CONTEXT_LIMITS.concept);
  out.schema = clipText(rawContext.schema, CONTEXT_LIMITS.schema);
  out.last_query = clipText(rawContext.last_query, CONTEXT_LIMITS.last_query);
  if (rawContext.db_response != null) {
    const dbText =
      typeof rawContext.db_response === "string"
        ? rawContext.db_response
        : safeJsonStringify(rawContext.db_response);
    out.db_response = clipText(dbText, CONTEXT_LIMITS.db_response);
  }
  if (rawContext.attempt_count != null) {
    const parsed = Number(rawContext.attempt_count);
    if (Number.isFinite(parsed)) {
      out.attempt_count = Math.max(0, Math.min(99, Math.floor(parsed)));
    }
  }
  return out;
}

mistrzRouter.use(requireAuth);
mistrzRouter.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 20,
    keyFn: (req) => `mistrz:${req.user?.id ?? req.ip}`,
  })
);

mistrzRouter.post("/", async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ error: true, code: "FORBIDDEN", message: "Tylko dla ucznia." });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: true,
      code: "MASTER_UNAVAILABLE",
      message: "Mistrz jest niedostępny (brak konfiguracji).",
    });
  }

  const { message, context, locale } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({
      error: true,
      code: "NEED_MESSAGE",
      message: "Potrzebne: message (tekst od ucznia).",
    });
  }
  const userMessage = message.trim();
  if (!userMessage) {
    return res.status(400).json({
      error: true,
      code: "NEED_MESSAGE",
      message: "Potrzebne: message (tekst od ucznia).",
    });
  }
  if (userMessage.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      error: true,
      code: "MESSAGE_TOO_LONG",
      message: "Wiadomość jest za długa.",
    });
  }
  const sanitizedContext = sanitizeContext(context);
  const contextSize = safeJsonStringify(sanitizedContext).length;
  if (contextSize > MAX_CONTEXT_TOTAL_CHARS) {
    return res.status(400).json({
      error: true,
      code: "CONTEXT_TOO_LARGE",
      message: "Kontekst jest za duży.",
    });
  }
  const lang = typeof locale === "string" && locale.toLowerCase().startsWith("en") ? "en" : "pl";
  const systemPrompt = buildSystemPrompt(lang) + buildContextBlock(sanitizedContext, lang);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  try {
    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.3,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
        res.flush?.();
      }
    }
    res.write("data: [DONE]\n\n");
  } catch (err) {
    console.error("Mistrz error", {
      message: err?.message,
      name: err?.name,
      status: err?.status,
    });
    res.write(`data: ${JSON.stringify({ errorCode: "MASTER_ERROR", error: "Błąd Mistrza." })}\n\n`);
  } finally {
    res.end();
  }
});
