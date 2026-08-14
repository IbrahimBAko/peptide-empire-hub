import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { CoaViewer } from "@/components/coa-viewer";
import { ContactButtons } from "@/components/contact-buttons";
import { FileCheck2, FileQuestion, ShieldCheck } from "lucide-react";
import { seoMeta, canonical, breadcrumbLd } from "@/lib/site";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: seoMeta({
      title: "Certificates of Analysis & Documentation — Peptide Empire",
      description:
        "Browse the Certificates of Analysis published by product, and see how documentation availability is confirmed for items without a published report.",
      path: "/documentation",
    }),
    links: canonical("/documentation"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Documentation & Quality", path: "/documentation" },
          ]),
        ),
      },
    ],
  }),
  component: DocumentationPage,
});

function DocumentationPage() {
  const documented = products.filter((p) => p.coa);
  const undocumented = products.filter((p) => !p.coa);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Documentation &amp; Quality</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05]">
          Every document we hold, <span className="text-gradient-gold">published as received</span>.
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          This page lists the laboratory documentation supplied to us, associated with the product it belongs to. We publish documents exactly as issued by the testing laboratory — nothing is reconstructed, summarized or created in-house.
        </p>
      </header>

      <section aria-labelledby="published" className="mt-16">
        <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
          <h2 id="published" className="font-display text-2xl md:text-3xl flex items-center gap-2">
            <FileCheck2 className="text-gold" size={22} aria-hidden="true" /> Published documentation
          </h2>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">{documented.length} products</span>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documented.map((p) => (
            <li key={p.slug} className="rounded-2xl border border-border bg-[var(--gradient-card)] p-5 flex flex-col">
              <h3 className="font-display text-xl">{p.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{p.category}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Certificate of Analysis on file. Identifiers on the document are issued by the testing laboratory.
              </p>
              <div className="mt-5 pt-4 border-t border-border">
                <CoaViewer coaUrl={p.coa!} productName={p.name} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="on-request" className="mt-20">
        <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
          <h2 id="on-request" className="font-display text-2xl md:text-3xl flex items-center gap-2">
            <FileQuestion className="text-gold" size={22} aria-hidden="true" /> Documentation on request
          </h2>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">{undocumented.length} products</span>
        </div>
        <p className="mt-6 max-w-2xl text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground font-medium">Documentation availability: contact the company for current documentation.</strong>{" "}
          No Certificate of Analysis is published for the products below. We will confirm what is currently available for a specific item before you commit to anything.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {undocumented.map((p) => (
            <li key={p.slug} className="rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground">
              {p.name}
            </li>
          ))}
        </ul>
        <div className="mt-8"><ContactButtons size="sm" message="Hello, I'd like to ask which documentation is currently available for a product in your catalog." /></div>
      </section>

      <section className="mt-20 rounded-2xl border border-border bg-card/40 p-8 md:p-10">
        <h2 className="font-display text-2xl md:text-3xl flex items-center gap-2">
          <ShieldCheck className="text-gold" size={22} aria-hidden="true" /> How to read these documents
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { t: "Product association", d: "Each document is listed under a single product. Nothing is shown against a product it was not issued for." },
            { t: "Lot identifiers", d: "Documents carry the analyte and lot references assigned by the laboratory. Check them against the vial label on arrival." },
            { t: "Scope", d: "A Certificate of Analysis reports analytical findings only. It is not a safety, efficacy or fitness-for-use statement." },
          ].map((c) => (
            <div key={c.t}>
              <h3 className="font-medium text-foreground">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Questions about a specific lot? <Link to="/contact" className="text-gold hover:underline">Contact our team</Link> or read the <Link to="/faq" className="text-gold hover:underline">documentation FAQ</Link>.
        </p>
      </section>
    </div>
  );
}
