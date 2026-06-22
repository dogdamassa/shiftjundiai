import { siteConfig } from "@/lib/site";
import type { ServiceLandingContent } from "@/lib/service-pages";

/**
 * Dado estruturado das landing pages de serviço:
 *  - Service: descreve o serviço (provider aponta para o LocalBusiness da home);
 *  - BreadcrumbList: hierarquia Início › Página, para o breadcrumb na busca;
 *  - FAQPage: perguntas e respostas em formato legível por máquina (útil para IA
 *    e busca; o rich result de FAQ do Google foi descontinuado, mas o markup
 *    segue válido e ajuda o entendimento da página).
 */
export function ServiceJsonLd({ content }: { content: ServiceLandingContent }) {
  const pageUrl = `${siteConfig.url}/${content.slug}`;

  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: content.serviceName,
      description: content.serviceDescription,
      serviceType: content.serviceName,
      url: pageUrl,
      areaServed: { "@type": "City", name: "Jundiaí" },
      // Referencia o nó LocalBusiness definido na home (mesmo @id).
      provider: { "@id": `${siteConfig.url}/#business` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: content.serviceName, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map((qa) => ({
        "@type": "Question",
        name: qa.question,
        acceptedAnswer: { "@type": "Answer", text: qa.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Conteúdo estático vindo do nosso próprio dado (sem input do usuário).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
