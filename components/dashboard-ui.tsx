import type { LucideIcon } from "lucide-react";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <span className="dashboard-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </header>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  accent?: boolean;
}) {
  return (
    <article className={accent ? "metric-card accent" : "metric-card"}>
      <div className="metric-icon">
        <Icon />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

export function Panel({
  title,
  subtitle,
  href,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`dashboard-panel ${className}`}>
      <header className="panel-header">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {href && (
          <Link href={href}>
            Ver tudo <ArrowRight />
          </Link>
        )}
      </header>
      {children}
    </section>
  );
}

export function ListLink({
  href,
  title,
  subtitle,
  meta,
  leading,
}: {
  href: string;
  title: string;
  subtitle: string;
  meta?: string;
  leading?: React.ReactNode;
}) {
  return (
    <Link className="list-link" href={href}>
      {leading && <div className="list-leading">{leading}</div>}
      <div className="list-copy">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
      {meta && <small>{meta}</small>}
      <ChevronRight />
    </Link>
  );
}
