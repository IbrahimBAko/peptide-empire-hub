import { createFileRoute } from "@tanstack/react-router";
import { ContactButtons } from "@/components/contact-buttons";
import { Microscope, Globe2, Lock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Peptide Empire" },
      { name: "description", content: "Peptide Empire delivers verified-purity research peptides backed by independent testing, discreet shipping, and specialist support." },
      { property: "og:title", content: "About — Peptide Empire" },
      { property: "og:description", content: "An empire built on purity, discretion and trust." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Our Empire</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl max-w-3xl leading-tight">
        Built on <span className="text-gradient-gold">purity</span>, discretion and trust.
      </h1>
      <div className="mt-10 grid gap-12 md:grid-cols-2 items-start">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Peptide Empire was founded by a circle of researchers and clinicians who refused to compromise on quality. Today we serve laboratories, physicians and discerning enthusiasts across the globe with peptides synthesized in cGMP facilities and verified by independent third parties.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Every vial that bears our seal is HPLC-tested, lyophilized for stability and shipped in plain, tracked packaging. Our specialists are reachable directly — no chatbots, no queues — through WhatsApp and Email.
        </p>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-2">
        {[
          { icon: Microscope, t: "Independent Testing", d: "Every batch HPLC-verified by accredited third-party laboratories." },
          { icon: Lock, t: "Discreet by Design", d: "Plain packaging, encrypted communications, total client confidentiality." },
          { icon: Globe2, t: "Worldwide Dispatch", d: "Tracked shipments to 60+ countries, dispatched within 48 hours." },
          { icon: Sparkles, t: "Specialist Support", d: "Direct access to our research team for protocol and product questions." },
        ].map((f) => (
          <div key={f.t} className="rounded-xl border border-border bg-[var(--gradient-card)] p-6 hover:border-gold/50 transition">
            <f.icon className="text-gold" size={28} />
            <h3 className="mt-4 font-display text-2xl">{f.t}</h3>
            <p className="mt-2 text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 rounded-2xl border border-gold/30 bg-[var(--gradient-card)] p-10 text-center">
        <h2 className="font-display text-3xl md:text-4xl">Speak with a specialist</h2>
        <p className="mt-3 text-muted-foreground">Open a private channel — instant pricing & lot certificates.</p>
        <div className="mt-6 flex justify-center"><ContactButtons /></div>
      </div>
    </div>
  );
}