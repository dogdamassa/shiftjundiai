import { PageHeader } from "@/components/dashboard-ui";
import { StudentFinanceOverview } from "@/components/finance-overview";

export default function StudentFinancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Seu plano"
        title="Financeiro."
        description="Acompanhe a situação do plano e o histórico confirmado pela equipe Shift."
      />
      <StudentFinanceOverview />
    </>
  );
}
