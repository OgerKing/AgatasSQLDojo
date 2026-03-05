import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { apiFetch, API_BASE } from "../api";

/**
 * Chat UI for Mistrz. Sends message + context + locale; streams reply via SSE.
 */
export function MistrzChat({ context, disabled }) {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamError, setStreamError] = useState("");
  const bottomRef = useRef(null);

  async function sendMessage(text) {
    const msg = (text || input).trim();
    if (!msg || streaming) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setStreaming(true);
    setStreamError("");

    const assistantId = Date.now();
    setMessages((prev) => [...prev, { role: "assistant", content: "", id: assistantId }]);

    const locale = i18n.language?.startsWith("en") ? "en" : "pl";
    try {
      const res = await apiFetch(API_BASE + "/mistrz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, context, locale }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data.code === "MASTER_UNAVAILABLE"
          ? t("errors.masterUnavailable")
          : data.code === "NEED_MESSAGE"
          ? t("errors.needMessage")
          : (data.message || t("mistrz.error"));
        throw new Error(msg);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let full = "";

      function consumeEvent(rawEvent) {
        const dataLines = rawEvent
          .split("\n")
          .filter((line) => line.startsWith("data:"))
          .map((line) => line.slice(5).trimStart());
        if (!dataLines.length) return;
        const raw = dataLines.join("\n");
        if (raw === "[DONE]") return;
        try {
          const data = JSON.parse(raw);
          if (data.error || data.errorCode) {
            setStreamError(data.errorCode ? t("mistrz.error") : data.error);
            return;
          }
          if (data.content) {
            full += data.content;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: full } : m
              )
            );
          }
        } catch (parseErr) {
          // Ignore malformed partial SSE payloads; stream continues.
          void parseErr;
        }
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          buffer += decoder.decode();
          break;
        }
        buffer += decoder.decode(value, { stream: true });
        let boundary = buffer.indexOf("\n\n");
        while (boundary !== -1) {
          const rawEvent = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);
          consumeEvent(rawEvent);
          boundary = buffer.indexOf("\n\n");
        }
      }
      if (buffer.trim()) consumeEvent(buffer.trim());
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      setStreamError(err.message || t("mistrz.errorConnection"));
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: t("mistrz.errorNoResponse") } : m
        )
      );
    } finally {
      setStreaming(false);
    }
  }

  return (
    <section className="mistrz-chat" aria-labelledby="mistrz-title">
      <h2 id="mistrz-title">{t("mistrz.title")}</h2>
      <div className="mistrz-messages">
        {messages.length === 0 && (
          <p className="mistrz-hint">{t("mistrz.hint")}</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`mistrz-msg mistrz-${m.role}`}>
            {m.role === "user" ? `${t("mistrz.you")}: ` : `${t("mistrz.mistrz")}: `}
            {m.content || (m.role === "assistant" && streaming ? "…" : "")}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      {streamError && <p className="mistrz-error">{streamError}</p>}
      <div className="mistrz-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder={t("mistrz.placeholder")}
          disabled={disabled}
          aria-label={t("mistrz.placeholder")}
        />
        <button type="button" onClick={() => sendMessage()} disabled={streaming || disabled}>
          {t("mistrz.send")}
        </button>
        <button
          type="button"
          onClick={() => sendMessage(t("mistrz.hintMessage"))}
          disabled={streaming || disabled}
          className="mistrz-hint-btn"
        >
          {t("mistrz.hintButton")}
        </button>
      </div>
    </section>
  );
}
