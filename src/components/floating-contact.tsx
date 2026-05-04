import { CONTACT, tgLink, waLink } from "@/lib/contact";
import { MessageCircle, Send } from "lucide-react";

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="h-14 w-14 rounded-full bg-[#25D366] text-black flex items-center justify-center shadow-[0_8px_30px_oklch(0_0_0/0.5)] hover:scale-110 transition-transform"
      >
        <MessageCircle size={26} />
      </a>
      <a
        href={tgLink()}
        target="_blank"
        rel="noreferrer"
        aria-label={`Telegram @${CONTACT.telegram}`}
        className="h-14 w-14 rounded-full bg-[#229ED9] text-white flex items-center justify-center shadow-[0_8px_30px_oklch(0_0_0/0.5)] hover:scale-110 transition-transform"
      >
        <Send size={26} />
      </a>
    </div>
  );
}