export const siteConfig = {
  name: "Shift",
  legalName: "Shift Estúdio Jundiaí",
  tagline: "Performance & Resultados",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://studioshift.com.br",
  address: "Av. 9 de Julho, 3290 - Loja 4 - Centro, Jundiaí - SP, 13201-019",
  // Link do Google Maps. Busca pelo nome do negócio, que já está cadastrado e
  // cai direto no pin oficial da Shift — mais preciso que buscar pelo endereço.
  mapsUrl: "https://maps.google.com/?q=Shift+Estúdio+Jundiaí",
  addressParts: {
    street: "Av. 9 de Julho, 3290 - Loja 4 - Centro",
    locality: "Jundiaí",
    region: "SP",
    postalCode: "13201-019",
    country: "BR",
  },
  // Telefone em formato internacional E.164 para o dado estruturado.
  phone: "+5511990130543",
  instagram: "https://www.instagram.com/shift.estudiojundiai/",
  // Link público do perfil no Google Business Profile (Maps). Preencher quando
  // tiver a URL do perfil — entra em `sameAs` do schema e ajuda o Google a casar
  // o site com o perfil do Maps (sinal local forte). Vazio = não é emitido.
  googleBusiness: "",
  // Coordenadas do pin confirmadas pelo Google Maps (23,18960° S / 46,88947° O).
  // Reforça o sinal de localização exata para a busca no Maps.
  geo: {
    latitude: -23.1896,
    longitude: -46.88947,
  },
  // Avaliações agregadas. Preencher SÓ com dados reais do GBP (nunca inventar):
  // ativa `aggregateRating` no schema, que pode render estrelas no resultado.
  // null = nenhuma avaliação emitida ainda.
  rating: null as null | { ratingValue: number; reviewCount: number },
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ??
    "5511990130543",
  // Horário de funcionamento (formato schema.org openingHoursSpecification).
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "06:00",
      closes: "22:00",
    },
    { days: ["Saturday"], opens: "08:00", closes: "12:00" },
  ],
};

export function whatsappUrl(
  message = "Olá! Conheci a Shift pelo site e gostaria de agendar uma visita.",
) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Link de navegação (rotas) até a Shift no Google Maps. Usa o nome do negócio,
 * que cai no pin oficial cadastrado — abre direto o "como chegar" a partir da
 * localização de quem clica. Usado nos endereços clicáveis do site.
 */
export function directionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    "Shift Estúdio Jundiaí",
  )}`;
}
