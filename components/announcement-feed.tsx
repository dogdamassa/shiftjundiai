"use client";

import { Bell, Check, Megaphone, Pin, X } from "lucide-react";
import { useState } from "react";
import { announcements as initialAnnouncements } from "@/lib/demo-data";

export function AnnouncementFeed({ compact = false }: { compact?: boolean }) {
  const [items, setItems] = useState(initialAnnouncements);

  function markRead(id: string) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  }

  const visible = compact ? items.slice(0, 2) : items;

  return (
    <div className={compact ? "announcement-feed compact" : "announcement-feed"}>
      {visible.map((item) => (
        <article
          className={`announcement-card ${item.priority} ${item.read ? "read" : ""}`}
          key={item.id}
        >
          <div className="announcement-icon">
            {item.pinned ? <Pin /> : item.priority === "urgent" ? <Bell /> : <Megaphone />}
          </div>
          <div className="announcement-copy">
            <div>
              <span>{item.pinned ? "Fixado" : item.publishedAt}</span>
              {!item.read && <i>Novo</i>}
            </div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            {item.expiresAt && <small>Visível até {item.expiresAt}</small>}
          </div>
          {!item.read && (
            <button onClick={() => markRead(item.id)} aria-label="Marcar como lido">
              <Check />
              <span>Marcar como lido</span>
            </button>
          )}
        </article>
      ))}
      {items.length === 0 && (
        <div className="empty-state">
          <X />
          <strong>Nenhum recado por aqui.</strong>
        </div>
      )}
    </div>
  );
}
