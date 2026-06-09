import { NextResponse } from "next/server";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      { ok: true, demo: true, message: "Reserva simulada com sucesso." },
      { status: 201 },
    );
  }

  const body = (await request.json()) as {
    slotId?: string;
  };

  if (!body.slotId) {
    return NextResponse.json(
      { error: "Horário não informado." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { data, error } = await supabase.rpc("book_session", {
    p_slot_id: body.slotId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 409 });
  }

  return NextResponse.json({ ok: true, bookingId: data }, { status: 201 });
}

export async function DELETE(request: Request) {
  const body = (await request.json()) as {
    bookingId?: string;
    reason?: string;
  };

  if (!body.bookingId) {
    return NextResponse.json(
      { error: "Reserva não informada." },
      { status: 400 },
    );
  }

  if (!hasSupabaseEnv()) {
    return NextResponse.json({
      ok: true,
      demo: true,
      message: "Cancelamento demonstrativo concluído.",
    });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { error } = await supabase.rpc("cancel_booking", {
    p_booking_id: body.bookingId,
    p_reason: body.reason ?? null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}
