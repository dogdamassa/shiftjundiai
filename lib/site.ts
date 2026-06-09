export const siteConfig = {
  name: "Shift",
  tagline: "Performance & Resultados",
  address: "Av. 9 de Julho, 3290 - Loja 4, Centro, Jundiaí - SP",
  instagram: "https://www.instagram.com/shift.estudiojundiai/",
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ??
    "5511973771914",
};

export function whatsappUrl(
  message = "Olá! Conheci a Shift pelo site e gostaria de agendar uma visita.",
) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
