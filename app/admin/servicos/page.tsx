import { HeartPulse, MoreHorizontal, Plus, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard-ui";

export default function AdminServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catálogo e regras"
        title="Serviços."
        description="Configure duração, capacidade e regras de crédito."
        action={
          <button className="dash-button primary">
            <Plus /> Novo serviço
          </button>
        }
      />
      <div className="service-admin-grid">
        {[
          ["Treino personalizado", "60 min", "2 por professor", "Sem crédito"],
          ["Shift Flow", "45 min", "14 bikes", "Livre para alunos ativos"],
          ["Shift Move", "50 min", "12 alunos", "Livre para alunos ativos"],
          ["Recovery", "40 min", "1 por horário", "1 crédito mensal"],
          ["Fisioterapia", "50 min", "1 por horário", "Configurável"],
          ["Nutrição", "60 min", "1 por horário", "Configurável"],
        ].map(([name, duration, capacity, rule]) => (
          <article key={name}>
            <header>
              <div>
                <HeartPulse />
              </div>
              <button aria-label="Mais opções">
                <MoreHorizontal />
              </button>
            </header>
            <span>ATIVO</span>
            <h2>{name}</h2>
            <dl>
              <div>
                <dt>Duração</dt>
                <dd>{duration}</dd>
              </div>
              <div>
                <dt>
                  <Users /> Capacidade
                </dt>
                <dd>{capacity}</dd>
              </div>
              <div>
                <dt>Regra</dt>
                <dd>{rule}</dd>
              </div>
            </dl>
            <button className="dash-button secondary wide">Editar serviço</button>
          </article>
        ))}
      </div>
    </>
  );
}
