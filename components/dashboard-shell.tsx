"use client";

import {
  Activity,
  BadgeDollarSign,
  Bell,
  Bike,
  CalendarDays,
  ChevronLeft,
  ClipboardList,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Menu,
  ScanLine,
  Settings,
  Users,
  Bot,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import type { UserRole } from "@/lib/types";

const roleLinks = {
  trainer: [
    { href: "/professor", label: "Hoje", icon: LayoutDashboard },
    { href: "/professor/agenda", label: "Agenda", icon: CalendarDays },
    { href: "/professor/check-in", label: "Check-in", icon: ScanLine },
    { href: "/professor/alunos", label: "Meus alunos", icon: Users },
    { href: "/professor/treinos", label: "Treinos", icon: ClipboardList },
    { href: "/professor/avaliacoes", label: "Avaliações", icon: Activity },
  ],
  admin: [
    { href: "/admin", label: "Visão geral", icon: LayoutDashboard },
    { href: "/admin/agenda", label: "Agenda geral", icon: CalendarDays },
    { href: "/admin/aulas", label: "Flow & Move", icon: Bike },
    { href: "/admin/check-in", label: "Check-in", icon: ScanLine },
    { href: "/admin/alunos", label: "Alunos", icon: Users },
    { href: "/admin/financeiro", label: "Financeiro", icon: BadgeDollarSign },
    { href: "/admin/equipe", label: "Equipe", icon: Activity },
    { href: "/admin/servicos", label: "Serviços", icon: HeartPulse },
    { href: "/admin/recados", label: "Recados", icon: Bell },
    { href: "/admin/conteudo", label: "Site e conteúdo", icon: ClipboardList },
    { href: "/admin/wiki", label: "Wiki e agente", icon: Bot },
  ],
} satisfies Record<
  UserRole,
  Array<{ href: string; label: string; icon: typeof LayoutDashboard }>
>;

const roleMeta = {
  trainer: { name: "Rafael Mendes", label: "Professor", initials: "RM" },
  admin: { name: "Ana Ferreira", label: "Admin", initials: "AF" },
};

export function DashboardShell({
  role,
  children,
}: {
  role: UserRole;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const meta = roleMeta[role];

  return (
    <div className="dashboard-shell">
      <aside className={open ? "dashboard-sidebar open" : "dashboard-sidebar"}>
        <div className="sidebar-brand">
          <BrandLogo compact />
          <button
            className="sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            <X />
          </button>
        </div>
        <nav className="dashboard-nav">
          <span className="nav-section-label">Menu</span>
          {roleLinks[role].map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== `/${role === "trainer" ? "professor" : role}` &&
                pathname.startsWith(`${item.href}/`));
            return (
              <Link
                className={active ? "active" : ""}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                <item.icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <Link href="/">
            <ChevronLeft /> Voltar ao site
          </Link>
          <Link href="/auth/signout">
            <LogOut /> Sair
          </Link>
          <div className="sidebar-profile">
            <div className="avatar avatar-small">{meta.initials}</div>
            <div>
              <strong>{meta.name}</strong>
              <span>{meta.label}</span>
            </div>
            <Settings />
          </div>
        </div>
      </aside>
      {open && (
        <button
          className="dashboard-scrim"
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
        />
      )}
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            className="dashboard-menu"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu />
          </button>
          <div className="topbar-mark">
            <span>SHIFT</span>
            <small>{meta.label}</small>
          </div>
          <div className="topbar-profile">
            <span>{meta.name}</span>
            <div className="avatar avatar-small">{meta.initials}</div>
          </div>
        </header>
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
