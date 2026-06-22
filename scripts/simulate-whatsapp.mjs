#!/usr/bin/env node
// Simulador de conversa do WhatsApp da Shift — sem precisar de celular nem Evolution.
//
// Manda perguntas reais de quem chega no WhatsApp direto pro agente da Wiki
// (/api/wiki/agent) e imprime a conversa no terminal, com o "outcome" de cada
// resposta (answered / handoff / unanswered / error). Ótimo pra calibrar a Wiki
// e o tom antes de conectar um número de verdade.
//
// Pré-requisito: o Next app rodando (npm run dev), em http://localhost:3000.
//
// Uso:
//   node scripts/simulate-whatsapp.mjs                 # usa o roteiro padrão
//   node scripts/simulate-whatsapp.mjs "Quanto custa?" "Tem aula experimental?"
//   BASE_URL=http://localhost:3000 node scripts/simulate-whatsapp.mjs
//   node scripts/simulate-whatsapp.mjs --contact 5511999998888 --pause 1500

const args = process.argv.slice(2);

function takeOption(name, fallback) {
  const i = args.indexOf(name);
  if (i === -1) return fallback;
  const value = args[i + 1];
  args.splice(i, 2);
  return value ?? fallback;
}

const baseUrl = (takeOption("--base", process.env.BASE_URL) || "http://localhost:3000").replace(/\/$/, "");
const contactId = takeOption("--contact", "5511900000000");
const pauseMs = Number(takeOption("--pause", "1200"));

// Tudo que sobrar nos args (sem --flags) são perguntas customizadas.
const customQuestions = args.filter((arg) => !arg.startsWith("--"));

// Roteiro padrão: as dúvidas que mais chegam de quem está pesquisando academia.
const defaultScript = [
  "oi, vcs tão abertos agora?",
  "qual o valor do plano mensal?",
  "tem aula experimental? como faço pra marcar",
  "onde fica a academia? tem estacionamento?",
  "achei meio caro, a academia aqui perto é mais barata",
  "vcs tem acompanhamento com personal?",
  "tem fidelidade? não quero ficar preso num contrato",
  "minha filha tem 15 anos, ela pode treinar?",
];

const questions = customQuestions.length ? customQuestions : defaultScript;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const tag = {
  answered: "\x1b[32m[respondido]\x1b[0m",
  handoff: "\x1b[33m[transferência p/ humano]\x1b[0m",
  unanswered: "\x1b[31m[sem resposta na Wiki]\x1b[0m",
  error: "\x1b[31m[erro]\x1b[0m",
};

async function ask(message) {
  const response = await fetch(`${baseUrl}/api/wiki/agent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      contactId,
      channel: "whatsapp",
      metadata: { simulate: true, senderName: "Simulação" },
    }),
  });
  if (!response.ok) {
    return { answer: `(HTTP ${response.status})`, outcome: "error" };
  }
  return response.json();
}

console.log(`\n💬 Simulando conversa com ${baseUrl} (contato ${contactId})\n`);

let sawSeed = false;
for (const question of questions) {
  console.log(`🧑 Cliente: ${question}`);
  try {
    const result = await ask(question);
    if (result.seed) sawSeed = true;
    const label = tag[result.outcome] || "";
    // Mostra a resposta como ela cairia: cada parágrafo é um balão separado.
    const bubbles = String(result.answer || "").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
    bubbles.forEach((bubble, i) => {
      console.log(`🤖 Shift: ${bubble.replace(/\n/g, "\n          ")}${i === bubbles.length - 1 ? `  ${label}` : ""}`);
    });
  } catch (error) {
    console.log(`🤖 Shift: \x1b[31mfalhou ao conectar — o app está rodando em ${baseUrl}?\x1b[0m`);
    console.log(`          ${error.message}`);
    break;
  }
  console.log("");
  await sleep(pauseMs);
}

if (sawSeed) {
  console.log(
    "\x1b[33m⚠ Respostas vindas da Wiki semente (Base de atendimento em lib/wiki-seed.ts).\x1b[0m\n" +
      "  Preços/planos seguem sendo encaminhados à equipe. Pra produção, configure o Supabase\n" +
      "  (scripts/seed-wiki-atendimento.sql) e desligue WIKI_DEMO_SEED.\n",
  );
}
