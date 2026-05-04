import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ContactButtons } from "@/components/contact-buttons";
import { Check } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Peptide Empire" },
      { name: "description", content: "Premium research peptides: Retatrutide, Tirzepatide, Semaglutide, GHK-Cu, Glow Blend, MOTS-C. Order direct." },
      { property: "og:title", content: "Products — Peptide Empire" },
      { property: "og:description", content: "Premium research peptides with verified purity. Order direct via WhatsApp, Telegram or Email." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">The Catalog</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Premium Peptides</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Each vial is independently HPLC-tested, lyophilized for stability, and dispatched discreetly. Tap any contact channel to place an order.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article
            key={p.slug}
            className="group flex flex-col rounded-2xl border border-border bg-[var(--gradient-card)] overflow-hidden hover:border-gold/50 hover:shadow-[var(--shadow-luxury)] transition"
          >
            <div className="relative h-56 overflow-hidden bg-card">
              <img
                src={p.image}
                alt={`${p.name} research peptide vial — Peptide Empire premium packaging`}
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/10 to-transparent" />
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-gold border border-gold/40 bg-background/60 backdrop-blur px-2 py-1 rounded">
                {p.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="font-display text-2xl">{p.name}</h2>
              <p className="mt-1 text-sm text-gold">{p.tagline}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              <ul className="mt-4 space-y-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="text-gold mt-0.5 flex-shrink-0" /> {h}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                <span>Purity {p.purity}</span>
              </div>
              {p.variants && p.variants.length > 0 && (
                <div className="mt-5 rounded-lg border border-border/60 bg-background/40 p-3">
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Sizes & Pricing</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {p.variants.map((v) => (
                      <div key={v.size} className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-card/60">
                        <span className="text-muted-foreground">{v.size}</span>
                        <span className="text-gold font-medium">${v.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                  {p.inquireOnly ? "Inquire via" : "Order via"}
                </p>
                <ContactButtons
                  size="sm"
                  message={
                    p.inquireOnly
                      ? `Hello, I'd like pricing and availability for ${p.name}.`
                      : `Hello, I'd like to order ${p.name}. Please confirm available sizes and total.`
                  }
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-16 text-center text-xs text-muted-foreground max-w-xl mx-auto">
        All products are sold strictly for laboratory research purposes. Not for human consumption.
      </p>
    </div>
  );
}