import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDownRight, Instagram, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { publicProfessionals } from "@/lib/professionals";
import { whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Professores",
  description:
    "Conheça a equipe multidisciplinar de professores e especialistas da Shift Jundiaí.",
};

export default function ProfessionalsPage() {
  return (
    <main className="marketing-page professionals-page">
      <SiteHeader />
      <section className="professionals-hero">
        <div>
          <span className="eyebrow orange">O time por trás da evolução</span>
          <h1>QUEM CONHECE VOCÊ,<br /><em>MUDA O SEU TREINO.</em></h1>
          <p>
            Especialistas que combinam método, atenção e repertório para
            construir um processo verdadeiramente individual.
          </p>
        </div>
        <Sparkles />
      </section>
      <section className="professionals-grid section">
        {publicProfessionals.map((professional, index) => (
          <article key={professional.id}>
            <div className="professional-photo" style={{ position: "relative" }}>
              <Image
                src={professional.image}
                alt={professional.name}
                fill
                sizes="(max-width: 720px) 100vw, 50vw"
                style={{ objectPosition: professional.imagePosition }}
                priority={index < 2}
              />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="professional-copy">
              <span>{professional.role}</span>
              <h2>{professional.name}</h2>
              <p>{professional.bio}</p>
              <div className="specialty-tags">
                {professional.specialties.map((item) => <span key={item}>{item}</span>)}
              </div>
              <dl>
                <dt>Na Shift</dt>
                <dd>{professional.modalities.join(" · ")}</dd>
              </dl>
              {professional.instagram && (
                <a href="https://www.instagram.com/shift.estudiojundiai/" target="_blank" rel="noreferrer">
                  <Instagram /> {professional.instagram}
                </a>
              )}
            </div>
          </article>
        ))}
      </section>
      <section className="team-cta">
        <div>
          <span className="eyebrow">Encontre o seu próximo passo</span>
          <h2>VENHA CONHECER O TIME SHIFT.</h2>
        </div>
        <a className="button button-light button-large" href={whatsappUrl()} target="_blank" rel="noreferrer">
          Agende uma visita <ArrowDownRight />
        </a>
      </section>
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
