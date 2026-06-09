import { Search, SlidersHorizontal, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/dashboard-ui";

const students = [
  ["Marina Silva", "Força e composição corporal", "92%", "Hoje, 07:00"],
  ["Bruno Alves", "Hipertrofia", "88%", "Hoje, 07:00"],
  ["Cláudia Reis", "Condicionamento", "71%", "Hoje, 08:00"],
  ["Gustavo Melo", "Performance esportiva", "95%", "Hoje, 10:00"],
  ["Paulo Nunes", "Mobilidade e força", "90%", "Quinta, 06:00"],
  ["Renata Lima", "Emagrecimento", "83%", "Quinta, 08:00"],
];

export default function TrainerStudentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Carteira de alunos"
        title="Meus alunos."
        description="Acompanhe o momento e as próximas ações de cada pessoa."
        action={
          <button className="dash-button primary">
            <UserPlus /> Vincular aluno
          </button>
        }
      />
      <section className="dashboard-panel">
        <div className="table-toolbar">
          <label>
            <Search />
            <input placeholder="Buscar por nome ou objetivo" />
          </label>
          <button>
            <SlidersHorizontal /> Filtros
          </button>
        </div>
        <div className="data-table">
          <div className="table-row table-head">
            <span>Aluno</span>
            <span>Objetivo</span>
            <span>Frequência</span>
            <span>Próxima sessão</span>
          </div>
          {students.map(([name, goal, frequency, next]) => (
            <div className="table-row" key={name}>
              <div className="table-person">
                <div className="avatar avatar-small">
                  {name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <strong>{name}</strong>
              </div>
              <span>{goal}</span>
              <strong className="positive">{frequency}</strong>
              <span>{next}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
