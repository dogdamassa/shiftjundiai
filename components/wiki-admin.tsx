"use client";

import { BookOpenCheck, Check, FileText, MessageCircleQuestion, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

type InterviewRow = {
  id: string;
  respondent_name: string;
  respondent_role: "owner" | "leader";
  respondent_title: string;
  status: string;
  answers: Array<{ question: string; text: string; audioUrl?: string }>;
  submitted_at: string;
};

type EntryRow = {
  id: string;
  category: string;
  title: string;
  content: string;
  source_role: "owner" | "leader";
  status: "draft" | "approved" | "archived";
};

type EventRow = {
  id: string;
  question: string;
  answer?: string;
  outcome: string;
  created_at: string;
};

export function WikiAdmin() {
  const [interviews, setInterviews] = useState<InterviewRow[]>([]);
  const [entries, setEntries] = useState<EntryRow[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>();

  async function load() {
    setLoading(true);
    const response = await fetch("/api/wiki/admin");
    const data = (await response.json()) as {
      interviews?: InterviewRow[];
      entries?: EntryRow[];
      events?: EventRow[];
      error?: string;
    };
    setInterviews(data.interviews ?? []);
    setEntries(data.entries ?? []);
    setEvents(data.events ?? []);
    setMessage(data.error);
    setLoading(false);
  }

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/wiki/admin", { signal: controller.signal })
      .then((response) => response.json())
      .then((data: {
        interviews?: InterviewRow[];
        entries?: EntryRow[];
        events?: EventRow[];
        error?: string;
      }) => {
        setInterviews(data.interviews ?? []);
        setEntries(data.entries ?? []);
        setEvents(data.events ?? []);
        setMessage(data.error);
        setLoading(false);
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") {
          setMessage("Não foi possível carregar a Wiki.");
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  async function createDrafts(interviewId: string) {
    const response = await fetch("/api/wiki/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create-drafts", interviewId }),
    });
    const data = (await response.json()) as { error?: string };
    setMessage(data.error ?? "Respostas transformadas em rascunhos.");
    if (response.ok) await load();
  }

  async function saveEntry(entry: EntryRow, status: EntryRow["status"]) {
    const response = await fetch("/api/wiki/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...entry, entryId: entry.id, status }),
    });
    const data = (await response.json()) as { error?: string };
    setMessage(data.error ?? (status === "approved" ? "Conteúdo aprovado para o agente." : "Rascunho salvo."));
    if (response.ok) await load();
  }

  const approved = entries.filter((entry) => entry.status === "approved").length;
  const unanswered = events.filter((event) => event.outcome === "unanswered").length;

  return (
    <div className="wiki-admin">
      <div className="wiki-admin-metrics">
        <article><FileText /><span>Entrevistas</span><strong>{interviews.length}</strong></article>
        <article><BookOpenCheck /><span>Itens aprovados</span><strong>{approved}</strong></article>
        <article><MessageCircleQuestion /><span>Sem resposta</span><strong>{unanswered}</strong></article>
      </div>
      <div className="wiki-admin-toolbar">
        <p>{message ?? "Somente conteúdos aprovados ficam disponíveis para o bot."}</p>
        <button className="dash-button secondary" onClick={load} disabled={loading}>
          <RefreshCw /> Atualizar
        </button>
      </div>

      <section className="dashboard-panel">
        <header className="panel-header">
          <div><h2>Entrevistas recebidas</h2><p>Dono tem precedência em caso de divergência.</p></div>
        </header>
        <div className="wiki-interview-admin-list">
          {!interviews.length && <p className="wiki-empty">Nenhuma entrevista recebida ainda.</p>}
          {interviews.map((interview) => (
            <details key={interview.id}>
              <summary>
                <div>
                  <strong>{interview.respondent_name}</strong>
                  <span>{interview.respondent_title} · {interview.respondent_role === "owner" ? "Dono" : "Líder"}</span>
                </div>
                <small>{interview.status}</small>
              </summary>
              <div className="wiki-interview-answers">
                {interview.answers.map((answer) => (
                  <article key={answer.question}>
                    <strong>{answer.question}</strong>
                    <p>{answer.text || "Resposta enviada somente em áudio."}</p>
                    {answer.audioUrl && <small>Áudio armazenado: {answer.audioUrl}</small>}
                  </article>
                ))}
                {interview.status === "submitted" && (
                  <button className="dash-button primary" onClick={() => createDrafts(interview.id)}>
                    Criar rascunhos da Wiki
                  </button>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="dashboard-panel">
        <header className="panel-header">
          <div><h2>Wiki do agente</h2><p>Revise o texto e aprove somente a versão oficial.</p></div>
        </header>
        <div className="wiki-entry-list">
          {!entries.length && <p className="wiki-empty">Os rascunhos aparecerão aqui após revisar uma entrevista.</p>}
          {entries.map((entry, index) => (
            <article className={entry.status === "approved" ? "approved" : ""} key={entry.id}>
              <div className="wiki-entry-meta">
                <span>{entry.category}</span>
                <small>Fonte: {entry.source_role === "owner" ? "Dono" : "Líder"}</small>
              </div>
              <input
                value={entry.title}
                onChange={(event) => setEntries((current) => current.map((item, itemIndex) =>
                  itemIndex === index ? { ...item, title: event.target.value } : item
                ))}
              />
              <textarea
                rows={5}
                value={entry.content}
                onChange={(event) => setEntries((current) => current.map((item, itemIndex) =>
                  itemIndex === index ? { ...item, content: event.target.value } : item
                ))}
              />
              <div>
                <button className="dash-button secondary" onClick={() => saveEntry(entry, "draft")}>Salvar</button>
                <button className="dash-button primary" onClick={() => saveEntry(entry, "approved")}>
                  <Check /> {entry.status === "approved" ? "Aprovado" : "Aprovar para o bot"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-panel">
        <header className="panel-header">
          <div><h2>Perguntas do agente</h2><p>Use as lacunas para a revisão semanal da Wiki.</p></div>
        </header>
        <div className="wiki-event-list">
          {!events.length && <p className="wiki-empty">As conversas registradas aparecerão aqui.</p>}
          {events.map((event) => (
            <article key={event.id}>
              <span className={`wiki-event-status ${event.outcome}`}>{event.outcome}</span>
              <strong>{event.question}</strong>
              {event.answer && <p>{event.answer}</p>}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
