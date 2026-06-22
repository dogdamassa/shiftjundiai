import Link from "next/link";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { siteConfig, whatsappUrl } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <BrandLogo lockup variant="light" />
          <p>
            Estúdio de treino personalizado e musculação em Jundiaí.
            Método, direção e acompanhamento de verdade.
          </p>
        </div>
        <div>
          <span className="footer-label">Navegação</span>
          <Link href="/#metodo">Método Shift</Link>
          <Link href="/#estrutura">Estrutura</Link>
          <Link href="/professores">Professores</Link>
        </div>
        <div>
          <span className="footer-label">Fale com a Shift</span>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer">
            <MessageCircle size={17} /> WhatsApp
          </a>
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
            <Instagram size={17} /> Instagram
          </a>
          <p className="footer-address">
            <MapPin size={17} /> {siteConfig.address}
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Shift Jundiaí</span>
        <span>Não é academia. É Shift.</span>
      </div>
    </footer>
  );
}
