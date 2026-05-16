import { mailLink, waLink } from "@/lib/contact";
import { Mail, MessageCircle } from "lucide-react";

export function FloatingContact() {
  const items = [
    { href: waLink(), label: "WhatsApp", icon: MessageCircle, bg: "#25D366", fg: "#000" },
    { href: mailLink(), label: "Email", icon: Mail, bg: "oklch(0.78 0.13 80)", fg: "#000" },
  ];
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      {items.map((i) => (
        <a
          key={i.label}
          href={i.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={i.label}
          className="group relative h-13 w-13 md:h-14 md:w-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_oklch(0_0_0/0.55)] hover:scale-110 transition-transform animate-float"
          style={{ background: i.bg, color: i.fg }}
        >
          <span className="absolute inset-0 rounded-full opacity-60 blur-md -z-10" style={{ background: i.bg }} />
          <i.icon size={22} />
        </a>
      ))}
    </div>
  );
}