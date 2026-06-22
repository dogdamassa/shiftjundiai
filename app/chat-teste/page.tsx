import type { Metadata } from "next";
import { WikiChatTest } from "@/components/wiki-chat-test";

export const metadata: Metadata = {
  title: "Teste do agente · Shift",
  description: "Chat de teste do agente de WhatsApp da Shift.",
  robots: { index: false, follow: false },
};

export default function ChatTestePage() {
  return (
    <main>
      <WikiChatTest />
    </main>
  );
}
