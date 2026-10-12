import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactButtons } from "@/components/contact-buttons";
import { seoMeta, canonical, SITE_URL } from "@/lib/site";

const PATH = "/blog/how-to-verify-a-peptide-supplier";

export const Route = createFileRoute("/blog/how-to-verify-a-peptide-supplier")({
  head: () => ({
    meta: seoMeta({
      title: "How to Verify a Research Peptide Supplier — Peptide Empire",
      description:
        "A practical checklist for judging whether a research peptide supplier is legitimate: Certificates of Analysis, HPLC and mass-spec results, batch matching, transparency and red flags.",
      path: PATH,
      type: "article",
    }),
    links: canonical(PATH),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to Verify a Research Peptide Supplier",
          author: { "@type": "Organization", name: "Peptide Empire" },
          publisher: { "@type": "Organization", name: "Peptide Empire" },
          mainEntityOfPage: `${SITE_URL}${PATH}`,
        }),
      },
    ],
  }),
  component: Guide,
});

const checks = [
  ["Ask for a Certificate of Analysis (COA)", "A legitimate supplier can show a COA for each compound. It should name the compound, the testing laboratory, the test dates and the measured purity — not just a marketing claim."],
  ["Check the test methods", "Look for HPLC (purity) and, ideally, mass spectrometry (identity). Purity without identity confirmation only tells half the story."],
  ["Match the batch", "The batch or lot number on the COA should correspond to what you receive. Ask the supplier if you are unsure."],
  ["Look at the dates", "Testing and sample-received dates should be recent and plausible. Very old or undated reports are a warning sign."],
  ["Test the communication", "Send a question before ordering. A real supplier answers clearly about specifications, shipping and documentation."],
  ["Read the restrictions", "Reputable research suppliers state plainly that products are for laboratory research only and never give dosing advice."],
];

const redFlags = [
  "No COA, or a COA that looks identical across different products",
  "Claims of medical benefits or dosing instructions",
  "No way to contact a real person",
  "Prices far below every other supplier with no explanation",
];

function Guide() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Buyer's Guide</p>
      <h1 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05]">How to verify a research peptide supplier</h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        "Is this supplier legit?" is one of the most common questions researchers ask. Here is a simple checklist you can apply to any supplier — including us.
      </p>

      <h2 className="mt-12 font-display text-3xl">Six checks before you order</h2>
      <ol className="mt-6 space-y-6">
        {checks.map(([t, d], i) => (
          <li key={t} className="flex gap-4">
            <span className="font-display text-2xl text-gold w-8 flex-shrink-0">{i + 1}</span>
            <div>
              <h3 className="font-medium text-foreground">{t}</h3>
              <p className="mt-1 text-muted-foreground leading-relaxed">{d}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-12 font-display text-3xl">Red flags</h2>
      <ul className="mt-4 list-disc pl-6 space-y-2 text-muted-foreground">
        {redFlags.map((r) => <li key={r}>{r}</li>)}
      </ul>

      <h2 className="mt-12 font-display text-3xl">How Peptide Empire handles this</h2>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Where a Certificate of Analysis is on file, it is published on the product page for you to view and download. See our{" "}
        <Link to="/documentation" className="text-gold hover:underline">documentation page</Link> for how we present testing, browse the{" "}
        <Link to="/products" className="text-gold hover:underline">research catalog</Link>, or read{" "}
        <Link to="/blog/what-are-research-peptides" className="text-gold hover:underline">what research peptides are</Link>.
      </p>

      <div className="mt-12 rounded-2xl border border-border bg-card/50 p-6">
        <p className="text-sm text-muted-foreground mb-4">Have a documentation question? Ask us before you order.</p>
        <ContactButtons size="sm" message="Hello, I have a question about documentation for a product." />
      </div>
    </article>
  );
}
