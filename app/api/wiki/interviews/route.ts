import { NextResponse } from "next/server";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  questionsForRole,
  type WikiAnswer,
  type WikiRespondentRole,
} from "@/lib/wiki";
import { transcribeWikiAudio } from "@/lib/wiki-ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const configuredToken = process.env.WIKI_INTERVIEW_TOKEN;
  const token = String(formData.get("token") ?? "");
  if (configuredToken && token !== configuredToken) {
    return NextResponse.json({ error: "Link de entrevista inválido." }, { status: 403 });
  }

  const respondentName = String(formData.get("respondentName") ?? "").trim();
  const respondentTitle = String(formData.get("respondentTitle") ?? "").trim();
  const role = String(formData.get("role") ?? "") as WikiRespondentRole;
  if (!respondentName || !respondentTitle || !["owner", "leader"].includes(role)) {
    return NextResponse.json({ error: "Preencha sua identificação." }, { status: 400 });
  }

  const questions = questionsForRole(role);
  const hasAnyAnswer = questions.some((question) => {
    const text = String(formData.get(`answer:${question.id}`) ?? "").trim();
    return (
      text ||
      formData.getAll(`option:${question.id}`).length > 0 ||
      formData.get(`audio:${question.id}`) instanceof File
    );
  });
  if (!hasAnyAnswer) {
    return NextResponse.json({ error: "Responda pelo menos uma pergunta." }, { status: 400 });
  }

  if (!hasSupabaseEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = createAdminClient();
  const interviewId = crypto.randomUUID();
  const answers: WikiAnswer[] = [];

  for (const question of questions) {
    const text = String(formData.get(`answer:${question.id}`) ?? "").trim();
    const selectedOptions = formData
      .getAll(`option:${question.id}`)
      .map((value) => String(value).trim())
      .filter(Boolean);
    const optionsText = selectedOptions.length
      ? `Marcado no formulário: ${selectedOptions.join("; ")}.`
      : "";
    const audio = formData.get(`audio:${question.id}`);
    let audioUrl: string | undefined;

    if (audio instanceof File && audio.size > 0) {
      const extension = audio.name.split(".").pop() || "webm";
      const path = `${interviewId}/${question.id}.${extension}`;
      const { error: uploadError } = await supabase.storage
        .from("wiki-interview-audio")
        .upload(path, audio, { contentType: audio.type, upsert: true });
      if (uploadError) {
        return NextResponse.json({ error: "Falha ao salvar uma gravação." }, { status: 500 });
      }
      audioUrl = path;
      if (!text) {
        const transcription = await transcribeWikiAudio(audio);
        if (transcription) {
          answers.push({
            questionId: question.id,
            question: question.prompt,
            category: question.category,
            text: [optionsText, transcription].filter(Boolean).join("\n"),
            audioUrl,
          });
          continue;
        }
      }
    }

    if (text || optionsText || audioUrl) {
      answers.push({
        questionId: question.id,
        question: question.prompt,
        category: question.category,
        text: [optionsText, text].filter(Boolean).join("\n"),
        audioUrl,
      });
    }
  }

  const { error } = await supabase.from("wiki_interviews").insert({
    id: interviewId,
    respondent_name: respondentName,
    respondent_role: role,
    respondent_title: respondentTitle,
    answers,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true, id: interviewId });
}
