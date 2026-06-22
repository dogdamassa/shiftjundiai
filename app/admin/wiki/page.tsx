import { WikiAdmin } from "@/components/wiki-admin";
import { PageHeader } from "@/components/dashboard-ui";

export default function AdminWikiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Agente Shift"
        title="Wiki e atendimento."
        description="Revise o conhecimento oficial e acompanhe as perguntas do bot."
      />
      <WikiAdmin />
    </>
  );
}

