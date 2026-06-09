import { NextResponse } from "next/server";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function PUT(request: Request) {
  const body = (await request.json()) as {
    headline?: string;
    description?: string;
    whatsapp?: string;
    address?: string;
  };

  if (!hasSupabaseEnv()) {
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Acesso restrito." }, { status: 403 });
  }

  const { error } = await supabase.from("site_content").upsert([
    {
      key: "hero",
      value: {
        headline: body.headline,
        description: body.description,
      },
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    },
    {
      key: "contact",
      value: {
        whatsapp: body.whatsapp,
        address: body.address,
      },
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
