import { Download, Search, SlidersHorizontal, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/dashboard-ui";

const people = [
  ["Marina Silva", "Ativo", "Rafael Mendes", "92%", "1 recovery"],
  ["Bruno Alves", "Ativo", "Rafael Mendes", "88%", "0 recovery"],
  ["Cláudia Reis", "Atenção", "Rafael Mendes", "71%", "1 recovery"],
  ["Gustavo Melo", "Ativo", "Paula Torres", "95%", "1 fisio"],
  ["Paulo Nunes", "Ativo", "Paula Torres", "90%", "1 recovery"],
  ["Renata Lima", "Pausado", "Paula Torres", "83%", "0 créditos"],
];

export default function AdminStudentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Base de membros"
        title="Alunos."
        description="Gerencie vínculos, permissões, créditos e status de cada aluno."
        action={
          <button className="dash-button primary">
            <UserPlus /> Novo aluno
          </button>
        }
      />
      <section className="dashboard-panel">
        <div className="table-toolbar">
          <label>
            <Search />
            <input placeholder="Buscar aluno" />
          </label>
          <button>
            <SlidersHorizontal /> Filtros
          </button>
          <button>
            <Download /> Exportar
          </button>
        </div>
        <div className="data-table admin-student-table">
          <div className="table-row table-head">
            <span>Aluno</span>
            <span>Status</span>
            <span>Professor</span>
            <span>Frequência</span>
            <span>Créditos</span>
          </div>
          {people.map(([name, status, trainer, attendance, credit]) => (
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
              <span className={`table-status ${status.toLowerCase()}`}>
                {status}
              </span>
              <span>{trainer}</span>
              <strong className="positive">{attendance}</strong>
              <span>{credit}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
