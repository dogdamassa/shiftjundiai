export type IncomingWhatsAppMessage = {
  contactId: string;
  message: string;
  senderName?: string;
  provider: "evolution" | "meta" | "direct";
};

type Payload = Record<string, unknown>;

function asRecord(value: unknown): Payload | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Payload)
    : undefined;
}

function evolutionMessageText(message: Payload | undefined): string | undefined {
  if (!message) return undefined;
  if (typeof message.conversation === "string") return message.conversation;
  const extended = asRecord(message.extendedTextMessage);
  if (typeof extended?.text === "string") return extended.text;
  return undefined;
}

function parseEvolution(payload: Payload): IncomingWhatsAppMessage | null {
  if (payload.event !== "messages.upsert") return null;
  const data = asRecord(payload.data);
  const key = asRecord(data?.key);
  const remoteJid = typeof key?.remoteJid === "string" ? key.remoteJid : "";
  if (!remoteJid) return null;
  // Só conversas individuais: nada de grupos, status ou mensagens enviadas por nós.
  if (key?.fromMe === true) return null;
  if (!remoteJid.endsWith("@s.whatsapp.net")) return null;
  const message = evolutionMessageText(asRecord(data?.message));
  if (!message?.trim()) return null;
  return {
    contactId: remoteJid.replace("@s.whatsapp.net", ""),
    message: message.trim(),
    senderName: typeof data?.pushName === "string" ? data.pushName : undefined,
    provider: "evolution",
  };
}

function parseMeta(payload: Payload): IncomingWhatsAppMessage | null {
  const entry = (payload.entry as Array<Payload> | undefined)?.[0];
  const changes = entry?.changes as Array<Payload> | undefined;
  const value = asRecord(changes?.[0]?.value);
  const firstMessage = (value?.messages as Array<Payload> | undefined)?.[0];
  const text = asRecord(firstMessage?.text);
  const message = typeof text?.body === "string" ? text.body : undefined;
  const contactId = typeof firstMessage?.from === "string" ? firstMessage.from : undefined;
  if (!message?.trim() || !contactId) return null;
  return { contactId, message: message.trim(), provider: "meta" };
}

function parseDirect(payload: Payload): IncomingWhatsAppMessage | null {
  const message = typeof payload.message === "string" ? payload.message : undefined;
  const contactId = typeof payload.contactId === "string" ? payload.contactId : undefined;
  if (!message?.trim() || !contactId) return null;
  return { contactId, message: message.trim(), provider: "direct" };
}

export function parseIncomingWhatsApp(payload: Payload): IncomingWhatsAppMessage | null {
  return parseDirect(payload) ?? parseEvolution(payload) ?? parseMeta(payload);
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// Limita o número de balões; o excedente vai junto no último.
function capBubbles(parts: string[], maxBubbles: number): string[] {
  if (parts.length <= maxBubbles) return parts;
  return [...parts.slice(0, maxBubbles - 1), parts.slice(maxBubbles - 1).join("\n")];
}

// Quebra a resposta em vários balões, como uma pessoa manda no WhatsApp:
// ideias separadas viram mensagens separadas em vez de um textão só.
export function splitIntoBubbles(text: string, maxBubbles = 4): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  // 1) Respeita as quebras do agente (linha em branco): cada parágrafo é um balão.
  const paragraphs = trimmed.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
  if (paragraphs.length > 1) return capBubbles(paragraphs, maxBubbles);

  // 2) Bloco único e curto: fica num balão só.
  if (trimmed.length <= 160) return [trimmed];

  // 3) Bloco único e longo: quebra por frases e junta fragmentos curtos demais.
  const sentences = trimmed.split(/(?<=[.!?…])\s+/).map((part) => part.trim()).filter(Boolean);
  const merged: string[] = [];
  for (const sentence of sentences) {
    const last = merged[merged.length - 1];
    if (last && (last.length < 40 || sentence.length < 25)) {
      merged[merged.length - 1] = `${last} ${sentence}`;
    } else {
      merged.push(sentence);
    }
  }
  return capBubbles(merged, maxBubbles);
}

// Tempo de "digitando" proporcional ao tamanho do texto, com variação aleatória,
// limitado por um mínimo e um máximo pra nunca ficar instantâneo nem eterno.
function typingDelay(text: string): number {
  const perChar = Number(process.env.WHATSAPP_TYPING_MS_PER_CHAR) || 55;
  const min = Number(process.env.WHATSAPP_TYPING_MIN_MS) || 900;
  const max = Number(process.env.WHATSAPP_TYPING_MAX_MS) || 5000;
  const base = Math.min(max, Math.max(min, text.length * perChar));
  const jitter = 0.8 + Math.random() * 0.4; // ±20% pra cada mensagem ter ritmo próprio
  return Math.round(base * jitter);
}

export async function sendWhatsAppMessage(to: string, text: string): Promise<boolean> {
  const evolutionUrl = process.env.EVOLUTION_API_URL;
  const evolutionKey = process.env.EVOLUTION_API_KEY;
  const evolutionInstance = process.env.EVOLUTION_INSTANCE;
  if (evolutionUrl && evolutionKey && evolutionInstance) {
    const endpoint = `${evolutionUrl.replace(/\/$/, "")}/message/sendText/${evolutionInstance}`;
    const bubbles = splitIntoBubbles(text);
    let ok = true;
    for (let i = 0; i < bubbles.length; i += 1) {
      const bubble = bubbles[i];
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: evolutionKey },
        // delay = tempo mostrando "digitando..." antes desta mensagem cair.
        body: JSON.stringify({ number: to, text: bubble, delay: typingDelay(bubble) }),
      });
      ok = ok && response.ok;
      // Pausa curta entre um balão e outro, como quem respira entre mensagens.
      if (i < bubbles.length - 1) await sleep(400 + Math.floor(Math.random() * 700));
    }
    return ok;
  }

  const sendUrl = process.env.WHATSAPP_SEND_URL;
  if (!sendUrl) return false;
  const response = await fetch(sendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.WHATSAPP_ACCESS_TOKEN
        ? { Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({ to, text }),
  });
  return response.ok;
}
