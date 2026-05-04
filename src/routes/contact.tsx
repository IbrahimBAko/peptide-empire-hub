import { createFileRoute } from "@tanstack/react-router";
import { CONTACT, mailLink, tgLink, waLink } from "@/lib/contact";
import { Mail, MessageCircle, Send, Clock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Peptide Empire" },
      { name: "description", content: "Reach Peptide Empire specialists directly via WhatsApp, Telegram or Email for instant pricing and discreet ordering." },
      { property: "og:title", content: "Contact — Peptide Empire" },
      { property: "og:description", content: "Direct, private channels with our specialists." },
    ],
  }),
  component: ContactPage,
});

const channels = [
  {
    name: "WhatsApp",
    desc: "Fastest response. End-to-end encrypted.",
    handle: CONTACT.phoneDisplay,
    href: waLink(),
    icon: MessageCircle,
    color: "#25D366",
  },
  {
    name: "Telegram",
    desc: "Discreet messaging worldwide.",
    handle: `@${CONTACT.telegram}`,
    href: tgLink(),
    icon: Send,
    color: "#229ED9",
  },
  {
    name: "Email",
    desc: "For detailed inquiries & invoicing.",
    handle: CONTACT.email,
    href: mailLink(),
    icon: Mail,
    color: "oklch(0.78 0.13 80)",
  },
];

function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Direct Channels</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">
        Speak with a <span className="text-gradient-gold">specialist</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
        Choose the channel you prefer — every message is read by a member of our research team, not a bot.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {channels.map((c) => (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-border bg-[var(--gradient-card)] p-8 hover:border-gold/50 hover:shadow-[var(--shadow-luxury)] transition"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: c.color, color: "#000" }}
            >
              <c.icon size={22} />
            </span>
            <h2 className="mt-5 font-display text-2xl">{c.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            <p className="mt-4 text-gold text-sm font-medium break-all">{c.handle}</p>
            <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground group-hover:text-gold transition">
              Open {c.name} →
            </p>
          </a>
        ))}
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 flex gap-4">
          <Clock className="text-gold flex-shrink-0" />
          <div>
            <h3 className="font-display text-lg">24 / 7 Availability</h3>
            <p className="text-sm text-muted-foreground mt-1">
              We respond around the clock. Average reply time under 15 minutes.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 flex gap-4">
          <ShieldCheck className="text-gold flex-shrink-0" />
          <div>
            <h3 className="font-display text-lg">Total Confidentiality</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Conversations are private. Orders are shipped in plain, unmarked packaging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}