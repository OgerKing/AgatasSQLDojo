import { Router } from "express";
import OpenAI from "openai";
import { buildSystemPrompt, buildContextBlock } from "../mistrz/systemPrompt.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
export const mistrzRouter = Router();

mistrzRouter.post("/", async (req, res) => {
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
  const lang = locale === "en" ? "en" : "pl";
  const systemPrompt = buildSystemPrompt(lang) + buildContextBlock(context || {}, lang);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  try {
    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message.trim() },
      ],
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
    console.error("Mistrz error:", err.message);
    res.write(`data: ${JSON.stringify({ errorCode: "MASTER_ERROR", error: err.message || "Błąd Mistrza." })}\n\n`);
  } finally {
    res.end();
  }
});
