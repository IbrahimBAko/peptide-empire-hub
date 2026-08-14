import { createFileRoute } from "@tanstack/react-router";
import { CONTACT, mailLink, waLink } from "@/lib/contact";
import { Mail, MessageCircle, Clock, ShieldCheck, FileCheck2, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { seoMeta, canonical } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: seoMeta({
      title: "Contact Peptide Empire — WhatsApp and Email Inquiries",
      description:
        "Contact the Peptide Empire team by WhatsApp or email to ask about availability, documentation, pricing or logistics. Messages are read by a person.",
      path: "/contact",
    }),
    links: canonical("/contact"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Peptide Empire",
          url: "https://peptide-empire-hub.lovable.app/contact",
        }),
      },
    ],
  }),
  component: ContactPage,
});

const channels = [
  {
    name: "WhatsApp",
    desc: "Fastest response, read by a member of our team.",
    handle: CONTACT.phoneDisplay,
    href: waLink(),
    icon: MessageCircle,
    color: "#25D366",
  },
  {
    name: "Email",
    desc: "For detailed inquiries, documentation requests and invoicing.",
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
        Choose the channel you prefer — every message is read by a member of our team, not a bot. Tell us the product, quantity and destination and we will confirm pricing, availability, documentation and logistics.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {channels.map((c) => (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
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
          <Clock className="text-gold flex-shrink-0" aria-hidden="true" />
          <div>
            <h3 className="font-display text-lg">Response time</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Inquiries are typically answered within one business day, and usually much faster on WhatsApp.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 flex gap-4">
          <ShieldCheck className="text-gold flex-shrink-0" aria-hidden="true" />
          <div>
            <h3 className="font-display text-lg">Privacy</h3>
            <p className="text-sm text-muted-foreground mt-1">
              We collect only what your inquiry requires and use it to answer and fulfil that inquiry. Shipments go out in plain, unmarked packaging.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 flex gap-4">
          <FileCheck2 className="text-gold flex-shrink-0" aria-hidden="true" />
          <div>
            <h3 className="font-display text-lg">Documentation requests</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Published Certificates of Analysis are in the{" "}
              <Link to="/documentation" className="text-gold hover:underline">documentation library</Link>. For anything not published there, ask us and we will confirm what is currently available.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 flex gap-4">
          <MapPin className="text-gold flex-shrink-0" aria-hidden="true" />
          <div>
            <h3 className="font-display text-lg">Business details</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Peptide Empire operates as a remote supplier of research materials; there is no walk-in location. Registration and entity details are provided directly on request for institutional procurement.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-12 max-w-3xl text-xs text-muted-foreground leading-relaxed">
        All materials are supplied for laboratory research use only — not for human or veterinary consumption. We do not provide medical, dosage or administration advice. See the{" "}
        <Link to="/faq" className="text-gold hover:underline">FAQ</Link> for use, shipping, returns and privacy details.
      </p>
    </div>
  );
}