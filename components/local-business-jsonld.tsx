import { siteConfig } from "@/lib/site";

/**
 * Dado estruturado (schema.org HealthClub) para SEO local.
 * É isto que ajuda o Google a entender que a Shift é uma academia/estúdio
 * físico em Jundiaí, com endereço, telefone e horário de funcionamento —
 * insumo direto para a busca local e para o painel do Google Business.
 */
export function LocalBusinessJsonLd() {
  const { addressParts } = siteConfig;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["HealthClub", "ExerciseGym"],
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.legalName,
    alternateName: "Shift Jundiaí",
    description:
      "Estúdio de treino personalizado em Jundiaí com acompanhamento profissional, musculação, recovery e estrutura premium na Av. 9 de Julho.",
    url: siteConfig.url,
    telephone: siteConfig.phone,
    image: `${siteConfig.url}/images/og-shift.jpg`,
    logo: `${siteConfig.url}/icon.png`,
    priceRange: "$$$",
    currenciesAccepted: "BRL",
    address: {
      "@type": "PostalAddress",
      streetAddress: addressParts.street,
      addressLocality: addressParts.locality,
      addressRegion: addressParts.region,
      ...(addressParts.postalCode
        ? { postalCode: addressParts.postalCode }
        : {}),
      addressCountry: addressParts.country,
    },
    // Coordenadas do pin — sinal direto de localização para a busca no Maps.
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: {
      "@type": "City",
      name: "Jundiaí",
    },
    hasMap: siteConfig.mapsUrl,
    // Perfis oficiais que confirmam a identidade do negócio (Instagram + GBP
    // quando disponível). `filter(Boolean)` remove links ainda não preenchidos.
    sameAs: [siteConfig.instagram, siteConfig.googleBusiness].filter(Boolean),
    openingHoursSpecification: siteConfig.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    // Avaliações agregadas só entram com dados reais (siteConfig.rating). Sem
    // isso, nada é emitido — evita schema com review inventado (penalizável).
    ...(siteConfig.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: siteConfig.rating.ratingValue,
            reviewCount: siteConfig.rating.reviewCount,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      // O conteúdo é estático e construído a partir do siteConfig (sem input
      // do usuário), então não há risco de injeção aqui.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
