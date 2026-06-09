import { PageHeader } from "@/components/dashboard-ui";
import { ContentEditor } from "@/components/content-editor";

export default function AdminContentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Site institucional"
        title="Conteúdo e contato."
        description="Atualize as informações principais sem precisar alterar o código."
      />
      <ContentEditor />
    </>
  );
}
