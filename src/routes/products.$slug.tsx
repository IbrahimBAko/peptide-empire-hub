import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ShieldCheck, FlaskConical, AlertTriangle } from "lucide-react";
import { products } from "@/lib/products";
import { CoaViewer, LabVerifiedBadge } from "@/components/coa-viewer";
import { AddToCart } from "@/components/add-to-cart";
import { ContactButtons } from "@/components/contact-buttons";
import { seoMeta, canonical, breadcrumbLd, abs } from "@/lib/site";

// Search-optimized titles/descriptions for high-demand, low-difficulty
// "buy <compound>" queries (Semrush US data, Oct 2026).
const productSeoOverrides: Record<string, { title: string; description: string }> = {
  retatrutide: {
    title: "Buy Retatrutide — ≥99% Purity Research Peptide | Peptide Empire",
    description:
      "Buy retatrutide research peptide online: ≥99.0% purity, published Certificate of Analysis, multiple pack sizes with clear pricing. Lab-verified, research use only.",
  },
  "bpc-157": {
    title: "Buy BPC-157 — Lab-Tested Research Peptide | Peptide Empire",
    description:
      "Buy BPC-157 (Body Protection Compound) research peptide: 2 mg, 5 mg and 10 mg vials, purity-tested with Certificate of Analysis available. Research use only.",
  },
  "tb-500": {
    title: "Buy TB-500 — Thymosin Beta-4 Research Peptide | Peptide Empire",
    description:
      "Buy TB-500 (Thymosin Beta-4 fragment) research peptide: 2 mg, 5 mg and 10 mg vials, purity-tested with Certificate of Analysis available. Research use only.",
  },
};

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: ({ params }) => {
    const p = products.find((x) => x.slug === params.slug);
    if (!p) return { meta: [{ title: "Product not found — Peptide Empire" }] };
    const path = `/products/${p.slug}`;
    const prices = (p.variants ?? []).map((v) => v.price).filter((n) => n > 0);
    const override = productSeoOverrides[p.slug];
    return {
      meta: seoMeta({
        title: override?.title ?? `${p.name} Research Peptide — ${p.purity} Purity | Peptide Empire`,
        description:
          override?.description ??
          `${p.name} for laboratory research: ${p.tagline}. ${p.purity} purity${p.coa ? ", Certificate of Analysis published" : ""}, pack sizes and pricing. Research use only.`.slice(0, 300),
        path,
        type: "website",
      }),
      links: canonical(path),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Research Catalog", path: "/products" },
              { name: p.name, path },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            url: abs(path),
            ...(p.image ? { image: abs(String(p.image)) } : {}),
            description: p.description,
            brand: { "@type": "Brand", name: "Peptide Empire" },
            ...(prices.length
              ? {
                  offers: {
                    "@type": "AggregateOffer",
                    priceCurrency: "USD",
                    lowPrice: Math.min(...prices),
                    highPrice: Math.max(...prices),
                    offerCount: prices.length,
                    availability: "https://schema.org/InStock",
                    url: abs(path),
                  },
                }
              : {}),
          }),
        },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/products" className="mt-6 inline-block text-gold">Back to catalog →</Link>
    </div>
  ),
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = products.find((x) => x.slug === slug);
  if (!p) throw notFound();
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <nav className="text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-gold">Home</Link> / <Link to="/products" className="hover:text-gold">Catalog</Link> / <span className="text-foreground">{p.name}</span>
      </nav>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
          <img src={p.image} alt={`${p.name} research peptide vial — Peptide Empire`} width={1024} height={1024} className="w-full h-auto object-cover" />
          {p.coa && <span className="absolute top-3 right-3"><LabVerifiedBadge /></span>}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{p.category}</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">{p.name} Research Peptide</h1>
          <p className="mt-2 text-gold">{p.tagline}</p>
          <p className="mt-5 text-muted-foreground leading-relaxed">{p.description}</p>

          {p.packs && p.packs.length > 0 && (
            <section className="mt-6">
              <h2 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 flex items-center gap-1.5">
                <FlaskConical size={12} className="text-gold" /> Specifications
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {p.packs.map((pk) => (
                  <span key={pk.strength + pk.pack} className="text-[11px] px-2 py-1 rounded border border-gold/30 bg-gold/5 text-gold/90 font-medium">
                    {pk.strength} <span className="text-gold/60">{pk.pack}</span>
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className="mt-6">
            <h2 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Quality &amp; handling</h2>
            <ul className="space-y-1.5">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground"><Check size={14} className="text-gold mt-0.5" /> {h}</li>
              ))}
              <li className="flex items-start gap-2 text-sm text-muted-foreground"><ShieldCheck size={14} className="text-gold mt-0.5" /> Purity: {p.purity}</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Certificate of Analysis</h2>
            {p.coa ? <CoaViewer coaUrl={p.coa} productName={p.name} /> : (
              <p className="text-sm text-muted-foreground">Contact us for current documentation for this compound.</p>
            )}
          </section>

          <div className="mt-8 pt-5 border-t border-border">
            {p.variants && p.variants.length > 0 && <div className="mb-4"><AddToCart product={p} /></div>}
            <ContactButtons size="sm" message={`Hello, I'd like pricing, specifications and lead times for ${p.name}.`} />
          </div>

          <div className="mt-6 rounded-lg border border-border bg-card/50 p-3 flex gap-2">
            <AlertTriangle size={14} className="text-gold mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Supplied for laboratory research use only. Not for human or veterinary consumption. No dosage or protocol guidance is provided.
            </p>
          </div>
          <Link to="/blog/how-to-verify-a-peptide-supplier" className="mt-4 inline-block text-xs uppercase tracking-widest text-gold hover:text-gold-bright">
            How to verify a peptide supplier →
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl">Related {p.category} compounds</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} to="/products/$slug" params={{ slug: r.slug }} className="rounded-xl border border-border p-4 hover:border-gold/50 transition">
                <div className="font-display text-lg">{r.name}</div>
                <div className="text-xs text-gold mt-1">{r.tagline}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
