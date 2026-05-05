import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { products, type Product } from "@/lib/products";

const SHOWCASE_SLUGS = ["tirzepatide", "semaglutide", "retatrutide", "ghk-cu", "mots-c", "glow-blend"];

export function FeaturedShowcase() {
  const items: Product[] = SHOWCASE_SLUGS
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p));
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items.length]);

  const active = items[idx];
  if (!active) return null;

  return (
    <div className="relative grid gap-10 md:grid-cols-2 items-center rounded-3xl border border-gold/20 bg-[var(--gradient-card)] p-8 md:p-14 overflow-hidden shadow-[var(--shadow-luxury)]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 -left-32 w-[420px] h-[420px] rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 w-[420px] h-[420px] rounded-full bg-teal/20 blur-3xl" />

      {/* 3D Stage */}
      <div className="relative h-[420px] flex items-center justify-center perspective-stage">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-72 h-72 rounded-full border border-gold/20 animate-spin-slow" />
          <div className="absolute w-96 h-96 rounded-full border border-gold/10 animate-spin-reverse" />
        </div>
        {items.map((p, i) => (
          <img
            key={p.slug}
            src={p.image}
            alt={`${p.name} research peptide`}
            width={1024}
            height={1024}
            loading="lazy"
            className={`absolute h-[360px] w-[360px] object-contain transition-all duration-1000 ease-out animate-float drop-shadow-[0_30px_50px_oklch(0_0_0/0.7)] ${
              i === idx ? "opacity-100 scale-100 rotate-y-0" : "opacity-0 scale-90 rotate-y-90"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          />
        ))}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-64 h-6 rounded-[50%] bg-black/60 blur-xl" />
      </div>

      {/* Info */}
      <div key={active.slug} className="relative animate-fade-up">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold">
          <Sparkles size={14} /> Featured · {active.category}
        </div>
        <h3 className="mt-3 font-display text-4xl md:text-5xl">{active.name}</h3>
        <p className="mt-2 text-gold">{active.tagline}</p>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-md">{active.description}</p>

        {active.packs && (
          <div className="mt-5 flex flex-wrap gap-2">
            {active.packs.map((p) => (
              <span key={p.strength} className="text-[11px] px-2.5 py-1 rounded-md border border-gold/30 bg-gold/5 text-gold/90">
                {p.strength} {p.pack}
              </span>
            ))}
          </div>
        )}

        <div className="mt-7 flex items-center gap-4">
          <Link to="/products" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold-bright px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:brightness-110 transition">
            Inquire Now <ArrowRight size={14} />
          </Link>
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Show item ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-gold" : "w-2 bg-gold/30 hover:bg-gold/60"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}