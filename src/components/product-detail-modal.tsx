import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, ShieldCheck, FlaskConical, FileQuestion, AlertTriangle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { CoaViewer, LabVerifiedBadge } from "@/components/coa-viewer";
import { ContactButtons } from "@/components/contact-buttons";
import { AddToCart } from "@/components/add-to-cart";

type Props = {
  product: Product | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{children}</h3>
  );
}

export function ProductDetailModal({ product, open, onOpenChange }: Props) {
  if (!product) return null;
  const p = product;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative bg-card aspect-square md:aspect-auto">
            <img
              src={p.image}
              alt={`${p.name} research peptide — Peptide Empire`}
              width={1024}
              height={1024}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest text-gold border border-gold/40 bg-background/70 backdrop-blur px-2 py-1 rounded">
              {p.category}
            </span>
            {p.coa && (
              <span className="absolute top-3 right-3">
                <LabVerifiedBadge />
              </span>
            )}
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <DialogHeader>
              <DialogTitle className="font-display text-3xl text-left">{p.name}</DialogTitle>
            </DialogHeader>
            <p className="mt-1 text-sm text-gold">{p.tagline}</p>
            <div className="mt-5">
              <SectionTitle>Product overview</SectionTitle>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </div>

            {p.packs && p.packs.length > 0 && (
              <div className="mt-5">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 flex items-center gap-1.5">
                  <FlaskConical size={12} className="text-gold" aria-hidden="true" /> Specifications
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.packs.map((pk) => (
                    <span
                      key={pk.strength + pk.pack}
                      className="text-[11px] px-2 py-1 rounded border border-gold/30 bg-gold/5 text-gold/90 font-medium"
                    >
                      {pk.strength} <span className="text-gold/60">{pk.pack}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5"><SectionTitle>Quality &amp; handling</SectionTitle></div>
            <ul className="space-y-1.5">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Check size={12} className="text-gold mt-0.5 flex-shrink-0" /> {h}
                </li>
              ))}
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <ShieldCheck size={12} className="text-gold mt-0.5 flex-shrink-0" /> Purity: {p.purity}
              </li>
            </ul>

            <div className="mt-5">
              <SectionTitle>Available documentation</SectionTitle>
              {p.coa ? (
                <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3">
                  <p className="text-xs text-muted-foreground mb-2">
                    Certificate of Analysis on file, published as issued by the testing laboratory.
                  </p>
                  <CoaViewer coaUrl={p.coa} productName={p.name} />
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-card/50 p-3 flex gap-2">
                  <FileQuestion size={14} className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Documentation availability: contact the company for current documentation.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 rounded-lg border border-border bg-card/50 p-3 flex gap-2">
              <AlertTriangle size={14} className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <SectionTitle>Important restrictions</SectionTitle>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Supplied for laboratory research use only. Not a medicine, supplement or food; not for human or veterinary consumption. No dosage, administration or protocol guidance is provided. Buyers are responsible for lawful possession and qualified handling in their jurisdiction.
                </p>
              </div>
            </div>

            <div className="mt-5">
              <SectionTitle>Frequently asked</SectionTitle>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs font-medium text-foreground">How is pricing confirmed?</dt>
                  <dd className="text-xs text-muted-foreground leading-relaxed">Catalog prices are indicative; a specialist confirms final pricing, availability and logistics when you send your request.</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-foreground">How is this shipped?</dt>
                  <dd className="text-xs text-muted-foreground leading-relaxed">Tracked dispatch in plain, unmarked outer packaging. Transit times and cold-chain options are confirmed for your address.</dd>
                </div>
              </dl>
              <Link to="/faq" className="mt-3 inline-block text-[11px] uppercase tracking-widest text-gold hover:text-gold-bright transition">
                All questions →
              </Link>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              {p.variants && p.variants.length > 0 && (
                <div className="mb-4">
                  <AddToCart product={p} />
                </div>
              )}
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                Request Information / Institutional Inquiry
              </p>
              <ContactButtons
                size="sm"
                message={`Hello, I'd like to request institutional pricing, specifications and lead times for ${p.name}.`}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}