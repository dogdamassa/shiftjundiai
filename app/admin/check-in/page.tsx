import { Download } from "lucide-react";
import { CheckinManager } from "@/components/checkin-manager";
import { PageHeader } from "@/components/dashboard-ui";

export default function AdminCheckinPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operação diária"
        title="Check-in geral."
        description="Lista de treinos por hora, presença dos alunos e capacidade de cada professor."
        action={<button className="dash-button secondary"><Download /> Exportar dia</button>}
      />
      <CheckinManager />
    </>
  );
}
