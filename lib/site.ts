export const siteConfig = {
  name: "Shift",
  legalName: "Shift Estúdio Jundiaí",
  tagline: "Performance & Resultados",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://studioshift.com.br",
  address: "Av. 9 de Julho, 3290 - Loja 4, Centro, Jundiaí - SP",
  addressParts: {
    street: "Av. 9 de Julho, 3290 - Loja 4",
    locality: "Jundiaí",
    region: "SP",
    // TODO: preencher com o CEP exato da loja (melhora o SEO local).
    postalCode: "",
    country: "BR",
  },
  // Telefone em formato internacional E.164 para o dado estruturado.
  phone: "+5511990130543",
  instagram: "https://www.instagram.com/shift.estudiojundiai/",
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
