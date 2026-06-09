import { Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard-ui";
import { AdminFinanceManager } from "@/components/finance-overview";

export default function AdminFinancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Gestão manual"
        title="Financeiro."
        description="Planos, mensalidades, confirmações e controle de acesso sem cobrança online."
        action={<button className="dash-button primary"><Plus /> Nova mensalidade</button>}
      />
      <AdminFinanceManager />
    </>
  );
}
