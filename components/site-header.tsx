"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { whatsappUrl } from "@/lib/site";

const links = [
  ["Método", "/#metodo"],
  ["Experiência", "/#experiencia"],
  ["Evolução", "/#evolucao"],
  ["Estrutura", "/#estrutura"],
  ["Localização", "/#localizacao"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <BrandLogo />
        <nav className={open ? "site-nav is-open" : "site-nav"}>
          {links.map(([label, href]) => (
            <Link href={href} key={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <a
            className="button button-primary nav-cta"
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
          >
            Agende uma visita
          </a>
        </nav>
        <button
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
