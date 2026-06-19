import { siteConfig } from "@/lib/site";

/**
 * Dado estruturado (schema.org HealthClub) para SEO local.
 * É isto que ajuda o Google a entender que a Shift é uma academia/estúdio
 * físico em Jundiaí, com endereço, telefone e horário de funcionamento —
 * insumo direto para a busca local e para o painel do Google Business.
 */
export function LocalBusinessJsonLd() {
  const { addressParts } = siteConfig;

  const jsonLd = {
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
    logo: `${siteConfig.url}/icon.svg`,
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
    areaServed: {
      "@type": "City",
      name: "Jundiaí",
    },
    hasMap:
      "https://maps.google.com/?q=Av.+9+de+Julho,+3290,+Jundiaí",
    sameAs: [siteConfig.instagram],
    openingHoursSpecification: siteConfig.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
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
