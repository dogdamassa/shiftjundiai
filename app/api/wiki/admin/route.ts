import { NextResponse } from "next/server";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/wiki-server";
import type { WikiAnswer } from "@/lib/wiki";

export async function GET() {
  if (!hasSupabaseEnv()) {
    return NextResponse.json({ interviews: [], entries: [], events: [] });
  }
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const admin = createAdminClient();
  const [interviewsResult, entriesResult, eventsResult] = await Promise.all([
    admin.from("wiki_interviews").select("*").order("submitted_at", { ascending: false }),
    admin.from("wiki_entries").select("*").order("updated_at", { ascending: false }),
    admin.from("wiki_agent_events").select("*").order("created_at", { ascending: false }).limit(30),
  ]);

  const error = interviewsResult.error || entriesResult.error || eventsResult.error;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({
    interviews: interviewsResult.data,
    entries: entriesResult.data,
    events: eventsResult.data,
  });
}

export async function POST(request: Request) {
  if (!hasSupabaseEnv()) return NextResponse.json({ ok: true, demo: true });
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = (await request.json()) as { action?: string; interviewId?: string };
  if (body.action !== "create-drafts" || !body.interviewId) {
    return NextResponse.json({ error: "Ação inválida." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: interview, error } = await admin
    .from("wiki_interviews")
    .select("*")
    .eq("id", body.interviewId)
    .single();
  if (error || !interview) {
    return NextResponse.json({ error: error?.message ?? "Entrevista não encontrada." }, { status: 404 });
  }

  const answers = (interview.answers ?? []) as WikiAnswer[];
  const rows = answers
    .filter((answer) => answer.text.trim())
    .map((answer) => ({
      category: answer.category,
      title: answer.question,
      content: answer.text,
      source_role: interview.respondent_role,
      source_interview_id: interview.id,
      status: "draft",
    }));

  if (rows.length) {
    const { error: insertError } = await admin.from("wiki_entries").insert(rows);
    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 400 });
  }
  await admin
    .from("wiki_interviews")
    .update({ status: "reviewed", reviewed_at: new Date().toISOString() })
    .eq("id", interview.id);
  return NextResponse.json({ ok: true, created: rows.length });
}

export async function PATCH(request: Request) {
  if (!hasSupabaseEnv()) return NextResponse.json({ ok: true, demo: true });
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = (await request.json()) as {
    entryId?: string;
    title?: string;
    content?: string;
    category?: string;
    status?: "draft" | "approved" | "archived";
  };
  if (!body.entryId) {
    return NextResponse.json({ error: "Item não informado." }, { status: 400 });
  }

  const update: Record<string, unknown> = {
    title: body.title,
    content: body.content,
    category: body.category,
    status: body.status,
  };
  if (body.status === "approved") {
    update.approved_by = auth.user.id;
    update.approved_at = new Date().toISOString();
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("wiki_entries")
    .update(update)
    .eq("id", body.entryId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

