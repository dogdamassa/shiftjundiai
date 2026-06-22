import { NextResponse } from "next/server";
import { parseIncomingWhatsApp, sendWhatsAppMessage } from "@/lib/whatsapp";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge ?? "", { status: 200 });
  }
  return new Response("Verification failed", { status: 403 });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const expectedSecret = process.env.WHATSAPP_WEBHOOK_SECRET;
  if (expectedSecret && url.searchParams.get("secret") !== expectedSecret) {
    return NextResponse.json({ error: "Webhook inválido." }, { status: 403 });
  }

  const payload = (await request.json()) as Record<string, unknown>;
  const incoming = parseIncomingWhatsApp(payload);
  if (!incoming) return NextResponse.json({ received: true });

  const agentResponse = await fetch(new URL("/api/wiki/agent", request.url), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: incoming.message,
      contactId: incoming.contactId,
      channel: "whatsapp",
      metadata: {
        webhook: true,
        provider: incoming.provider,
        senderName: incoming.senderName,
      },
    }),
  });
  const result = (await agentResponse.json()) as { answer?: string };

  if (result.answer) {
    await sendWhatsAppMessage(incoming.contactId, result.answer);
  }
  return NextResponse.json({ received: true, ...result });
}
