import { Copy, Dumbbell, MoreHorizontal, Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard-ui";

export default function TrainerWorkoutsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Biblioteca e prescrições"
        title="Planos de treino."
        description="Crie, adapte e acompanhe os ciclos dos seus alunos."
        action={
          <button className="dash-button primary">
            <Plus /> Novo plano
          </button>
        }
      />
      <div className="plan-grid">
        {[
          ["Performance A", "Superior · Força", "12 alunos", "4 semanas"],
          ["Performance B", "Inferior · Força", "18 alunos", "6 semanas"],
          ["Base 01", "Adaptação", "8 alunos", "3 semanas"],
          ["Run Strong", "Corrida · Complementar", "6 alunos", "8 semanas"],
        ].map(([name, focus, students, duration]) => (
          <article className="plan-card" key={name}>
            <div>
              <Dumbbell />
              <button aria-label="Mais opções">
                <MoreHorizontal />
              </button>
            </div>
            <span>PLANO ATIVO</span>
            <h2>{name}</h2>
            <p>{focus}</p>
            <dl>
              <div>
                <dt>Alunos</dt>
                <dd>{students}</dd>
              </div>
              <div>
                <dt>Duração</dt>
                <dd>{duration}</dd>
              </div>
            </dl>
            <button className="dash-button secondary wide">
              <Copy /> Duplicar e editar
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
