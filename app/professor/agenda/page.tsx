import { CalendarDays, ChevronLeft, ChevronRight, Plus, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard-ui";
import { trainerSchedule } from "@/lib/demo-data";

export default function TrainerSchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="Agenda profissional"
        title="Sua semana na Shift."
        description="Acompanhe ocupação, alunos e disponibilidade em cada sessão."
        action={
          <button className="dash-button primary">
            <Plus /> Abrir horário
          </button>
        }
      />
      <section className="dashboard-panel weekly-schedule">
        <header className="calendar-heading">
          <div>
            <button aria-label="Semana anterior">
              <ChevronLeft />
            </button>
            <strong>8 a 13 de junho</strong>
            <button aria-label="Próxima semana">
              <ChevronRight />
            </button>
          </div>
          <button>
            <CalendarDays /> Hoje
          </button>
        </header>
        <div className="week-grid">
          {["SEG 08", "TER 09", "QUA 10", "QUI 11", "SEX 12"].map(
            (day, dayIndex) => (
              <div className={dayIndex === 1 ? "current" : ""} key={day}>
                <header>
                  <span>{day.split(" ")[0]}</span>
                  <strong>{day.split(" ")[1]}</strong>
                </header>
                {trainerSchedule.slice(0, dayIndex === 1 ? 5 : 4).map((slot) => (
                  <article key={`${day}-${slot.time}`}>
                    <time>{slot.time}</time>
                    <strong>
                      {slot.students.length
                        ? slot.students[dayIndex % slot.students.length]
                        : "Disponível"}
                    </strong>
                    <span>
                      <Users /> {slot.students.length}/{slot.capacity}
                    </span>
                  </article>
                ))}
              </div>
            ),
          )}
        </div>
      </section>
    </>
  );
}
