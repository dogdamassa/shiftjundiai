import { CheckinManager } from "@/components/checkin-manager";
import { PageHeader } from "@/components/dashboard-ui";

export default function TrainerCheckinPage() {
  return (
    <>
      <PageHeader
        eyebrow="Presença por horário"
        title="Check-in dos treinos."
        description="Acompanhe quem chegou e corrija presenças ou ausências da sua agenda."
      />
      <CheckinManager />
    </>
  );
}
