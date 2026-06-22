import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { answerFromWiki, type ChatTurn } from "@/lib/wiki-ai";
import { seedWikiEntries } from "@/lib/wiki-seed";
import type { WikiEntry } from "@/lib/wiki";

type GreetingMode = "intro" | "welcome" | "none";

// Após esse tempo sem mensagem, um número que já falou antes é recebido com um
// "oi" familiar (welcome); antes disso, a conversa segue direto, sem saudação.
const GREETING_GAP_MS = 6 * 60 * 60 * 1000;

// Quando o cliente gerencia o próprio histórico (ex.: chat de teste): se o
// agente ainda não disse nada, é primeiro contato (intro); senão, segue direto.
function greetingFromHistory(history: ChatTurn[]): GreetingMode {
  return history.some((turn) => turn.role === "assistant") ? "none" : "intro";
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    message?: string;
    contactId?: string;
    channel?: string;
    metadata?: Record<string, unknown>;
    history?: ChatTurn[];
  };
  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json({ error: "Mensagem não informada." }, { status: 400 });
  }

  // Se o cliente mandou a chave `history`, ele gerencia o histórico da sessão.
  const clientManagesHistory = Array.isArray(body.history);
  const clientHistory = (body.history ?? [])
    .filter((turn) => turn && turn.content && (turn.role === "user" || turn.role === "assistant"))
    .slice(-10);

  if (!hasSupabaseEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // Sem Supabase: se o modo demo estiver ligado, responde com a Wiki semente
    // (dados de exemplo) pra dar pra simular e testar o agente mesmo assim.
    if (process.env.WIKI_DEMO_SEED === "true") {
      const result = await answerFromWiki(message, seedWikiEntries, {
        history: clientHistory,
        greeting: greetingFromHistory(clientHistory),
      });
      return NextResponse.json({ ...result, demo: true, seed: true });
    }
    return NextResponse.json({
      answer: "O agente ainda está em configuração. Vou encaminhar sua mensagem para a equipe Shift.",
      outcome: "handoff",
      demo: true,
    });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("wiki_entries")
    .select("*")
    .eq("status", "approved");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const entries: WikiEntry[] = (data ?? []).map((entry) => ({
    id: entry.id,
    category: entry.category,
    title: entry.title,
    content: entry.content,
    sourceRole: entry.source_role,
    sourceInterviewId: entry.source_interview_id,
    status: entry.status,
    approvedAt: entry.approved_at,
    updatedAt: entry.updated_at,
  }));

  // Decide a saudação e monta o contexto da conversa.
  let history = clientHistory;
  let greeting: GreetingMode;
  if (clientManagesHistory) {
    // Chat de teste: o histórico da sessão diz se é primeiro contato ou não.
    greeting = greetingFromHistory(clientHistory);
  } else if (body.contactId) {
    // WhatsApp: olha o log de eventos deste número (novo, retornando ou em andamento).
    const { data: events } = await supabase
      .from("wiki_agent_events")
      .select("question,answer,created_at")
      .eq("contact_id", body.contactId)
      .order("created_at", { ascending: false })
      .limit(6);
    if (events && events.length) {
      const lastAt = new Date(events[0].created_at as string).getTime();
      const longGap = Number.isFinite(lastAt) && Date.now() - lastAt > GREETING_GAP_MS;
      greeting = longGap ? "welcome" : "none";
      history = events
        .slice()
        .reverse()
        .flatMap((e) => {
          const turns: ChatTurn[] = [];
          if (e.question) turns.push({ role: "user", content: e.question as string });
          if (e.answer) turns.push({ role: "assistant", content: e.answer as string });
          return turns;
        });
    } else {
      greeting = "intro";
    }
  } else {
    greeting = "intro";
  }

  const result = await answerFromWiki(message, entries, { history, greeting });

  await supabase.from("wiki_agent_events").insert({
    channel: body.channel ?? "whatsapp",
    contact_id: body.contactId,
    question: message,
    answer: result.answer,
    outcome: result.outcome,
    metadata: body.metadata ?? {},
  });
  return NextResponse.json(result);
}
