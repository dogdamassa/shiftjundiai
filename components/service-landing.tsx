import Link from "next/link";
import { ArrowDownRight, ArrowRight, Check, MapPin } from "lucide-react";
import { ServiceJsonLd } from "@/components/service-jsonld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { relatedServicePages, type ServiceLandingContent } from "@/lib/service-pages";
import { directionsUrl, siteConfig, whatsappUrl } from "@/lib/site";

/**
 * Template visual das landing pages de intenção local (Pilar 2 do SEO).
 * Recebe o conteúdo já gerado/revisado e renderiza no mesmo padrão da marca,
 * reaproveitando as classes do design system. Os arquivos de rota só fornecem
 * o conteúdo e o metadata.
 */
export function ServiceLanding({ content }: { content: ServiceLandingContent }) {
  const related = relatedServicePages(content.slug);
  const waMessage = `Olá! Vim pela página de ${content.keyword} no site da Shift e gostaria de saber mais.`;

  return (
    <main className="marketing-page service-page">
      <ServiceJsonLd content={content} />
      <SiteHeader />

      <section className="service-hero">
        <div className="service-hero-inner">
          <span className="eyebrow orange">{content.heroEyebrow}</span>
          <h1>{content.h1}</h1>
          <p className="service-hero-sub">{content.heroSubcopy}</p>
          <div className="hero-actions">
            <a
              className="button button-primary button-large"
              href={whatsappUrl(waMessage)}
              target="_blank"
              rel="noreferrer"
            >
              Agende uma visita <ArrowDownRight />
            </a>
            <Link className="button button-ghost button-large" href="/">
              Conheça a Shift
            </Link>
          </div>
        </div>
      </section>

      <section className="service-intro section">
        <p>{content.introBlock}</p>
      </section>

      <section className="service-blocks section">
        {content.sections.map((block) => (
          <article key={block.title}>
            <h2>{block.title}</h2>
            <p>{block.body}</p>
          </article>
        ))}
      </section>

      <section className="service-whofor section">
        <div className="section-heading">
          <div>
            <span className="eyebrow orange">Para quem é</span>
            <h2>{content.whoForTitle}</h2>
          </div>
        </div>
        <ul className="check-list">
          {content.whoForItems.map((item) => (
            <li key={item}>
              <Check /> {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="service-faq section">
        <div className="section-heading">
          <div>
            <span className="eyebrow orange">Perguntas frequentes</span>
            <h2>O QUE AS PESSOAS PERGUNTAM</h2>
          </div>
        </div>
        <div className="service-faq-list">
          {content.faq.map((qa) => (
            <details key={qa.question}>
              <summary>{qa.question}</summary>
              <p>{qa.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="service-related section">
        <span className="eyebrow orange">Continue explorando</span>
        <div className="service-related-grid">
          {related.map((page) => (
            <Link key={page.slug} href={`/${page.slug}`} className="service-related-card">
              <span>{page.navLabel}</span>
              <ArrowRight />
            </Link>
          ))}
          <Link href="/professores" className="service-related-card">
            <span>Conheça os professores</span>
            <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="final-cta">
        <div>
          <span className="eyebrow">Sua mudança começa aqui</span>
          <h2>{content.ctaHeading}</h2>
          <a
            className="service-cta-address"
            href={directionsUrl()}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={16} /> {siteConfig.address}
          </a>
        </div>
        <a
          className="button button-light button-large"
          href={whatsappUrl(waMessage)}
          target="_blank"
          rel="noreferrer"
        >
          Agende sua visita <ArrowDownRight />
        </a>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
