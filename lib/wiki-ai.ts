import type { WikiEntry } from "@/lib/wiki";
import { buildAgentContext } from "@/lib/wiki";

const handoffMessage =
  "Quero te orientar com precisão. Vou encaminhar sua mensagem para uma pessoa da equipe Shift continuar o atendimento.";

export async function transcribeWikiAudio(file: File) {
  const url = process.env.WIKI_TRANSCRIPTION_API_URL;
  const key = process.env.WIKI_LLM_API_KEY;
  if (!url || !key) return "";

  const body = new FormData();
  body.set("file", file, file.name);
  body.set("model", process.env.WIKI_TRANSCRIPTION_MODEL || "whisper-1");
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body,
  });
  if (!response.ok) return "";
  const data = (await response.json()) as { text?: string };
  return data.text?.trim() ?? "";
}

function fallbackAnswer(question: string, entries: WikiEntry[]) {
  const words = question
    .toLocaleLowerCase("pt-BR")
    .split(/\W+/)
    .filter((word) => word.length > 3);
  const ranked = entries
    .map((entry) => ({
      entry,
      score: words.filter((word) =>
        `${entry.title} ${entry.content}`.toLocaleLowerCase("pt-BR").includes(word),
      ).length,
    }))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.score > 0 ? ranked[0].entry.content : handoffMessage;
}

export type ChatTurn = { role: "user" | "assistant"; content: string };

type AnswerOptions = {
  // Mensagens anteriores da conversa (pra LLM ter contexto e não repetir saudação).
  history?: ChatTurn[];
  // Como saudar: "intro" = número novo, se apresenta; "welcome" = já falou antes,
  // mas faz tempo; "none" = conversa em andamento, responde direto.
  greeting?: "intro" | "welcome" | "none";
};

export async function answerFromWiki(
  question: string,
  entries: WikiEntry[],
  options: AnswerOptions = {},
) {
  const { history = [], greeting = "intro" } = options;
  const approved = entries.filter((entry) => entry.status === "approved");
  if (!approved.length) {
    return { answer: handoffMessage, outcome: "unanswered" as const };
  }

  const url = process.env.WIKI_LLM_API_URL;
  const key = process.env.WIKI_LLM_API_KEY;
  const model = process.env.WIKI_LLM_MODEL;
  if (!url || !key || !model) {
    const answer = fallbackAnswer(question, approved);
    return {
      answer,
      outcome:
        answer === handoffMessage ? "unanswered" as const : "answered" as const,
    };
  }

  const greetingRule =
    greeting === "intro"
      ? `É o PRIMEIRO contato deste número. Comece se apresentando de forma educada e calorosa — diga que é da recepção da Shift Jundiaí e dê as boas-vindas. Em seguida, convide a pessoa a contar o que procura de um jeito acolhedor; quem conduz a conversa é você. NUNCA jogue a tarefa pra ela com frases como "me fala o que você precisa" ou "pode me falar o que precisa".`
      : greeting === "welcome"
        ? `Este número já falou com a Shift antes, mas faz um tempo. Cumprimente de forma breve e familiar (ex.: "Oi! Que bom falar com você de novo 😊"), sem se reapresentar, e siga ajudando.`
        : `A conversa já está em andamento: NÃO comece com saudação (nada de "Oi", "Olá", "Oi Fulano", "Bom dia"). Responda direto ao ponto, como numa conversa contínua de WhatsApp.`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: Number(process.env.WIKI_LLM_TEMPERATURE) || 0.5,
      messages: [
        {
          role: "system",
          content: `Você é uma pessoa da recepção da Shift Jundiaí atendendo no WhatsApp.
Escreva como gente de verdade conversa por mensagem, não como um robô:
- Mensagens curtas, no máximo 2 ou 3 frases. Linguagem leve e direta.
- Quando tiver duas ideias diferentes (ex.: responder + sugerir um próximo passo), separe-as com uma linha em branco — cada bloco vira uma mensagem.
- Nada de listas longas, textão nem jargão corporativo.
- Saudação: ${greetingRule}
- No máximo 1 emoji, e só quando combinar de verdade. Sem exageros.
Sobre sugerir aula experimental ou visita:
- Não ofereça agendar aula experimental ou visita logo de cara nem em toda resposta. Primeiro responda de verdade o que a pessoa perguntou.
- Só puxe esse próximo passo quando a pessoa demonstrar interesse real — ex.: pergunta sobre planos, valores ou horários pra treinar, diz que quer começar, quer conhecer ou pede pra marcar.
- Se for só uma dúvida pontual (endereço, horário, se aceita iniciante, estacionamento), responda e pare por aí. No máximo deixe a porta aberta de leve, sem insistir em marcar nada.
- Nunca repita o convite pra agendar se a pessoa ainda não respondeu ou não demonstrou interesse.
Quando perguntarem o endereço, onde fica ou como chegar, mande sempre o link da localização no Google Maps que está na Wiki, exatamente como está, pra pessoa só clicar e abrir a rota.
Use somente a Wiki aprovada abaixo. Nunca invente preços, horários, políticas ou disponibilidade.
Não ofereça diagnóstico médico, fisioterapêutico ou nutricional.
Quando a Wiki não contiver a resposta ou indicar transferência, responda exatamente: "${handoffMessage}"

WIKI APROVADA:
${buildAgentContext(approved)}`,
        },
        ...history.map((turn) => ({ role: turn.role, content: turn.content })),
        { role: "user", content: question },
      ],
    }),
  });

  if (!response.ok) {
    return { answer: handoffMessage, outcome: "error" as const };
  }
  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const answer = data.choices?.[0]?.message?.content?.trim() || handoffMessage;
  return {
    answer,
    outcome: answer.includes("encaminhar sua mensagem")
      ? "handoff" as const
      : "answered" as const,
  };
}

