import { PageHeader } from "@/components/dashboard-ui";
import { AnnouncementManager } from "@/components/announcement-manager";

export default function AdminAnnouncementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Comunicação com alunos"
        title="Feed de recados."
        description="Publique novidades, fixe avisos importantes e controle o período de exibição."
      />
      <AnnouncementManager />
    </>
  );
}
