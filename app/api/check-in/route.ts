import { NextResponse } from "next/server";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { bookingId?: string };

  if (!body.bookingId) {
    return NextResponse.json(
      { error: "Reserva não informada." },
      { status: 400 },
    );
  }

  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      { ok: true, demo: true, message: "Check-in demonstrativo confirmado." },
      { status: 201 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { data, error } = await supabase.rpc("check_in_booking", {
    p_booking_id: body.bookingId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 409 });
  }

  return NextResponse.json({ ok: true, attendanceId: data }, { status: 201 });
}
