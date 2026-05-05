import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, MessageCircle, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-gold to-gold-bright text-primary-foreground font-display text-xl font-bold shadow-[0_0_20px_oklch(0.78_0.13_80/0.4)]">
            P
          </span>
          <span className="font-display text-xl tracking-wide">
            Peptide <span className="text-gradient-gold font-semibold">Empire</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/cart" className="relative text-muted-foreground hover:text-gold transition" aria-label="Cart" activeProps={{ className: "text-gold" }}>
            <ShoppingCart size={18} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-gold to-gold-bright text-primary-foreground text-[10px] font-bold flex items-center justify-center">{count}</span>
            )}
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold-bright px-4 py-1.5 text-xs uppercase tracking-widest text-primary-foreground hover:brightness-110 transition shadow-[var(--shadow-gold)]"
          >
            <MessageCircle size={14} /> Inquire
          </Link>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <Link to="/cart" className="relative text-muted-foreground hover:text-gold" aria-label="Cart">
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-gold text-primary-foreground text-[9px] font-bold flex items-center justify-center">{count}</span>
            )}
          </Link>
          <Link to="/contact" className="text-gold" aria-label="Contact">
            <MessageCircle size={22} />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border/60 bg-background/95 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}