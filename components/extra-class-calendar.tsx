"use client";

import {
  Bike,
  CalendarCheck,
  Check,
  Clock3,
  Dumbbell,
  Info,
  MapPin,
  Users,
} from "lucide-react";
import { useState } from "react";
import { extraClasses as initialClasses } from "@/lib/demo-data";

export function ExtraClassCalendar() {
  const [filter, setFilter] = useState<"Todas" | "Shift Flow" | "Shift Move">("Todas");
  const [classes, setClasses] = useState(initialClasses);
  const [message, setMessage] = useState<string>();

  const visible = classes.filter(
    (item) => filter === "Todas" || item.kind === filter,
  );

  function reserve(id: string) {
    setClasses((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              booked: item.booked + 1,
              bookingState: "booked",
            }
          : item,
      ),
    );
    setMessage("Reserva confirmada. A aula já aparece na sua agenda.");
  }

  function cancel(id: string) {
    setClasses((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              booked: Math.max(0, item.booked - 1),
              bookingState: "open",
            }
          : item,
      ),
    );
    setMessage("Reserva cancelada e a vaga foi liberada.");
  }

  return (
    <div className="extra-calendar">
      <section className="extra-class-hero">
        <div>
          <span className="dashboard-eyebrow">Aulas de fim de semana</span>
          <h2>SHIFT WEEKEND</h2>
          <p>
            Flow para pedalar em outro ritmo. Move para explorar força,
            mobilidade e condicionamento.
          </p>
        </div>
        <div className="weekend-rule">
          <CalendarCheck />
          <div>
            <strong>Agenda D+7</strong>
            <span>Cada aula abre exatamente uma semana antes.</span>
          </div>
        </div>
      </section>

      <div className="class-filter" role="tablist" aria-label="Modalidade">
        {(["Todas", "Shift Flow", "Shift Move"] as const).map((item) => (
          <button
            className={filter === item ? "active" : ""}
            key={item}
            onClick={() => setFilter(item)}
            role="tab"
            aria-selected={filter === item}
          >
            {item === "Shift Flow" && <Bike />}
            {item === "Shift Move" && <Dumbbell />}
            {item}
          </button>
        ))}
      </div>

      {message && (
        <div className="inline-success" role="status">
          <Check /> {message}
          <button onClick={() => setMessage(undefined)}>Fechar</button>
        </div>
      )}

      <div className="extra-class-grid">
        {visible.map((item) => {
          const isFlow = item.kind === "Shift Flow";
          return (
            <article className={isFlow ? "flow" : "move"} key={item.id}>
              <header>
                <div className="class-kind-icon">
                  {isFlow ? <Bike /> : <Dumbbell />}
                </div>
                <span>{item.kind}</span>
                <b>{item.dayLabel}</b>
              </header>
              <div className="class-date">
                <strong>{item.date.split(" ")[0]}</strong>
                <span>{item.date.split(" ")[1]} · {item.time}</span>
              </div>
              <h3>{item.subtitle}</h3>
              <div className="class-meta">
                <span><Clock3 /> {item.duration} min</span>
                <span><MapPin /> {item.location}</span>
                <span><Users /> {item.booked}/{item.capacity} inscritos</span>
              </div>
              <div className="capacity-track">
                <i style={{ width: `${(item.booked / item.capacity) * 100}%` }} />
              </div>
              <p>com <strong>{item.professional}</strong></p>
              {item.bookingState === "booked" ? (
                <button className="dash-button secondary wide" onClick={() => cancel(item.id)}>
                  <Check /> Reservado · cancelar
                </button>
              ) : item.bookingState === "full" ? (
                <button className="dash-button wide" disabled>
                  Turma lotada
                </button>
              ) : item.bookingState === "soon" ? (
                <button className="dash-button wide" disabled>
                  Abre em 2 dias
                </button>
              ) : (
                <button className="dash-button primary wide" onClick={() => reserve(item.id)}>
                  Reservar aula
                </button>
              )}
            </article>
          );
        })}
      </div>
      <p className="schedule-footnote">
        <Info /> Reservas e cancelamentos encerram 10 minutos antes do início.
        Alunos com acesso suspenso devem falar com a equipe.
      </p>
    </div>
  );
}
