import { mailLink, tgLink, waLink } from "@/lib/contact";
import { Mail, MessageCircle, Send } from "lucide-react";

type Props = {
  message?: string;
  size?: "sm" | "md" | "lg";
  variant?: "row" | "stack";
};

export function ContactButtons({ message, size = "md", variant = "row" }: Props) {
  const sizing =
    size === "lg"
      ? "px-6 py-3 text-base"
      : size === "sm"
        ? "px-3 py-2 text-xs"
        : "px-4 py-2.5 text-sm";
  const layout = variant === "stack" ? "flex flex-col gap-3 w-full" : "flex flex-wrap gap-3";
  return (
    <div className={layout}>
      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${sizing} inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] text-black font-medium hover:brightness-110 transition shadow-md`}
      >
        <MessageCircle size={16} /> WhatsApp
      </a>
      <a
        href={tgLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${sizing} inline-flex items-center justify-center gap-2 rounded-md bg-[#229ED9] text-white font-medium hover:brightness-110 transition shadow-md`}
      >
        <Send size={16} /> Telegram
      </a>
      <a
        href={mailLink("Peptide Order Inquiry", message ?? "Hello, I'd like to order:")}
        target="_blank"
        rel="noopener noreferrer"
        className={`${sizing} inline-flex items-center justify-center gap-2 rounded-md border border-gold/40 bg-card text-foreground font-medium hover:border-gold hover:text-gold transition`}
      >
        <Mail size={16} /> Gmail
      </a>
    </div>
  );
}