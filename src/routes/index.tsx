import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { ContactButtons } from "@/components/contact-buttons";
import { products } from "@/lib/products";
import {
  ShieldCheck, FlaskConical, Truck, Award, ArrowRight, Microscope,
  Globe2, BadgeCheck, ClipboardCheck, Beaker, Quote, ChevronDown,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Peptide Empire — Premium Research Peptides for Institutions" },
      { name: "description", content: "Pharmaceutical-grade research peptides — Tirzepatide, Semaglutide, Retatrutide, GHK-Cu, MOTS-C and more. HPLC verified. Global wholesale supply." },
      { property: "og:title", content: "Peptide Empire — Premium Research Peptides" },
      { property: "og:description", content: "Verified-purity peptides for laboratories and distributors. Direct via WhatsApp, Telegram or Email." },
    ],
  }),
  component: Index,
});

const featuredSlugs = ["tirzepatide", "semaglutide", "retatrutide", "ghk-cu", "mots-c", "glow-blend"];

function Index() {
  const featured = featuredSlugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Glowing peptide chains in laboratory" width={1920} height={1080} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-gold/10 blur-3xl animate-float" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-teal/20 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-40">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold backdrop-blur animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Premium Biotech · Research Grade
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl animate-fade-up">
            The Empire of <span className="text-gradient-gold">Premium Peptides</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "120ms" }}>
            HPLC-verified ≥ 99% purity. Independently certified. Discreetly supplied to laboratories, clinics and distributors in 60+ countries.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "240ms" }}>
            <Link to="/products" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold-bright px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:brightness-110 transition">
              Explore Catalog <ArrowRight size={16} />
            </Link>
            <Link to="/wholesale" className="inline-flex items-center gap-2 rounded-md border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-foreground hover:border-gold hover:text-gold transition">
              Wholesale Inquiry
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl animate-fade-up" style={{ animationDelay: "360ms" }}>
            {[
              { k: "99%+", v: "Verified Purity" },
              { k: "60+", v: "Countries Served" },
              { k: "48h", v: "Global Dispatch" },
              { k: "24/7", v: "Specialist Support" },
            ].map((s) => (
              <div key={s.v} className="border-l border-gold/40 pl-4">
                <div className="font-display text-3xl text-gradient-gold">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "Lab Verified", d: "Every batch HPLC tested by accredited third-party laboratories." },
            { icon: FlaskConical, t: "cGMP Synthesis", d: "Lyophilized peptides synthesized in pharmaceutical-grade facilities." },
            { icon: Truck, t: "Discreet Logistics", d: "Plain packaging, tracked dispatch, customs-managed worldwide." },
            { icon: Award, t: "Institutional Trust", d: "Preferred by clinicians, research labs and distributors." },
          ].map((f, i) => (
            <div key={f.t} style={{ animationDelay: `${i * 80}ms` }}
              className="rounded-xl border border-border bg-[var(--gradient-card)] p-6 hover:border-gold/50 hover:-translate-y-1 transition-all duration-500 animate-fade-up">
              <f.icon className="text-gold" size={28} />
              <h3 className="mt-4 font-display text-xl">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">The Collection</p>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Featured Peptides</h2>
          </div>
          <Link to="/products" className="text-sm text-gold hover:underline inline-flex items-center gap-1">
            View full catalog <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Link key={p.slug} to="/products" style={{ animationDelay: `${i * 70}ms` }}
              className="group rounded-xl border border-border bg-[var(--gradient-card)] overflow-hidden hover:border-gold/50 hover:shadow-[var(--shadow-luxury)] hover:-translate-y-1 transition-all duration-500 animate-fade-up">
              <div className="relative h-44 overflow-hidden">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 rounded border border-gold/30 bg-background/70 backdrop-blur px-2.5 py-1.5">
                  <div className="text-[8px] uppercase tracking-[0.25em] text-gold/80">Peptide Empire</div>
                  <div className="font-display text-sm text-foreground">{p.name}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-widest text-gold">{p.category}</div>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                {p.variants && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.variants.slice(0, 5).map((v) => (
                      <span key={v.size} className="text-[10px] px-1.5 py-0.5 rounded border border-gold/30 text-gold/90">{v.size}</span>
                    ))}
                  </div>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-gold group-hover:underline">
                  Inquire <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* QUALITY PROCESS */}
      <section className="mx-auto max-w-7xl px-6 py-20 border-t border-border/50">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Quality Control</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">From synthesis to certified vial.</h2>
          <p className="mt-4 text-muted-foreground">Five-stage process ensuring every batch meets institutional standards.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {[
            { icon: Beaker, t: "01 · Synthesis", d: "cGMP solid-phase peptide synthesis" },
            { icon: Microscope, t: "02 · HPLC", d: "Reverse-phase purity analysis" },
            { icon: ClipboardCheck, t: "03 · MS Verify", d: "Mass spectrometry confirmation" },
            { icon: BadgeCheck, t: "04 · COA", d: "Independent third-party certificate" },
            { icon: Truck, t: "05 · Dispatch", d: "Tracked global logistics" },
          ].map((s, i) => (
            <div key={s.t} style={{ animationDelay: `${i * 60}ms` }}
              className="rounded-xl border border-border bg-card/50 p-5 hover:border-gold/40 transition animate-fade-up">
              <s.icon className="text-gold" size={22} />
              <div className="mt-3 text-[10px] uppercase tracking-widest text-gold">{s.t.split(" · ")[0]}</div>
              <div className="font-display text-lg mt-1">{s.t.split(" · ")[1]}</div>
              <p className="mt-2 text-xs text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl border border-border bg-[var(--gradient-card)] p-8 md:p-12 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Global Supply</p>
            <h2 className="mt-2 font-display text-4xl">Trusted on six continents.</h2>
            <p className="mt-4 text-muted-foreground">From Singapore to São Paulo, our logistics network delivers temperature-stable peptides to research institutions, clinics, and authorized distributors worldwide.</p>
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
              {[{ k: "60+", v: "Countries" }, { k: "10K+", v: "Shipments" }, { k: "99.4%", v: "On-time" }].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-2xl text-gradient-gold">{s.k}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-xl border border-gold/20 bg-background/40 overflow-hidden flex items-center justify-center">
            <Globe2 className="text-gold/30 animate-float" size={220} />
            <div className="absolute inset-0 shimmer-gold opacity-40" />
            <div className="absolute bottom-4 left-4 right-4 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
              Global Distribution Network
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Voices of Research</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Trusted by professionals.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { q: "Consistent purity batch after batch. Their COA documentation is the most thorough we've worked with.", a: "Dr. M. Halvorsen", r: "Research Lead, Clinical Endocrinology" },
            { q: "Logistics are flawless. Cold-chain shipments to our facility have arrived intact every single time.", a: "Aisha R.", r: "Procurement, Compounding Pharmacy" },
            { q: "The wholesale program made it possible to scale our distribution across three regions in under six months.", a: "J. Okafor", r: "Regional Distributor, EMEA" },
          ].map((t, i) => (
            <div key={i} style={{ animationDelay: `${i * 100}ms` }}
              className="rounded-2xl border border-border bg-[var(--gradient-card)] p-6 animate-fade-up">
              <Quote className="text-gold" size={22} />
              <p className="mt-4 text-sm text-foreground/90 leading-relaxed">{t.q}</p>
              <div className="mt-5 pt-4 border-t border-border">
                <div className="text-sm font-semibold text-gold">{t.a}</div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-0.5">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Buyer Confidence</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Frequently asked.</h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-2xl border border-gold/30 bg-[var(--gradient-card)] p-10 md:p-16 text-center shadow-[var(--shadow-luxury)] relative overflow-hidden">
          <div className="absolute inset-0 shimmer-gold opacity-20 pointer-events-none" />
          <h2 className="relative font-display text-3xl md:text-5xl">
            Open a <span className="text-gradient-gold">private channel</span>.
          </h2>
          <p className="relative mt-4 max-w-xl mx-auto text-muted-foreground">
            Speak with a specialist for institutional pricing, batch COAs and logistics options — answered within hours.
          </p>
          <div className="relative mt-8 flex justify-center"><ContactButtons size="lg" /></div>
        </div>
      </section>
    </>
  );
}

const faqs = [
  { q: "Are your peptides verified for purity?", a: "Yes. Every batch is HPLC-tested by accredited third-party laboratories. Certificates of Analysis are available on request and visible directly on tested SKUs." },
  { q: "Who can place an order?", a: "Our catalog is presented for institutional, research and wholesale procurement — research laboratories, clinics, compounding pharmacies and authorized distributors." },
  { q: "How is pricing handled?", a: "Pricing is confirmed by a specialist on request to ensure correct tier, quantity and logistics. Use the inquiry channels (WhatsApp / Telegram / Email) or our wholesale form." },
  { q: "Where do you ship?", a: "We ship to 60+ countries with tracked, customs-managed logistics. Cold-chain shipping is available on request." },
  { q: "How quickly are inquiries answered?", a: "Specialist response within 24 hours, typically under 15 minutes during business hours via WhatsApp and Telegram." },
  { q: "How is privacy protected?", a: "All conversations occur on private channels of your choice. Shipments use plain, unmarked packaging." },
];

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card/40 overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-card/70 transition">
        <span className="font-medium">{q}</span>
        <ChevronDown size={18} className={`text-gold transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-in">{a}</div>}
    </div>
  );
}
