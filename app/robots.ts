import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Áreas internas (login, painéis, testes) não devem ser indexadas.
      // "/professor$" + "/professor/" bloqueiam o painel SEM bloquear a
      // página pública "/professores".
      disallow: [
        "/admin",
        "/login",
        "/auth",
        "/professor$",
        "/professor/",
        "/api",
        "/recuperar-senha",
        "/chat-teste",
        "/wiki-shift",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
