"use client";

import {
  BadgeCheck,
  CalendarClock,
  Check,
  CircleDollarSign,
  LockKeyhole,
  ReceiptText,
} from "lucide-react";
import { useState } from "react";
import { invoices as initialInvoices, student } from "@/lib/demo-data";
import type { InvoiceStatus } from "@/lib/types";

const statusLabel: Record<InvoiceStatus, string> = {
  pending: "Pendente",
  paid: "Pago",
  overdue: "Atrasado",
  cancelled: "Cancelado",
  exempt: "Isento",
};

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function StudentFinanceOverview() {
  return (
    <div className="finance-layout">
      <section className="plan-spotlight">
        <div>
          <span className="dashboard-eyebrow">Seu plano atual</span>
          <h2>{student.plan}</h2>
          <p>Treino personalizado e acesso livre às aulas Shift Flow e Move.</p>
        </div>
        <div className="plan-status active">
          <BadgeCheck />
          <strong>Plano ativo</strong>
          <span>Acesso liberado</span>
        </div>
        <dl>
          <div>
            <dt>Próximo vencimento</dt>
            <dd>{student.nextDueDate}</dd>
          </div>
          <div>
            <dt>Forma de controle</dt>
            <dd>Confirmação pela equipe</dd>
          </div>
          <div>
            <dt>Início do plano</dt>
            <dd>01 Nov 2025</dd>
          </div>
        </dl>
      </section>
      <InvoiceTable />
    </div>
  );
}

export function AdminFinanceManager() {
  const [records, setRecords] = useState(initialInvoices);
  const [suspended, setSuspended] = useState(false);
  const [notice, setNotice] = useState<string>();

  function markPaid(id: string) {
    setRecords((current) =>
      current.map((invoice) =>
        invoice.id === id
          ? { ...invoice, status: "paid", paidAt: "09 Jun 2026" }
          : invoice,
      ),
    );
    setNotice("Pagamento confirmado e histórico atualizado.");
  }

  return (
    <div className="admin-finance-layout">
      <div className="finance-summary-grid">
        <article>
          <CircleDollarSign />
          <span>Receita prevista</span>
          <strong>R$ 207,2 mil</strong>
          <small>Junho de 2026</small>
        </article>
        <article>
          <Check />
          <span>Recebido</span>
          <strong>R$ 184,8 mil</strong>
          <small>89,2% confirmado</small>
        </article>
        <article>
          <CalendarClock />
          <span>Pendente</span>
          <strong>R$ 18,2 mil</strong>
          <small>13 mensalidades</small>
        </article>
        <article className="warning">
          <LockKeyhole />
          <span>Atrasado</span>
          <strong>R$ 4,2 mil</strong>
          <small>3 alunos</small>
        </article>
      </div>

      {notice && <div className="inline-success"><Check /> {notice}</div>}

      <section className="dashboard-panel finance-student-detail">
        <header className="panel-header">
          <div>
            <h2>Marina Silva</h2>
            <p>Shift Performance · vencimento todo dia 15</p>
          </div>
          <button
            className={suspended ? "dash-button primary" : "dash-button secondary"}
            onClick={() => {
              setSuspended((value) => !value);
              setNotice(
                suspended
                  ? "Acesso da aluna liberado."
                  : "Acesso suspenso manualmente. O atraso sozinho não causa bloqueio.",
              );
            }}
          >
            <LockKeyhole /> {suspended ? "Liberar acesso" : "Suspender acesso"}
          </button>
        </header>
        <div className="finance-access-state">
          <span className={suspended ? "table-status atrasado" : "table-status ativo"}>
            {suspended ? "Acesso suspenso" : "Acesso ativo"}
          </span>
          <small>Controle manual do administrador</small>
        </div>
        <InvoiceTable records={records} onMarkPaid={markPaid} admin />
      </section>
    </div>
  );
}

function InvoiceTable({
  records = initialInvoices,
  onMarkPaid,
  admin = false,
}: {
  records?: typeof initialInvoices;
  onMarkPaid?: (id: string) => void;
  admin?: boolean;
}) {
  return (
    <section className="dashboard-panel invoice-panel">
      <header className="panel-header">
        <div>
          <h2>Histórico financeiro</h2>
          <p>Mensalidades, descontos e confirmações da equipe.</p>
        </div>
        <ReceiptText />
      </header>
      <div className="invoice-list">
        <div className="invoice-row invoice-head">
          <span>Referência</span>
          <span>Vencimento</span>
          <span>Valor</span>
          <span>Situação</span>
          {admin && <span>Ação</span>}
        </div>
        {records.map((invoice) => (
          <div className="invoice-row" key={invoice.id}>
            <div>
              <strong>{invoice.reference}</strong>
              {invoice.paidAt && <small>Pago em {invoice.paidAt}</small>}
            </div>
            <span>{invoice.dueDate}</span>
            <div>
              <strong>{money.format(invoice.amount - (invoice.discount ?? 0))}</strong>
              {invoice.discount && <small>Desconto: {money.format(invoice.discount)}</small>}
            </div>
            <span className={`invoice-status ${invoice.status}`}>
              {statusLabel[invoice.status]}
            </span>
            {admin && (
              <div>
                {invoice.status === "pending" ? (
                  <button className="small-action" onClick={() => onMarkPaid?.(invoice.id)}>
                    Confirmar pagamento
                  </button>
                ) : (
                  <span className="confirmed-label"><Check /> Confirmado</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {!admin && (
        <p className="finance-note">
          <BadgeCheck /> Pagamentos são confirmados manualmente pela equipe Shift.
          Nenhuma cobrança é feita por este portal.
        </p>
      )}
    </section>
  );
}
