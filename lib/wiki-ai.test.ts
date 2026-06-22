import { afterEach, describe, expect, it } from "vitest";
import { answerFromWiki } from "@/lib/wiki-ai";
import type { WikiEntry } from "@/lib/wiki";

const originalUrl = process.env.WIKI_LLM_API_URL;
const originalKey = process.env.WIKI_LLM_API_KEY;
const originalModel = process.env.WIKI_LLM_MODEL;

afterEach(() => {
  process.env.WIKI_LLM_API_URL = originalUrl;
  process.env.WIKI_LLM_API_KEY = originalKey;
  process.env.WIKI_LLM_MODEL = originalModel;
});

function entry(overrides: Partial<WikiEntry> = {}): WikiEntry {
  return {
    id: "entry-1",
    category: "Identidade e posicionamento",
    title: "Qual é a diferença da Shift?",
    content: "A Shift oferece acompanhamento próximo e treino personalizado.",
    sourceRole: "owner",
    status: "approved",
    updatedAt: "2026-06-10T00:00:00.000Z",
    ...overrides,
  };
}

describe("agente da Wiki Shift", () => {
  it("usa somente conteúdo aprovado na busca local", async () => {
    delete process.env.WIKI_LLM_API_URL;
    delete process.env.WIKI_LLM_API_KEY;
    delete process.env.WIKI_LLM_MODEL;

    const result = await answerFromWiki("Qual a diferença da Shift?", [
      entry(),
      entry({ id: "draft", status: "draft", content: "Conteúdo não aprovado." }),
    ]);

    expect(result.outcome).toBe("answered");
    expect(result.answer).toContain("acompanhamento próximo");
  });

  it("transfere quando a Wiki não contém a resposta", async () => {
    delete process.env.WIKI_LLM_API_URL;
    delete process.env.WIKI_LLM_API_KEY;
    delete process.env.WIKI_LLM_MODEL;

    const result = await answerFromWiki("Vocês têm estacionamento coberto?", [
      entry(),
    ]);

    expect(result.outcome).toBe("unanswered");
    expect(result.answer).toContain("encaminhar");
  });

  it("não usa rascunhos", async () => {
    const result = await answerFromWiki("Qual é o preço?", [
      entry({ status: "draft", title: "Preço", content: "R$ 1.000" }),
    ]);

    expect(result.outcome).toBe("unanswered");
    expect(result.answer).not.toContain("1.000");
  });
});

