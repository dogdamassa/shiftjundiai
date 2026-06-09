import { MoreHorizontal, Plus, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/dashboard-ui";

export default function AdminTeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pessoas e acessos"
        title="Equipe."
        description="Gerencie profissionais, especialidades e permissões."
        action={
          <button className="dash-button primary">
            <Plus /> Novo profissional
          </button>
        }
      />
      <div className="team-grid">
        {[
          ["Rafael Mendes", "Professor", "34 alunos", "RM", "Público no site"],
          ["Paula Torres", "Professora", "29 alunos", "PT", "Público no site"],
          ["Camila Nunes", "Recovery", "24 sessões", "CN", "Público no site"],
          ["Lucas Prado", "Fisioterapeuta", "18 pacientes", "LP", "Público no site"],
          ["Beatriz Lima", "Nutricionista", "22 pacientes", "BL", "Somente portal"],
          ["Ana Ferreira", "Administradora", "Acesso total", "AF", "Somente portal"],
        ].map(([name, role, meta, initials, visibility]) => (
          <article key={name}>
            <div className="avatar team-avatar">{initials}</div>
            <button aria-label="Mais opções">
              <MoreHorizontal />
            </button>
            <h2>{name}</h2>
            <span>{role}</span>
            <p>{meta}</p>
            <small>
              <ShieldCheck /> Acesso ativo
            </small>
            <small className="team-visibility">{visibility}</small>
          </article>
        ))}
      </div>
    </>
  );
}
