import { useState, useRef } from "react";

/**
 * Chat UI for Mistrz. Sends message + context; streams reply via SSE.
 */
export function MistrzChat({ context, disabled }) {
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

    try {
      const res = await fetch("/api/mistrz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, context }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Błąd Mistrza.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const raw = line.slice(6);
            if (raw === "[DONE]") continue;
            try {
              const data = JSON.parse(raw);
              if (data.error) {
                setStreamError(data.error);
                continue;
              }
              if (data.content) {
                full += data.content;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: full } : m
                  )
                );
              }
            } catch (_) {}
          }
        }
      }
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      setStreamError(err.message || "Błąd połączenia.");
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: "(Nie udało się pobrać odpowiedzi.)" } : m
        )
      );
    } finally {
      setStreaming(false);
    }
  }

  return (
    <section className="mistrz-chat">
      <h2>Zapytaj Mistrza</h2>
      <div className="mistrz-messages">
        {messages.length === 0 && (
          <p className="mistrz-hint">Zadaj pytanie lub kliknij „Podpowiedź”.</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`mistrz-msg mistrz-${m.role}`}>
            {m.role === "user" ? "Ty: " : "Mistrz: "}
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
          placeholder="Napisz do Mistrza…"
          disabled={disabled}
        />
        <button type="button" onClick={() => sendMessage()} disabled={streaming || disabled}>
          Wyślij
        </button>
        <button
          type="button"
          onClick={() => sendMessage("Daj mi podpowiedź.")}
          disabled={streaming || disabled}
          className="mistrz-hint-btn"
        >
          Podpowiedź
        </button>
      </div>
    </section>
  );
}
