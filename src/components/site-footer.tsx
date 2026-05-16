import { Link } from "@tanstack/react-router";
import { CONTACT, mailLink, waLink } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl">
            Peptide <span className="text-gradient-gold">Empire</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Premium research peptides — purity verified, discreetly shipped.
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold mb-3">Navigate</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/products" className="hover:text-gold">Products</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold mb-3">Direct Order</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-gold" href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp · {CONTACT.phoneDisplay}</a></li>
            <li><a className="hover:text-gold" href={mailLink()} target="_blank" rel="noopener noreferrer">{CONTACT.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Peptide Empire. For research use only. Not for human consumption.
      </div>
    </footer>
  );
}