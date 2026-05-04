import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { ContactButtons } from "@/components/contact-buttons";
import { products } from "@/lib/products";
import { ShieldCheck, FlaskConical, Truck, Award, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Peptide Empire — Premium Research Peptides" },
      { name: "description", content: "Pharmaceutical-grade research peptides — Retatrutide, Tirzepatide, Semaglutide, GHK-Cu, Glow Blend, MOTS-C. Discreet worldwide shipping." },
      { property: "og:title", content: "Peptide Empire — Premium Research Peptides" },
      { property: "og:description", content: "Verified-purity peptides. Order direct via WhatsApp, Telegram or Email." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Glowing peptide chains in laboratory"
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Pharmaceutical-Grade Research Peptides
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">
            The Empire of <span className="text-gradient-gold">Premium Peptides</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Verified ≥ 99% purity. Independently tested. Discreetly shipped worldwide. Trusted by clinicians, researchers and connoisseurs.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold-bright px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:brightness-110 transition"
            >
              Explore Catalog <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-foreground hover:border-gold hover:text-gold transition"
            >
              Contact Specialist
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {[
              { k: "99%+", v: "Verified Purity" },
              { k: "10K+", v: "Orders Shipped" },
              { k: "48h", v: "Global Dispatch" },
              { k: "24/7", v: "Direct Support" },
            ].map((s) => (
              <div key={s.v} className="border-l border-gold/40 pl-4">
                <div className="font-display text-3xl text-gradient-gold">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "Lab Verified", d: "Every batch HPLC tested by independent third parties." },
            { icon: FlaskConical, t: "Pharma Grade", d: "Lyophilized peptides synthesized in cGMP facilities." },
            { icon: Truck, t: "Discreet Shipping", d: "Plain packaging, tracked dispatch within 48 hours." },
            { icon: Award, t: "Connoisseur Trusted", d: "Preferred by elite clinicians and research labs." },
          ].map((f) => (
            <div
              key={f.t}
              className="rounded-xl border border-border bg-[var(--gradient-card)] p-6 hover:border-gold/50 transition"
            >
              <f.icon className="text-gold" size={28} />
              <h3 className="mt-4 font-display text-xl">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">The Collection</p>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Featured Peptides</h2>
          </div>
          <Link to="/products" className="text-sm text-gold hover:underline inline-flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.slice(0, 3).map((p) => (
            <div key={p.slug} className="rounded-xl border border-border bg-[var(--gradient-card)] p-6 hover:border-gold/50 hover:shadow-[var(--shadow-luxury)] transition">
              <div className="text-xs uppercase tracking-widest text-gold">{p.category}</div>
              <h3 className="mt-2 font-display text-2xl">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span>Purity {p.purity}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{p.size}</span>
              </div>
              <Link
                to="/products"
                className="mt-5 inline-flex items-center gap-1 text-sm text-gold hover:underline"
              >
                Order now <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-2xl border border-gold/30 bg-[var(--gradient-card)] p-10 md:p-16 text-center shadow-[var(--shadow-luxury)]">
          <h2 className="font-display text-3xl md:text-5xl">
            Order Direct. <span className="text-gradient-gold">Ship Tomorrow.</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Speak with a specialist now via your preferred channel — instant pricing, lot certificates and discreet dispatch.
          </p>
          <div className="mt-8 flex justify-center">
            <ContactButtons size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
