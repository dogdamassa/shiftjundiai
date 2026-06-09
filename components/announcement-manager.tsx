"use client";

import { Archive, Check, Megaphone, Pin, Plus, Send } from "lucide-react";
import { useState } from "react";
import { announcements as initialAnnouncements } from "@/lib/demo-data";

export function AnnouncementManager() {
  const [items, setItems] = useState(initialAnnouncements);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notice, setNotice] = useState<string>();

  function publish(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setItems((current) => [
      {
        id: `notice-${Date.now()}`,
        title,
        body,
        publishedAt: "Agora",
        priority: "normal",
        pinned: false,
        read: false,
      },
      ...current,
    ]);
    setTitle("");
    setBody("");
    setShowForm(false);
    setNotice("Recado publicado para todos os alunos.");
  }

  return (
    <div className="announcement-manager">
      <div className="manager-toolbar">
        <div>
          <strong>{items.length} recados ativos</strong>
          <span>Todos os alunos recebem as publicações.</span>
        </div>
        <button className="dash-button primary" onClick={() => setShowForm((value) => !value)}>
          <Plus /> Novo recado
        </button>
      </div>

      {showForm && (
        <form className="announcement-form" onSubmit={publish}>
          <label>
            Título
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ex.: Horário especial" />
          </label>
          <label>
            Mensagem
            <textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Escreva a novidade para os alunos..." rows={4} />
          </label>
          <div>
            <label><input type="checkbox" /> Fixar no topo</label>
            <select aria-label="Prioridade" defaultValue="normal">
              <option value="normal">Normal</option>
              <option value="important">Importante</option>
              <option value="urgent">Urgente</option>
            </select>
            <input type="date" aria-label="Data final de exibição" />
            <button className="dash-button primary" type="submit"><Send /> Publicar</button>
          </div>
        </form>
      )}

      {notice && <div className="inline-success"><Check /> {notice}</div>}

      <div className="manager-notice-list">
        {items.map((item) => (
          <article key={item.id}>
            <div className={`notice-priority ${item.priority}`}>
              {item.pinned ? <Pin /> : <Megaphone />}
            </div>
            <div>
              <span>{item.publishedAt} · {item.priority}</span>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
            <div className="notice-actions">
              <button onClick={() => setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, pinned: !entry.pinned } : entry))}>
                <Pin /> {item.pinned ? "Desafixar" : "Fixar"}
              </button>
              <button onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}>
                <Archive /> Arquivar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
