import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactButtons } from "@/components/contact-buttons";
import { Microscope, Globe2, Lock, Sparkles, FileCheck2, Building2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Peptide Empire" },
      { name: "description", content: "Who Peptide Empire is, who we supply, what documentation we publish, and how we handle contact and privacy." },
      { property: "og:title", content: "About — Peptide Empire" },
      { property: "og:description", content: "A research-materials supplier: what we do, who we serve, and how we operate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const facts = [
  {
    icon: Building2,
    t: "What we are",
    d: "A supplier of peptide materials for laboratory research. We are not a pharmacy, clinic or medical provider, and we do not offer medical advice, dosage or administration guidance.",
  },
  {
    icon: Microscope,
    t: "Who we serve",
    d: "Research laboratories, academic groups, and authorized distributors purchasing research materials for professional, non-clinical use.",
  },
  {
    icon: FileCheck2,
    t: "What documentation exists",
    d: "Where a testing laboratory has issued a Certificate of Analysis for a product, we publish it in full on the Documentation page. For everything else, availability is confirmed on request.",
  },
  {
    icon: Lock,
    t: "How privacy is handled",
    d: "We collect only what an inquiry needs, use it to answer and fulfil that inquiry, and do not sell or share it for marketing. Shipments go out in plain, unmarked packaging.",
  },
  {
    icon: Globe2,
    t: "How ordering works",
    d: "There is no automated checkout. You send a request list, a specialist confirms pricing, availability and logistics, and nothing is arranged until you approve it.",
  },
  {
    icon: Sparkles,
    t: "How to reach us",
    d: "WhatsApp and email reach our team directly. Messages are read by a person, and inquiries are typically answered within one business day.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">About the company</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05]">
          A research supplier, <span className="text-gradient-gold">described plainly</span>.
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          Peptide Empire supplies peptide materials for laboratory research and publishes the laboratory documentation it receives. Everything on this page describes how we actually operate — where a detail depends on your order or destination, we confirm it with you rather than state it here.
        </p>
      </header>

      <section aria-label="Company facts" className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {facts.map((f) => (
          <article key={f.t} className="bg-card p-7 md:p-8">
            <f.icon className="text-gold" size={24} aria-hidden="true" />
            <h2 className="mt-5 font-display text-xl md:text-2xl">{f.t}</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
          </article>
        ))}
      </section>

      <section className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-2xl md:text-3xl">Scope and limits</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            All catalog items are supplied strictly for laboratory research. They are not medicines, supplements or foods, and they are not for human or veterinary consumption. We make no claim that any product can diagnose, prevent, treat or cure any condition.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl md:text-3xl">Buyer responsibility</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Buyers confirm that possession and use of a given material is lawful where they are, and that it will be handled under qualified supervision in an appropriate facility. If a material is restricted in your jurisdiction, we cannot supply it.
          </p>
        </div>
      </section>

      <section className="mt-20 rounded-2xl border border-gold/30 bg-[var(--gradient-card)] p-8 md:p-12 text-center">
        <h2 className="font-display text-2xl md:text-4xl">Speak with a specialist</h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Ask about documentation, availability or logistics. You can also browse the{" "}
          <Link to="/documentation" className="text-gold hover:underline">documentation library</Link> or the{" "}
          <Link to="/faq" className="text-gold hover:underline">FAQ</Link> first.
        </p>
        <div className="mt-8 flex justify-center"><ContactButtons /></div>
      </section>
    </div>
  );
}
