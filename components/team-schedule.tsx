"use client";

import { Clock3, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { teamSchedule } from "@/lib/demo-data";
import type { ScheduleWindow, TeamScheduleEntry } from "@/lib/types";

const DAY_TABS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const DAY_NAMES = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

const START_HOUR = 6;
const END_HOUR = 22;
const TICKS = ["06:00", "10:00", "14:00", "18:00", "22:00"];

function toHours(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours + minutes / 60;
}

function formatDuration(window: ScheduleWindow) {
  const total = toHours(window.end) - toHours(window.start);
  const hours = Math.floor(total);
  const minutes = Math.round((total - hours) * 60);
  return minutes ? `${hours}h${String(minutes).padStart(2, "0")}` : `${hours}h`;
}

function todayIndex() {
  return (new Date().getDay() + 6) % 7;
}

interface PresentProfessional extends TeamScheduleEntry {
  window: ScheduleWindow;
}

export function TeamSchedule() {
  const [day, setDay] = useState(0);

  useEffect(() => {
    setDay(todayIndex());
  }, []);

  const present: PresentProfessional[] = teamSchedule
    .flatMap((professional) => {
      const window = professional.windows.find((item) => item.days.includes(day));
      return window ? [{ ...professional, window }] : [];
    })
    .sort(
      (a, b) =>
        toHours(a.window.start) - toHours(b.window.start) ||
        toHours(a.window.end) - toHours(b.window.end) ||
        a.name.localeCompare(b.name),
    );

  return (
    <div className="team-schedule">
      <div className="team-schedule-tabs" role="tablist" aria-label="Dia da semana">
        {DAY_TABS.map((label, index) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={day === index}
            className={day === index ? "active" : undefined}
            onClick={() => setDay(index)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="team-schedule-meta">
        <strong>{DAY_NAMES[day]}</strong>
        <span>
          <Users /> {present.length} {present.length === 1 ? "profissional" : "profissionais"} no estúdio
        </span>
      </div>

      {present.length === 0 ? (
        <p className="team-schedule-empty">
          Sem atendimentos da equipe neste dia. Confira a agenda de aulas especiais.
        </p>
      ) : (
        <div className="team-schedule-rows">
          <div className="team-schedule-ticks" aria-hidden="true">
            <span />
            <div>
              {TICKS.map((tick) => (
                <em key={tick}>{tick}</em>
              ))}
            </div>
          </div>
          {present.map((professional) => {
            const start = toHours(professional.window.start);
            const end = toHours(professional.window.end);
            const range = END_HOUR - START_HOUR;
            const left = ((start - START_HOUR) / range) * 100;
            const width = ((end - start) / range) * 100;
            return (
              <article key={professional.id} className="team-schedule-row">
                <div className="team-schedule-person">
                  <strong>{professional.name}</strong>
                  <span>
                    {professional.role} · {professional.specialty}
                  </span>
                </div>
                <div className="team-schedule-track">
                  <div
                    className="team-schedule-bar"
                    style={{ left: `${left}%`, width: `${width}%` }}
                  >
                    <span>
                      {professional.window.start}–{professional.window.end}
                    </span>
                    <em>
                      <Clock3 /> {formatDuration(professional.window)}
                    </em>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
