import type { Metadata } from "next";
import { Archivo, Archivo_Black, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const condensedFont = Archivo({
  subsets: ["latin"],
  variable: "--font-condensed",
});

// URL absoluta do site — usada para montar a og:image que o WhatsApp/Instagram
// precisam buscar. Em produção (Vercel) cai no domínio de produção; sem isso o
// preview tentaria carregar a imagem de localhost e não apareceria nada.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shift Jundiaí | Performance & Resultados",
    template: "%s | Shift Jundiaí",
  },
  description:
    "Treinamento personalizado, acompanhamento profissional e estrutura premium na Avenida 9 de Julho, em Jundiaí.",
  keywords: [
    "academia Jundiaí",
    "personal trainer Jundiaí",
    "treino personalizado",
    "recovery Jundiaí",
    "Shift Jundiaí",
  ],
  openGraph: {
    title: "Shift Jundiaí — Onde mudar é só o começo",
    description:
      "Não é academia. É uma experiência de treino criada para a sua evolução.",
    url: "/",
    siteName: "Shift Jundiaí",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/og-shift.jpg",
        width: 1200,
        height: 630,
        alt: "Shift Jundiaí — Onde mudar é só o começo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shift Jundiaí — Onde mudar é só o começo",
    description:
      "Não é academia. É uma experiência de treino criada para a sua evolução.",
    images: ["/images/og-shift.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${condensedFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
