/**
 * Registro central das landing pages de intenção local (Pilar 2 do SEO).
 * Fonte única para: rotas, sitemap, links do rodapé e interlink "outros treinos"
 * entre as páginas. O conteúdo de cada página fica em `lib/landing-content.ts`.
 */
export type ServicePage = {
  /** Slug da rota (`/<slug>`). */
  slug: string;
  /** Texto âncora usado em links internos (rodapé / páginas relacionadas). */
  navLabel: string;
};

export const servicePages: ServicePage[] = [
  { slug: "personal-trainer-jundiai", navLabel: "Personal trainer em Jundiaí" },
  { slug: "musculacao-jundiai", navLabel: "Musculação em Jundiaí" },
  { slug: "recovery-jundiai", navLabel: "Recovery em Jundiaí" },
  { slug: "academia-centro-jundiai", navLabel: "Academia no centro de Jundiaí" },
];

/** Páginas relacionadas a um slug (todas menos ela mesma) — para interlinking. */
export function relatedServicePages(slug: string): ServicePage[] {
  return servicePages.filter((page) => page.slug !== slug);
}

/**
 * Conteúdo de uma landing page de serviço. Mesmo formato gerado/revisado pelo
 * workflow de SEO e consumido por `ServiceLanding` e `ServiceJsonLd`.
 */
export type ServiceLandingContent = {
  /** Slug da rota — casa com um `servicePages[].slug`. */
  slug: string;
  /** Palavra-chave principal (intenção de busca) da página. */
  keyword: string;
  /** `<title>` (o template adiciona "| Shift Jundiaí"). */
  metaTitle: string;
  /** Meta description (~140–158 caracteres). */
  metaDescription: string;
  /** H1 da página. */
  h1: string;
  /** Etiqueta curta acima do H1. */
  heroEyebrow: string;
  /** Subtítulo do hero (1–2 frases). */
  heroSubcopy: string;
  /** Bloco "citável" de abertura (130–160 palavras) para snippet/IA. */
  introBlock: string;
  /** Seções de corpo (título + texto). */
  sections: { title: string; body: string }[];
  /** Título da seção "para quem é". */
  whoForTitle: string;
  /** Perfis/usos atendidos. */
  whoForItems: string[];
  /** Perguntas frequentes (vira conteúdo + schema FAQPage). */
  faq: { question: string; answer: string }[];
  /** Nome do serviço para schema.org/Service. */
  serviceName: string;
  /** Descrição curta do serviço para o schema. */
  serviceDescription: string;
  /** Chamada final para agendar pelo WhatsApp. */
  ctaHeading: string;
};
