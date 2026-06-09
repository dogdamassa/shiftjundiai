import { CalendarDays, Filter, Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard-ui";

const professionals = [
  ["Rafael Mendes", "Treino", ["06:00 Marina", "07:00 Bruno", "08:00 Cláudia"]],
  ["Paula Torres", "Treino", ["07:00 Paulo", "09:00 Renata", "18:00 Gustavo"]],
  ["Camila Nunes", "Recovery", ["07:30 Marina", "10:00 livre", "16:30 Bruno"]],
  ["Lucas Prado", "Fisioterapia", ["08:00 livre", "14:00 Gustavo", "16:00 livre"]],
];

export default function AdminSchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="Gestão de capacidade"
        title="Agenda geral."
        description="Organize profissionais, serviços e ocupação em uma única visão."
        action={
          <button className="dash-button primary">
            <Plus /> Novo horário
          </button>
        }
      />
      <section className="dashboard-panel">
        <div className="admin-calendar-toolbar">
          <div>
            <button className="active">Dia</button>
            <button>Semana</button>
          </div>
          <strong>
            <CalendarDays /> Terça, 9 de junho
          </strong>
          <button>
            <Filter /> Filtrar serviço
          </button>
        </div>
        <div className="resource-schedule">
          {professionals.map(([name, service, slots]) => (
            <div key={name as string}>
              <header>
                <div className="avatar avatar-small">
                  {(name as string)
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <strong>{name}</strong>
                  <span>{service}</span>
                </div>
              </header>
              <div>
                {(slots as string[]).map((slot) => (
                  <button
                    className={slot.includes("livre") ? "free" : ""}
                    key={slot}
                  >
                    <strong>{slot.split(" ")[0]}</strong>
                    <span>{slot.split(" ").slice(1).join(" ")}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
