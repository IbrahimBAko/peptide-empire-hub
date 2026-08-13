import { createFileRoute, Link } from "@tanstack/react-router";
import { faqs } from "@/lib/faq";
import { ContactButtons } from "@/components/contact-buttons";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Peptide Empire" },
      { name: "description", content: "Answers on intended use, eligibility, documentation, privacy, shipping, returns and support for Peptide Empire research materials." },
      { property: "og:title", content: "FAQ — Peptide Empire" },
      { property: "og:description", content: "Clear answers on use, documentation, shipping, privacy and support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const topics = Array.from(new Set(faqs.map((f) => f.topic)));
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Questions &amp; Answers</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05]">Frequently asked questions</h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          Every answer below reflects how we actually operate. Where something depends on your order or destination, we say so rather than guessing.
        </p>
      </header>

      <div className="mt-14 space-y-14">
        {topics.map((topic) => (
          <section key={topic} aria-labelledby={`topic-${topic.replace(/\W+/g, "-")}`}>
            <h2 id={`topic-${topic.replace(/\W+/g, "-")}`} className="text-xs uppercase tracking-[0.3em] text-gold border-b border-border pb-3">
              {topic}
            </h2>
            <dl className="mt-6 space-y-8">
              {faqs.filter((f) => f.topic === topic).map((f) => (
                <div key={f.q}>
                  <dt className="font-display text-xl md:text-2xl leading-snug">{f.q}</dt>
                  <dd className="mt-3 text-muted-foreground leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <div className="mt-20 rounded-2xl border border-gold/30 bg-[var(--gradient-card)] p-8 md:p-10 text-center">
        <h2 className="font-display text-2xl md:text-3xl">Still need an answer?</h2>
        <p className="mt-3 text-muted-foreground">
          A specialist will answer directly. You can also review our{" "}
          <Link to="/documentation" className="text-gold hover:underline">documentation library</Link>.
        </p>
        <div className="mt-6 flex justify-center"><ContactButtons /></div>
      </div>
    </div>
  );
}
