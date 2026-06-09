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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
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
    title: "Shift Jundiaí",
    description:
      "Não é academia. É uma experiência de treino criada para a sua evolução.",
    locale: "pt_BR",
    type: "website",
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
