import { Camera, Ruler, Scale, TrendingUp } from "lucide-react";
import { MetricCard, PageHeader, Panel } from "@/components/dashboard-ui";
import { ProgressChart } from "@/components/progress-chart";

export default function StudentProgressPage() {
  return (
    <>
      <PageHeader
        eyebrow="Minha evolução"
        title="O progresso fica visível."
        description="Acompanhe suas avaliações e compare cada fase da sua jornada."
      />
      <div className="metrics-grid">
        <MetricCard
          label="Peso atual"
          value="64,8 kg"
          detail="-2,4 kg desde janeiro"
          icon={Scale}
          accent
        />
        <MetricCard
          label="Massa muscular"
          value="+1,7 kg"
          detail="Evolução em 6 meses"
          icon={TrendingUp}
        />
        <MetricCard
          label="Cintura"
          value="71 cm"
          detail="-5 cm desde janeiro"
          icon={Ruler}
        />
        <MetricCard
          label="Avaliações"
          value="4"
          detail="Próxima em 22 de junho"
          icon={Camera}
        />
      </div>
      <div className="dashboard-grid progress-grid">
        <Panel
          title="Índice de força"
          subtitle="Evolução consolidada dos principais movimentos"
          className="chart-panel"
        >
          <ProgressChart />
        </Panel>
        <Panel title="Últimas medidas" subtitle="Comparativo da avaliação de maio">
          <div className="measure-list">
            {[
              ["Braço", "27,5 cm", "+1,2 cm"],
              ["Cintura", "71 cm", "-2,0 cm"],
              ["Quadril", "96 cm", "-1,4 cm"],
              ["Coxa", "56 cm", "+1,8 cm"],
            ].map(([label, value, change]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{change}</small>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
