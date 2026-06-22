import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/service-pages";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  return [
    {
      url: base,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Páginas de intenção local (Pilar 2) — alta prioridade por serem de
    // conversão. A lista vem do registro central (lib/service-pages.ts).
    ...servicePages.map((page) => ({
      url: `${base}/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${base}/professores`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
