import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar com a Shift no WhatsApp"
    >
      <MessageCircle />
      <span>Fale com a Shift</span>
    </a>
  );
}
