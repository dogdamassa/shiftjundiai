import type { Metadata } from "next";
import { WikiInterviewForm } from "@/components/wiki-interview-form";

export const metadata: Metadata = {
  title: "Wiki LLM Shift",
  description: "Entrevista de conhecimento para o agente de atendimento da Shift.",
  robots: { index: false, follow: false },
};

export default async function WikiShiftPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return (
    <main className="wiki-interview-page">
      <WikiInterviewForm token={token} />
    </main>
  );
}

