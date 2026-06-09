import { CalendarPlus, HeartPulse, MessageCircle } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/dashboard-ui";
import { credits } from "@/lib/demo-data";
import { whatsappUrl } from "@/lib/site";

export default function StudentServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cuidado integrado"
        title="Serviços e créditos."
        description="Organize suas sessões complementares e cuide da sua evolução por inteiro."
      />
      <div className="services-grid">
        {credits.map((credit) => (
          <article className="service-card" key={credit.service}>
            <div className="service-card-top">
              <HeartPulse />
              <span>{credit.available} disponível</span>
            </div>
            <h2>{credit.service}</h2>
            <p>{credit.detail}.</p>
            {credit.nextRenewal && (
              <small>Próxima liberação: {credit.nextRenewal}</small>
            )}
            {credit.available > 0 ? (
              <Link className="dash-button primary wide" href="/aluno/agenda">
                <CalendarPlus /> Agendar agora
              </Link>
            ) : (
              <a
                className="dash-button secondary wide"
                href={whatsappUrl(
                  `Olá! Gostaria de consultar uma sessão adicional de ${credit.service}.`,
                )}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle /> Falar com a equipe
              </a>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
