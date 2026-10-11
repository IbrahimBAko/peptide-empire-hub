import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactButtons } from "@/components/contact-buttons";
import { seoMeta, canonical, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/blog/what-are-research-peptides")({
  head: () => ({
    meta: seoMeta({
      title: "What Are Research Peptides? A Laboratory Guide — Peptide Empire",
      description:
        "What research peptides are, how they are used in clinical and laboratory research, and why HPLC-verified purity and published documentation matter when sourcing them.",
      path: "/blog/what-are-research-peptides",
    }),
    links: canonical("/blog/what-are-research-peptides"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What Are Research Peptides? A Laboratory Guide",
          description:
            "An educational guide to research peptides: what they are, their role in clinical research, and why HPLC-verified purity matters.",
          author: { "@type": "Organization", name: "Peptide Empire" },
          publisher: { "@type": "Organization", name: "Peptide Empire" },
          mainEntityOfPage: `${SITE_URL}/blog/what-are-research-peptides`,
        }),
      },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Educational Guide</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05]">
          What are research peptides?
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          Peptides are short chains of amino acids — the same building blocks that make up
          proteins. In laboratory and clinical research, synthetic peptides are used as
          precise tools to study biological processes, receptor behavior, and metabolic
          pathways.
        </p>
      </header>

      <div className="mt-14 space-y-14">
        <section aria-labelledby="what-are-peptides">
          <h2 id="what-are-peptides" className="text-xs uppercase tracking-[0.3em] text-gold border-b border-border pb-3">
            The basics
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A peptide is a molecule made of two or more amino acids linked by peptide
              bonds. Chains of roughly 2–50 amino acids are generally called peptides;
              longer chains are proteins. Because peptides are small and highly specific,
              researchers use them to probe individual signaling pathways without the
              complexity of full proteins.
            </p>
            <p>
              Research peptides are synthesized in laboratories, typically by solid-phase
              peptide synthesis, and supplied as lyophilized (freeze-dried) powders for
              stability during storage and transport.
            </p>
          </div>
        </section>

        <section aria-labelledby="role-in-research">
          <h2 id="role-in-research" className="text-xs uppercase tracking-[0.3em] text-gold border-b border-border pb-3">
            Their role in clinical research
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Peptides appear across many areas of published research: metabolic studies,
              tissue repair models, growth-hormone signaling, skin and collagen research,
              and neuroendocrine investigations. Compounds such as BPC-157, TB-500,
              semaglutide, and the GHK-Cu copper peptide each have substantial published
              literature behind them.
            </p>
            <p>
              Materials sold for research use are intended strictly for in-vitro and
              laboratory investigation by qualified institutions. They are not medicines,
              supplements, or products for human or veterinary use, and they are not
              approved to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </section>

        <section aria-labelledby="purity-matters">
          <h2 id="purity-matters" className="text-xs uppercase tracking-[0.3em] text-gold border-b border-border pb-3">
            Why HPLC-verified purity matters
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Research results are only as reliable as the materials behind them. Impure
              or misidentified peptides can invalidate an entire study. That is why
              serious laboratories source materials verified by high-performance liquid
              chromatography (HPLC) and mass spectrometry (MS), with a certificate of
              analysis (COA) published for each batch.
            </p>
            <p>
              At Peptide Empire, every product is supplied with its laboratory
              documentation exactly as received from the testing laboratory, so you can
              verify purity and identity before the material ever enters your workflow.
              You can review examples in our{" "}
              <Link to="/documentation" className="text-gold underline underline-offset-4 hover:opacity-80">
                documentation library
              </Link>
              .
            </p>
          </div>
        </section>

        <section aria-labelledby="sourcing">
          <h2 id="sourcing" className="text-xs uppercase tracking-[0.3em] text-gold border-b border-border pb-3">
            Sourcing research materials
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              When evaluating a supplier, look for batch-specific COAs, stated purity
              (typically ≥98% by HPLC), proper cold-chain handling, and clear
              research-use-only terms. Our{" "}
              <Link to="/products" className="text-gold underline underline-offset-4 hover:opacity-80">
                product catalog
              </Link>{" "}
              lists purity, pack sizes, and documentation for every item, and our{" "}
              <Link to="/faq" className="text-gold underline underline-offset-4 hover:opacity-80">
                FAQ
              </Link>{" "}
              explains eligibility, shipping, and handling.
            </p>
          </div>
        </section>
      </div>

      <footer className="mt-16 border-t border-border pt-10">
        <p className="text-muted-foreground leading-relaxed">
          Questions about a specific compound or its documentation? Our support team
          answers directly.
        </p>
        <div className="mt-6">
          <ContactButtons />
        </div>
      </footer>
    </article>
  );
}
