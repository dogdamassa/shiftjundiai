import {
  CalendarClock,
  Dumbbell,
  HeartPulse,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { MetricCard, PageHeader, Panel } from "@/components/dashboard-ui";
import { adminStats } from "@/lib/demo-data";

const statIcons = [Users, TrendingUp, Dumbbell, HeartPulse];

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operação Shift"
        title="Visão geral."
        description="Acompanhe a experiência dos alunos e a capacidade da operação."
        action={
          <Link className="dash-button primary" href="/admin/agenda">
            <CalendarClock /> Gerenciar agenda
          </Link>
        }
      />
      <div className="metrics-grid">
        {adminStats.map((stat, index) => (
          <MetricCard
            accent={index === 0}
            detail={stat.change}
            icon={statIcons[index]}
            key={stat.label}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
      <div className="dashboard-grid dashboard-grid-main">
        <Panel
          title="Ocupação por período"
          subtitle="Hoje · limite de 2 alunos por professor"
          href="/admin/agenda"
        >
          <div className="occupancy-chart">
            {[
              ["06h", 72],
              ["07h", 100],
              ["08h", 88],
              ["09h", 63],
              ["10h", 52],
              ["17h", 78],
              ["18h", 96],
              ["19h", 90],
              ["20h", 68],
            ].map(([label, value]) => (
              <div key={label}>
                <i style={{ height: `${value}%` }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel
          title="Serviços hoje"
          subtitle="Agendamentos por categoria"
          href="/admin/servicos"
        >
          <div className="service-distribution">
            {[
              ["Treino personalizado", "46", 78],
              ["Shift Flow & Move", "38", 68],
              ["Recovery", "12", 55],
              ["Fisioterapia", "5", 42],
              ["Nutrição", "4", 34],
            ].map(([label, value, percentage]) => (
              <div key={label}>
                <div>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
                <div className="progress-bar">
                  <i style={{ width: `${percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel
          title="Atividade recente"
          subtitle="Últimas ações no sistema"
          className="full-panel"
        >
          <div className="activity-feed">
            {[
              ["Nova matrícula", "Juliana Santos foi adicionada por Ana", "Há 8 min"],
              ["Crédito ajustado", "Recovery adicional para Bruno Alves", "Há 24 min"],
              ["Plano atualizado", "Rafael atualizou o treino de Marina", "Há 41 min"],
              ["Reserva cancelada", "Sessão das 18h liberou uma vaga", "Há 1h"],
            ].map(([title, detail, time]) => (
              <div key={`${title}-${time}`}>
                <i />
                <div>
                  <strong>{title}</strong>
                  <span>{detail}</span>
                </div>
                <time>{time}</time>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
