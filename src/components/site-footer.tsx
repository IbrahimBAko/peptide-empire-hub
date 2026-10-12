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
            Research-use peptide materials supplied to laboratories and authorized distributors, with laboratory documentation published as received.
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold mb-3">Navigate</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/products" className="hover:text-gold">Products</Link></li>
            <li><Link to="/documentation" className="hover:text-gold">Documentation &amp; Quality</Link></li>
            <li><Link to="/faq" className="hover:text-gold">FAQ</Link></li>
            <li><Link to="/blog/what-are-research-peptides" className="hover:text-gold">What Are Research Peptides?</Link></li>
            <li><Link to="/blog/how-to-verify-a-peptide-supplier" className="hover:text-gold">How to Verify a Supplier</Link></li>
            <li><Link to="/wholesale" className="hover:text-gold">Wholesale</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold mb-3">Direct Order</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-gold" href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp · {CONTACT.phoneDisplay}</a></li>
            <li><a className="hover:text-gold" href={mailLink()}>{CONTACT.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Peptide Empire. All materials are supplied for laboratory research use only — not for human or veterinary consumption, and not medicines. No medical, diagnostic or treatment claims are made.
      </div>
    </footer>
  );
}