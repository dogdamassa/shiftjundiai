import { AnnouncementFeed } from "@/components/announcement-feed";
import { PageHeader } from "@/components/dashboard-ui";

export default function StudentAnnouncementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shift informa"
        title="Recados."
        description="Novidades, horários especiais e experiências preparadas para os alunos."
      />
      <AnnouncementFeed />
    </>
  );
}
