import { CalendarDays, CheckCircle2, Clock3 } from "lucide-react";
import Link from "next/link";
import { PageHeader, Panel } from "@/components/dashboard-ui";
import { StudentCheckin } from "@/components/student-checkin";

export default function StudentCheckinPage() {
  return (
    <>
      <PageHeader
        eyebrow="Presença digital"
        title="Check-in."
        description="A janela abre 10 minutos antes e permanece disponível até 30 minutos após o início."
        action={
          <Link className="dash-button secondary" href="/aluno/agenda">
            <CalendarDays /> Ver agenda
          </Link>
        }
      />
      <StudentCheckin />
      <div className="dashboard-grid dashboard-grid-main checkin-info-grid">
        <Panel title="Como funciona" subtitle="Uma confirmação simples e segura">
          <div className="rule-list">
            <div><Clock3 /><span><strong>10 minutos antes</strong>O botão de check-in é liberado.</span></div>
            <div><CheckCircle2 /><span><strong>Até 30 minutos depois</strong>Sua presença fica registrada no histórico.</span></div>
          </div>
        </Panel>
        <Panel title="Próximas sessões" subtitle="O check-in aparece quando a janela abrir">
          <div className="mini-schedule-list">
            <div><strong>10 Jun · 07:00</strong><span>Treino · Rafael Mendes</span></div>
            <div><strong>13 Jun · 08:00</strong><span>Shift Flow · Paula Torres</span></div>
          </div>
        </Panel>
      </div>
    </>
  );
}
