import { PageHeader } from "@/components/dashboard-ui";
import { BookingCalendar } from "@/components/booking-calendar";

export default function StudentSchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="Agenda Shift"
        title="Agende seu próximo passo."
        description="Escolha o serviço, o dia e o melhor horário para sua rotina."
      />
      <BookingCalendar />
    </>
  );
}
