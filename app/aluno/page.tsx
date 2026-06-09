import {
  CalendarDays,
  ChevronRight,
  Dumbbell,
  Flame,
  Gauge,
  HeartPulse,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import {
  MetricCard,
  PageHeader,
  Panel,
} from "@/components/dashboard-ui";
import { AnnouncementFeed } from "@/components/announcement-feed";
import { ProgressChart } from "@/components/progress-chart";
import { StudentCheckin } from "@/components/student-checkin";
import { ShiftLeaguePreview } from "@/components/shift-league";
import { appointments, credits, student, todayWorkout } from "@/lib/demo-data";

export default function StudentDashboardPage() {
  const next = appointments[0];

  return (
    <>
      <PageHeader
        eyebrow="Terça-feira, 9 de junho"
        title={`Bom dia, ${student.firstName}.`}
        description="Consistência é o que transforma esforço em evolução."
        action={
          <Link className="dash-button primary" href="/aluno/agenda">
            <CalendarDays /> Agendar sessão
          </Link>
        }
      />

      <div className="metrics-grid">
        <MetricCard
          label="Frequência mensal"
          value={`${student.attendance}%`}
          detail={`${student.sessionsThisMonth} treinos realizados`}
          icon={Gauge}
          accent
        />
        <MetricCard
          label="Sequência atual"
          value={`${student.streak} semanas`}
          detail="Seu melhor ritmo até agora"
          icon={Flame}
        />
        <MetricCard
          label="Evolução de força"
          value="+18%"
          detail="Nos últimos 90 dias"
          icon={TrendingUp}
        />
        <MetricCard
          label="Recovery"
          value="1 crédito"
          detail="Disponível para usar"
          icon={HeartPulse}
        />
      </div>

      <div className="dashboard-grid dashboard-grid-main">
        <Panel
          title="Check-in do treino"
          subtitle="Confirme sua presença dentro da janela disponível"
          href="/aluno/check-in"
          className="full-panel"
        >
          <StudentCheckin />
        </Panel>

        <Panel
          title="Recados da Shift"
          subtitle="Novidades importantes para a sua semana"
          href="/aluno/recados"
          className="full-panel"
        >
          <AnnouncementFeed compact />
        </Panel>

        <Panel
          title="Shift League"
          subtitle="Sua constância no ranking de junho"
          href="/aluno/league"
          className="full-panel league-dashboard-panel"
        >
          <ShiftLeaguePreview />
        </Panel>

        <Panel
          title="Próximo treino"
          subtitle="Sua próxima sessão confirmada"
          href="/aluno/agenda"
          className="next-session-panel"
        >
          <div className="next-session">
            <div className="session-date">
              <strong>{next.date.split(" ")[0]}</strong>
              <span>{next.date.split(" ")[1]}</span>
            </div>
            <div className="session-info">
              <span className="status-pill">Confirmado</span>
              <h3>Performance B · Inferiores</h3>
              <p>
                {next.time} · {next.duration} min · {next.location}
              </p>
              <small>com {next.professional}</small>
            </div>
            <Link className="circle-action" href="/aluno/treino">
              <ChevronRight />
            </Link>
          </div>
        </Panel>

        <Panel
          title="Seu treino de hoje"
          subtitle="Performance B · Semana 08"
          href="/aluno/treino"
        >
          <div className="workout-mini-list">
            {todayWorkout.slice(0, 3).map((exercise, index) => (
              <div key={exercise.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{exercise.name}</strong>
                  <small>
                    {exercise.sets} séries · {exercise.reps} reps ·{" "}
                    {exercise.load}
                  </small>
                </div>
                <Dumbbell />
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Sua evolução"
          subtitle="Índice de força nos últimos 6 meses"
          href="/aluno/evolucao"
          className="chart-panel"
        >
          <ProgressChart />
        </Panel>

        <Panel title="Seus serviços" subtitle="Créditos e próximas liberações">
          <div className="credit-list">
            {credits.map((credit) => (
              <Link href="/aluno/servicos" key={credit.service}>
                <div className="credit-icon">
                  <HeartPulse />
                </div>
                <div>
                  <strong>{credit.service}</strong>
                  <span>{credit.detail}</span>
                </div>
                <b>{credit.available}</b>
                <ChevronRight />
              </Link>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
