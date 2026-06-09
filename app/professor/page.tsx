import {
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Users,
} from "lucide-react";
import Link from "next/link";
import { MetricCard, PageHeader, Panel } from "@/components/dashboard-ui";
import { trainerSchedule } from "@/lib/demo-data";

export default function TrainerDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Terça-feira, 9 de junho"
        title="Bom dia, Rafael."
        description="Você tem 9 sessões e 14 alunos programados para hoje."
        action={
          <Link className="dash-button primary" href="/professor/agenda">
            <CalendarDays /> Ver agenda
          </Link>
        }
      />
      <div className="metrics-grid">
        <MetricCard
          label="Sessões hoje"
          value="9"
          detail="Próxima às 07:00"
          icon={Clock3}
          accent
        />
        <MetricCard
          label="Alunos hoje"
          value="14"
          detail="2 encaixes disponíveis"
          icon={Users}
        />
        <MetricCard
          label="Presenças"
          value="96%"
          detail="Média dos seus alunos"
          icon={CheckCircle2}
        />
        <MetricCard
          label="Avaliações"
          value="4"
          detail="Pendentes nesta semana"
          icon={ClipboardCheck}
        />
      </div>
      <div className="dashboard-grid dashboard-grid-main">
        <Panel
          title="Agenda de hoje"
          subtitle="Capacidade máxima: 2 alunos por horário"
          href="/professor/agenda"
          className="trainer-agenda-panel"
        >
          <div className="trainer-timeline">
            {trainerSchedule.map((slot) => (
              <article className={slot.status} key={slot.time}>
                <time>{slot.time}</time>
                <div className="timeline-line">
                  <i />
                </div>
                <div>
                  {slot.students.length > 0 ? (
                    <>
                      <strong>{slot.students.join(" · ")}</strong>
                      <span>
                        Performance individual · {slot.students.length}/
                        {slot.capacity} vagas
                      </span>
                    </>
                  ) : (
                    <>
                      <strong>Horário disponível</strong>
                      <span>0/{slot.capacity} vagas preenchidas</span>
                    </>
                  )}
                </div>
                <button className="small-action">
                  {slot.status === "done"
                    ? "Concluído"
                    : slot.status === "next"
                      ? "Abrir sessão"
                      : "Detalhes"}
                </button>
              </article>
            ))}
          </div>
        </Panel>
        <Panel
          title="Atenção nesta semana"
          subtitle="Ações recomendadas para seus alunos"
        >
          <div className="attention-list">
            {[
              ["Marina Silva", "Reavaliar cargas do bloco B", "Hoje"],
              ["Gustavo Melo", "Avaliação física pendente", "Amanhã"],
              ["Cláudia Reis", "7 dias sem treinar", "Contato"],
              ["Bruno Alves", "Novo plano na próxima semana", "Planejar"],
            ].map(([name, task, meta]) => (
              <div key={name}>
                <div className="avatar avatar-small">
                  {name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <strong>{name}</strong>
                  <span>{task}</span>
                </div>
                <small>{meta}</small>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
