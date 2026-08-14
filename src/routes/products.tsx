import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, type Product } from "@/lib/products";
import { ContactButtons } from "@/components/contact-buttons";
import { CoaViewer, LabVerifiedBadge } from "@/components/coa-viewer";
import { AddToCart } from "@/components/add-to-cart";
import { ProductDetailModal } from "@/components/product-detail-modal";
import { Check, Search, FlaskConical } from "lucide-react";
import { seoMeta, canonical, breadcrumbLd } from "@/lib/site";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: seoMeta({
      title: "Research Catalog — Peptide Empire",
      description:
        "Search the Peptide Empire research catalog by name or category. Each listing shows pack sizes, specifications and whether a Certificate of Analysis is published. Laboratory research use only.",
      path: "/products",
    }),
    links: canonical("/products"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Research Catalog", path: "/products" },
          ]),
        ),
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [active, setActive] = useState<Product | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>(products.map((p) => p.category));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const matchQ = !s || p.name.toLowerCase().includes(s) || p.tagline.toLowerCase().includes(s) || p.category.toLowerCase().includes(s);
      return matchCat && matchQ;
    });
  }, [q, cat]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-3xl animate-fade-up">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Research Catalog</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Premium Research Peptides</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Independently HPLC-verified, lyophilized for stability, dispatched globally with COA documentation. Catalog presented for institutional, laboratory and wholesale inquiry — pricing confirmed by specialist on request.
        </p>
      </div>

      {/* Search + filters */}
      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search peptides…"
            className="w-full rounded-full border border-border bg-card/60 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border transition ${
                cat === c ? "border-gold bg-gold/15 text-gold" : "border-border text-muted-foreground hover:border-gold/40 hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{filtered.length} of {products.length} products</p>

      {filtered.length === 0 ? (
        <div className="mt-20 text-center text-muted-foreground">
          <FlaskConical className="mx-auto text-gold/60 mb-3" size={32} />
          No peptides matched your search.
        </div>
      ) : (
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, idx) => (
            <article
              key={p.slug}
              style={{ animationDelay: `${Math.min(idx * 60, 400)}ms` }}
              className="group tilt-card flex flex-col rounded-2xl border border-border bg-[var(--gradient-card)] overflow-hidden hover:border-gold/50 hover:shadow-[var(--shadow-luxury)] transition-all duration-500 animate-fade-up cursor-pointer"
              onClick={() => setActive(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(p);
                }
              }}
            >
              <div className="relative h-60 overflow-hidden bg-card">
                <img
                  src={p.image}
                  alt={`${p.name} research peptide vial — Peptide Empire`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

                {/* Label badge — product name overlay */}
                <div className="absolute bottom-3 left-3 right-3 rounded-md border border-gold/30 bg-background/70 backdrop-blur px-3 py-2 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.25em] text-gold/80">Peptide Empire</div>
                    <div className="font-display text-sm leading-tight text-foreground">{p.name}</div>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.purity}</div>
                </div>

                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest text-gold border border-gold/40 bg-background/60 backdrop-blur px-2 py-1 rounded">
                  {p.category}
                </span>
                {p.coa && (
                  <span className="absolute top-3 right-3">
                    <LabVerifiedBadge />
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-2xl">{p.name}</h2>
                <p className="mt-1 text-sm text-gold">{p.tagline}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.description}</p>

                {/* Specifications */}
                {p.packs && p.packs.length > 0 && (
                  <div className="mt-4">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Specifications</div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.packs.map((pk) => (
                        <span key={pk.strength} className="text-[11px] px-2 py-1 rounded border border-gold/30 bg-gold/5 text-gold/90 font-medium">
                          {pk.strength} <span className="text-gold/60">{pk.pack}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <ul className="mt-4 space-y-1.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check size={12} className="text-gold mt-0.5 flex-shrink-0" /> {h}
                    </li>
                  ))}
                </ul>

                {p.coa && (
                  <div className="mt-4 rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                    <p className="text-[10px] uppercase tracking-widest text-emerald-300 mb-2">Certificate of Analysis</p>
                    <div onClick={(e) => e.stopPropagation()}>
                      <CoaViewer coaUrl={p.coa} productName={p.name} />
                    </div>
                  </div>
                )}

                <div className="mt-5 pt-4 border-t border-border" onClick={(e) => e.stopPropagation()}>
                  {p.variants && p.variants.length > 0 && (
                    <div className="mb-4">
                      <AddToCart product={p} />
                    </div>
                  )}
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Or Request Information</p>
                  <ContactButtons
                    size="sm"
                    message={`Hello, I'd like to request institutional pricing and lead times for ${p.name}.`}
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); setActive(p); }}
                    className="mt-3 w-full text-[11px] uppercase tracking-widest text-gold hover:text-gold-bright transition"
                  >
                    View Full Details →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="mt-16 text-center text-xs text-muted-foreground max-w-xl mx-auto">
        All products are sold strictly for laboratory research and institutional procurement. Not for human consumption. Pricing confirmed by specialist.
      </p>

      <ProductDetailModal
        product={active}
        open={!!active}
        onOpenChange={(o) => !o && setActive(null)}
      />
    </div>
  );
}
