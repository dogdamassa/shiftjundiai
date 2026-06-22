"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type Bubble = { role: "user" | "bot"; text: string };

// Mesmo ritmo do envio real (lib/whatsapp.ts), só que aqui dá pra ver na tela:
// tempo de "digitando" proporcional ao texto, com variação, pra parecer humano.
function typingDelay(text: string) {
  const base = Math.min(3500, Math.max(700, text.length * 45));
  return Math.round(base * (0.8 + Math.random() * 0.4));
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const sugestoes = [
  "qual o valor do plano?",
  "tem aula experimental?",
  "onde fica? tem estacionamento?",
  "achei caro",
  "tem fidelidade?",
];

export function WikiChatTest() {
  // Começa vazio de propósito: assim o agente dá a própria saudação de primeiro
  // contato (como num número novo no WhatsApp), em vez de um "Oi" pré-fabricado.
  const [messages, setMessages] = useState<Bubble[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    setBusy(true);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);

    try {
      const response = await fetch("/api/wiki/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          contactId: "teste-web",
          channel: "web",
          // Histórico da sessão pra LLM ter contexto e não repetir saudação.
          history: messages
            .slice(-10)
            .map((m) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text })),
          metadata: { simulate: true },
        }),
      });
      const data = (await response.json()) as { answer?: string };
      const bubbles = String(data.answer || "")
        .split(/\n{2,}/)
        .map((b) => b.trim())
        .filter(Boolean);

      for (const bubble of bubbles) {
        setTyping(true);
        await sleep(typingDelay(bubble));
        setTyping(false);
        setMessages((prev) => [...prev, { role: "bot", text: bubble }]);
        await sleep(350 + Math.random() * 500);
      }
    } catch {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "(erro de conexão — o app está rodando?)" },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={styles.shell}>
      <div style={styles.phone}>
        <header style={styles.header}>
          <div style={styles.avatar}>S</div>
          <div>
            <div style={styles.headerName}>Shift Jundiaí</div>
            <div style={styles.headerStatus}>{typing ? "digitando…" : "online"}</div>
          </div>
        </header>

        <div style={styles.chat}>
          {messages.length === 0 && !typing && (
            <div style={styles.empty}>
              Mande a primeira mensagem como um cliente novo — o agente vai se apresentar.
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...styles.bubble,
                ...(m.role === "user" ? styles.bubbleUser : styles.bubbleBot),
              }}
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div style={{ ...styles.bubble, ...styles.bubbleBot, ...styles.typing }}>
              <span style={styles.dot} />
              <span style={{ ...styles.dot, animationDelay: "0.2s" }} />
              <span style={{ ...styles.dot, animationDelay: "0.4s" }} />
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div style={styles.suggestions}>
          {sugestoes.map((s) => (
            <button key={s} type="button" style={styles.chip} onClick={() => send(s)} disabled={busy}>
              {s}
            </button>
          ))}
        </div>

        <form
          style={styles.inputRow}
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            style={styles.input}
            value={input}
            placeholder="Escreva como um cliente…"
            onChange={(e) => setInput(e.target.value)}
            disabled={busy}
          />
          <button type="submit" style={styles.sendBtn} disabled={busy || !input.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>

      <p style={styles.note}>
        Teste interno · respostas vêm da Wiki semente (dados de exemplo). Conecte o WhatsApp pra valer no
        número real.
      </p>

      <style>{`@keyframes blink { 0%,80%,100%{opacity:.3} 40%{opacity:1} }`}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    padding: 24,
    background:
      "radial-gradient(circle at 80% 0%, rgba(255,106,0,0.16), transparent 32%), #0b0c0d",
    fontFamily: '"Space Grotesk", sans-serif',
  },
  phone: {
    width: "min(440px, 100%)",
    height: "min(720px, 86vh)",
    display: "flex",
    flexDirection: "column",
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
    background: "#1f2c33",
    color: "#f7f5f2",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#ff6a00",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    color: "#0b0c0d",
  },
  headerName: { fontWeight: 700, fontSize: 15 },
  headerStatus: { fontSize: 12, color: "#9fd3a7" },
  chat: {
    flex: 1,
    overflowY: "auto",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    background: "#0b141a",
  },
  bubble: {
    maxWidth: "78%",
    padding: "8px 12px",
    borderRadius: 12,
    fontSize: 14,
    lineHeight: 1.4,
    color: "#e9edef",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  empty: { margin: "auto", maxWidth: 260, textAlign: "center", fontSize: 13, lineHeight: 1.5, color: "#6b7280" },
  bubbleBot: { alignSelf: "flex-start", background: "#202c33", borderTopLeftRadius: 2 },
  bubbleUser: { alignSelf: "flex-end", background: "#005c4b", borderTopRightRadius: 2 },
  typing: { display: "flex", gap: 4, alignItems: "center", padding: "12px 14px" },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#9fa3a7",
    display: "inline-block",
    animation: "blink 1.2s infinite",
  },
  suggestions: { display: "flex", gap: 6, flexWrap: "wrap", padding: "8px 12px", background: "#111b21" },
  chip: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "transparent",
    color: "#cfd4d8",
    cursor: "pointer",
  },
  inputRow: { display: "flex", gap: 8, padding: 12, background: "#1f2c33" },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 999,
    border: "none",
    outline: "none",
    background: "#2a3942",
    color: "#e9edef",
    fontSize: 14,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "none",
    background: "#ff6a00",
    color: "#0b0c0d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  note: { color: "#9fa3a7", fontSize: 12, textAlign: "center", maxWidth: 440 },
};
