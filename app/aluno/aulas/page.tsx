import { ExtraClassCalendar } from "@/components/extra-class-calendar";
import { PageHeader } from "@/components/dashboard-ui";

export default function StudentExtraClassesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Experiências Shift"
        title="Flow & Move."
        description="Reserve as aulas extras de bike e funcional para o próximo fim de semana."
      />
      <ExtraClassCalendar />
    </>
  );
}
