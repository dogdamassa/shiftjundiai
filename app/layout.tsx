import type { Metadata } from "next";
import { Archivo, Archivo_Black, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

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

export const metadata: Metadata = {
  // metadataBase usa o domínio canônico (siteConfig.url) para que og:image,
  // canonical e demais URLs absolutas apontem sempre para produção — inclusive
  // em deploys de preview, que não devem ser indexados nem compartilhados.
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
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
