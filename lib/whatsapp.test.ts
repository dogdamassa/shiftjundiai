import { describe, expect, it } from "vitest";
import { parseIncomingWhatsApp, splitIntoBubbles } from "@/lib/whatsapp";

function evolutionPayload(overrides: {
  remoteJid?: string;
  fromMe?: boolean;
  message?: Record<string, unknown>;
  event?: string;
} = {}) {
  return {
    event: overrides.event ?? "messages.upsert",
    instance: "shift",
    data: {
      key: {
        remoteJid: overrides.remoteJid ?? "5511999999999@s.whatsapp.net",
        fromMe: overrides.fromMe ?? false,
        id: "ABC123",
      },
      pushName: "Cliente Teste",
      message: overrides.message ?? { conversation: "Qual o horário de funcionamento?" },
    },
  };
}

describe("parser de mensagens do WhatsApp", () => {
  it("lê mensagem da Evolution API", () => {
    const result = parseIncomingWhatsApp(evolutionPayload());
    expect(result).toEqual({
      contactId: "5511999999999",
      message: "Qual o horário de funcionamento?",
      senderName: "Cliente Teste",
      provider: "evolution",
    });
  });

  it("lê extendedTextMessage da Evolution API", () => {
    const result = parseIncomingWhatsApp(
      evolutionPayload({ message: { extendedTextMessage: { text: "Quanto custa?" } } }),
    );
    expect(result?.message).toBe("Quanto custa?");
  });

  it("ignora mensagens enviadas pela própria Shift", () => {
    expect(parseIncomingWhatsApp(evolutionPayload({ fromMe: true }))).toBeNull();
  });

  it("ignora mensagens de grupo", () => {
    expect(
      parseIncomingWhatsApp(evolutionPayload({ remoteJid: "123456789@g.us" })),
    ).toBeNull();
  });

  it("ignora status broadcast", () => {
    expect(
      parseIncomingWhatsApp(evolutionPayload({ remoteJid: "status@broadcast" })),
    ).toBeNull();
  });

  it("ignora eventos que não são mensagem", () => {
    expect(parseIncomingWhatsApp(evolutionPayload({ event: "connection.update" }))).toBeNull();
  });

  it("ignora mensagens sem texto, como áudio e imagem", () => {
    expect(
      parseIncomingWhatsApp(evolutionPayload({ message: { audioMessage: { seconds: 10 } } })),
    ).toBeNull();
  });

  it("lê o formato da Meta Cloud API", () => {
    const result = parseIncomingWhatsApp({
      entry: [
        {
          changes: [
            {
              value: {
                messages: [{ from: "5511988887777", text: { body: "Tem aula experimental?" } }],
              },
            },
          ],
        },
      ],
    });
    expect(result).toEqual({
      contactId: "5511988887777",
      message: "Tem aula experimental?",
      provider: "meta",
    });
  });

  it("lê o formato direto", () => {
    const result = parseIncomingWhatsApp({
      contactId: "5511977776666",
      message: "Qual é a diferença da Shift?",
    });
    expect(result?.provider).toBe("direct");
  });
});

describe("quebra em balões (envio humano)", () => {
  it("mantém mensagem curta num balão só", () => {
    expect(splitIntoBubbles("Estamos abertos sim! 💪")).toEqual(["Estamos abertos sim! 💪"]);
  });

  it("transforma parágrafos separados por linha em branco em balões", () => {
    expect(splitIntoBubbles("O plano mensal é R$ 159.\n\nQuer marcar uma experimental?")).toEqual([
      "O plano mensal é R$ 159.",
      "Quer marcar uma experimental?",
    ]);
  });

  it("quebra um textão longo em frases", () => {
    const bubbles = splitIntoBubbles(
      "Temos musculação, cross e aulas coletivas todas incluídas no plano. " +
        "Funcionamos de segunda a sexta das 6h às 22h e no sábado pela manhã. " +
        "A primeira aula experimental é totalmente gratuita, é só aparecer.",
    );
    expect(bubbles.length).toBeGreaterThan(1);
  });

  it("nunca passa do limite de balões", () => {
    const texto = Array.from({ length: 8 }, (_, i) => `Ideia número ${i} bem completa aqui.`).join("\n\n");
    expect(splitIntoBubbles(texto).length).toBeLessThanOrEqual(4);
  });
});
