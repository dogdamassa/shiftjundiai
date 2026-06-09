import { ClipboardCheck, Plus, Ruler, Search } from "lucide-react";
import { PageHeader } from "@/components/dashboard-ui";

export default function TrainerAssessmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dados e acompanhamento"
        title="Avaliações."
        description="Registre medidas, testes, fotos e observações em um histórico protegido."
        action={
          <button className="dash-button primary">
            <Plus /> Nova avaliação
          </button>
        }
      />
      <section className="dashboard-panel">
        <div className="table-toolbar">
          <label>
            <Search />
            <input placeholder="Buscar aluno" />
          </label>
        </div>
        <div className="assessment-list">
          {[
            ["Marina Silva", "Avaliação completa", "22 Jun", "Agendada"],
            ["Gustavo Melo", "Testes físicos", "11 Jun", "Pendente"],
            ["Bruno Alves", "Medidas e fotos", "15 Jun", "Agendada"],
            ["Cláudia Reis", "Reavaliação funcional", "18 Jun", "Agendada"],
          ].map(([name, type, date, status]) => (
            <article key={name}>
              <div className="assessment-icon">
                {type.includes("Medidas") ? <Ruler /> : <ClipboardCheck />}
              </div>
              <div>
                <strong>{name}</strong>
                <span>{type}</span>
              </div>
              <time>{date}</time>
              <span className="status-pill">{status}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
