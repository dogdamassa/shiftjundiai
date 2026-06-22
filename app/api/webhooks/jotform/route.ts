import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { questionsForRole, type WikiAnswer, type WikiRespondentRole } from "@/lib/wiki";

type JotformAnswer = {
  name?: string;
  answer?: string | string[] | Record<string, string>;
};

function answerText(value: JotformAnswer["answer"]) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.join(", ");
  if (value && typeof value === "object") return Object.values(value).join(" ");
  return "";
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const expectedSecret = process.env.JOTFORM_WEBHOOK_SECRET;
  if (expectedSecret && url.searchParams.get("secret") !== expectedSecret) {
    return NextResponse.json({ error: "Webhook inválido." }, { status: 403 });
  }
  const formData = await request.formData();
  const raw = String(formData.get("rawRequest") ?? "{}");
  const submissionId = String(formData.get("submissionID") ?? "");
  const parsed = JSON.parse(raw) as { answers?: Record<string, JotformAnswer> };
  const values = Object.values(parsed.answers ?? {});
  const byName = new Map(values.map((item) => [item.name, answerText(item.answer)]));
  const role = (byName.get("respondentRole") === "leader" ? "leader" : "owner") as WikiRespondentRole;
  const answers: WikiAnswer[] = questionsForRole(role).flatMap((question) => {
    const text = byName.get(question.id) ?? "";
    return text
      ? [{ questionId: question.id, question: question.prompt, category: question.category, text }]
      : [];
  });

  if (!hasSupabaseEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ ok: true, demo: true });
  }
  const supabase = createAdminClient();
  const { error } = await supabase.from("wiki_interviews").upsert(
    {
      respondent_name: byName.get("respondentName") || "Respondente Jotform",
      respondent_title: byName.get("respondentTitle") || "Não informado",
      respondent_role: role,
      answers,
      jotform_submission_id: submissionId || undefined,
    },
    { onConflict: "jotform_submission_id" },
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

