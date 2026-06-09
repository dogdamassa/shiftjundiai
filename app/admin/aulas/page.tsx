import { Bike, CalendarPlus, Dumbbell, MoreHorizontal, Plus, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard-ui";
import { extraClasses } from "@/lib/demo-data";

export default function AdminExtraClassesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programação especial"
        title="Shift Flow & Move."
        description="Configure professores, capacidade e disponibilidade das aulas de fim de semana."
        action={<button className="dash-button primary"><Plus /> Nova aula</button>}
      />
      <div className="admin-class-summary">
        <article><Bike /><strong>2</strong><span>Aulas Flow</span></article>
        <article><Dumbbell /><strong>2</strong><span>Aulas Move</span></article>
        <article><Users /><strong>38</strong><span>Reservas</span></article>
        <article><CalendarPlus /><strong>7 dias</strong><span>Abertura automática</span></article>
      </div>
      <section className="dashboard-panel">
        <div className="admin-class-list">
          {extraClasses.map((item) => (
            <article key={item.id}>
              <div className={`class-kind-icon ${item.kind === "Shift Flow" ? "flow" : "move"}`}>
                {item.kind === "Shift Flow" ? <Bike /> : <Dumbbell />}
              </div>
              <div><span>{item.dayLabel} · {item.date}</span><strong>{item.kind}</strong></div>
              <div><span>Horário</span><strong>{item.time}</strong></div>
              <div><span>Professor</span><strong>{item.professional}</strong></div>
              <div><span>Ocupação</span><strong>{item.booked}/{item.capacity}</strong></div>
              <span className="table-status ativo">Ativa</span>
              <button aria-label="Mais opções"><MoreHorizontal /></button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
