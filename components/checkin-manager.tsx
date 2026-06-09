"use client";

import { Check, Clock3, RotateCcw, UserCheck, UserX, Users } from "lucide-react";
import { useState } from "react";
import { hourlyCheckins } from "@/lib/demo-data";

type State = "booked" | "checked_in" | "absent" | "cancelled";

const labels: Record<State, string> = {
  booked: "Aguardando",
  checked_in: "Presente",
  absent: "Ausente",
  cancelled: "Cancelado",
};

export function CheckinManager() {
  const [schedule, setSchedule] = useState(
    hourlyCheckins.map((slot) => ({
      ...slot,
      students: slot.students.map((student) => ({ ...student, state: student.state as State })),
    })),
  );

  function updateState(time: string, name: string, state: State) {
    setSchedule((current) =>
      current.map((slot) =>
        slot.time === time
          ? {
              ...slot,
              students: slot.students.map((student) =>
                student.name === name ? { ...student, state } : student,
              ),
            }
          : slot,
      ),
    );
  }

  return (
    <div className="checkin-board">
      <div className="checkin-board-legend">
        <span><i className="present" /> Presente</span>
        <span><i className="waiting" /> Aguardando</span>
        <span><i className="absent" /> Ausente</span>
        <strong>Terça, 9 de junho</strong>
      </div>
      {schedule.map((slot) => (
        <article className="hour-checkin" key={slot.time}>
          <div className="hour-marker">
            <Clock3 />
            <strong>{slot.time}</strong>
          </div>
          <div className="hour-session">
            <span>{slot.service}</span>
            <strong>{slot.professional}</strong>
            <small><Users /> {slot.students.length}/{slot.capacity} reservas</small>
          </div>
          <div className="hour-students">
            {slot.students.length === 0 ? (
              <div className="open-hour">Horário livre</div>
            ) : (
              slot.students.map((student) => (
                <div className={`checkin-person ${student.state}`} key={student.name}>
                  <div className="avatar avatar-small">
                    {student.name.split(" ").map((part) => part[0]).join("")}
                  </div>
                  <div>
                    <strong>{student.name}</strong>
                    <span>{labels[student.state]}</span>
                  </div>
                  <div className="checkin-actions">
                    {student.state !== "checked_in" && (
                      <button
                        title="Marcar presença"
                        onClick={() => updateState(slot.time, student.name, "checked_in")}
                      >
                        <UserCheck />
                      </button>
                    )}
                    {student.state !== "absent" && (
                      <button
                        title="Marcar ausência"
                        onClick={() => updateState(slot.time, student.name, "absent")}
                      >
                        <UserX />
                      </button>
                    )}
                    {student.state !== "booked" && (
                      <button
                        title="Voltar para aguardando"
                        onClick={() => updateState(slot.time, student.name, "booked")}
                      >
                        <RotateCcw />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          {slot.time === "09:00" && (
            <span className="current-hour"><Check /> Em andamento</span>
          )}
        </article>
      ))}
    </div>
  );
}
