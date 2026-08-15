import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { CONTACT, gmailWebLink, mailLink, waLink } from "@/lib/contact";
import { ShoppingCart, Trash2, Minus, Plus, MessageCircle, Mail, ShieldCheck, ArrowLeft } from "lucide-react";
import { noindex } from "@/lib/site";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Peptide Empire" },
      { name: "description", content: "Review your selection and complete a private inquiry to confirm pricing, lead time, and discreet global shipping." },
      noindex,
    ],
  }),
  component: CartPage,
});

type Channel = "whatsapp" | "email";

function CartPage() {
  const { items, updateQty, remove, clear, subtotal, count } = useCart();
  const [step, setStep] = useState<1 | 2>(1);
  const [copied, setCopied] = useState(false);
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    country: "",
    organization: "",
    payment: "Chime",
    notes: "",
  });

  if (count === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <ShoppingCart className="mx-auto text-gold/60" size={48} />
        <h1 className="mt-6 font-display text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Browse our research catalog to add peptides to your inquiry.</p>
        <Link to="/products" className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold-bright px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:brightness-110">
          <ArrowLeft size={14} /> Browse Catalog
        </Link>
      </div>
    );
  }

  const buildSummary = () => {
    const lines = [
      "Hello Peptide Empire,",
      "",
      "I would like to place an order for the following products:",
      "",
      ...items.map((i, idx) => `${idx + 1}. ${i.name} — ${i.size} × ${i.quantity}  ($${i.price * i.quantity})`),
      "",
      `Estimated subtotal: $${subtotal}`,
      "",
      "Please assist me with pricing and delivery details.",
      "",
      "— Customer details —",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `WhatsApp: ${form.whatsapp}`,
      `Country: ${form.country}`,
      form.organization ? `Organization: ${form.organization}` : "",
      `Preferred payment: ${form.payment}`,
      `Preferred contact: ${channel}`,
      form.notes ? `Notes: ${form.notes}` : "",
      "",
      "Thank you.",
    ].filter(Boolean);
    return lines.join("\n");
  };

  const canSubmit = Boolean(form.name && form.email && form.country);
  const summary = buildSummary();
  const submitHref = channel === "whatsapp" ? waLink(summary) : mailLink("Product Inquiry – Peptide Empire", summary);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Inquiry Cart</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Review & Confirm</h1>
        </div>
        <Link to="/products" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-gold inline-flex items-center gap-1">
          <ArrowLeft size={12} /> Continue browsing
        </Link>
      </div>

      {/* Stepper */}
      <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-widest">
        <span className={`px-3 py-1.5 rounded-full border ${step === 1 ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground"}`}>1 · Selection</span>
        <span className="h-px w-8 bg-border" />
        <span className={`px-3 py-1.5 rounded-full border ${step === 2 ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground"}`}>2 · Details</span>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Items / Form */}
        <div className="space-y-4">
          {step === 1 ? (
            items.map((i) => (
              <div key={i.slug + i.size} className="flex gap-4 rounded-xl border border-border bg-[var(--gradient-card)] p-4">
                {i.image && <img src={i.image} alt={i.name} className="h-24 w-24 rounded-lg object-cover border border-border" />}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <div className="font-display text-lg">{i.name}</div>
                      <div className="text-xs text-muted-foreground">{i.size}</div>
                    </div>
                    <button onClick={() => remove(i.slug, i.size)} className="text-muted-foreground hover:text-destructive transition" aria-label="Remove">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="inline-flex items-center rounded-md border border-border">
                      <button onClick={() => updateQty(i.slug, i.size, i.quantity - 1)} className="px-2 py-1.5 hover:text-gold"><Minus size={12} /></button>
                      <span className="px-3 text-sm">{i.quantity}</span>
                      <button onClick={() => updateQty(i.slug, i.size, i.quantity + 1)} className="px-2 py-1.5 hover:text-gold"><Plus size={12} /></button>
                    </div>
                    <div className="text-sm font-semibold text-gold">${i.price * i.quantity}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-border bg-[var(--gradient-card)] p-6 space-y-4">
              <h2 className="font-display text-2xl">Customer Details</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                <Field label="WhatsApp Number" value={form.whatsapp} onChange={(v) => setForm({ ...form, whatsapp: v })} />
                <Field label="Country" value={form.country} onChange={(v) => setForm({ ...form, country: v })} required />
                <Field label="Organization / Business (optional)" value={form.organization} onChange={(v) => setForm({ ...form, organization: v })} />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Preferred Payment Method
                </label>
                <select
                  value={form.payment}
                  onChange={(e) => setForm({ ...form, payment: e.target.value })}
                  className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:border-gold focus:outline-none"
                >
                  <option>Chime</option>
                  <option>Gift Card</option>
                  <option>Cash App</option>
                  <option>Bitcoin (BTC)</option>
                  <option>USDT (Tron TRC20)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Notes (optional)</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
                  className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:border-gold focus:outline-none" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Preferred contact channel</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {([
                    { k: "whatsapp", l: "WhatsApp", I: MessageCircle },
                    { k: "email", l: "Email", I: Mail },
                  ] as const).map((o) => (
                    <button key={o.k} onClick={() => setChannel(o.k)}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs uppercase tracking-widest transition ${channel === o.k ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:border-gold/40"}`}>
                      <o.I size={14} /> {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <aside className="rounded-xl border border-gold/30 bg-[var(--gradient-card)] p-6 h-fit shadow-[var(--shadow-luxury)]">
          <h3 className="font-display text-xl">Order Summary</h3>
          <div className="mt-4 space-y-2 text-sm">
            <Row label={`Items (${count})`} value={`$${subtotal}`} />
            <Row label="Shipping" value="Quoted on confirmation" />
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">Estimated</span>
            <span className="font-display text-2xl text-gradient-gold">${subtotal}</span>
          </div>

          {step === 1 ? (
            <button onClick={() => setStep(2)} className="mt-6 w-full rounded-md bg-gradient-to-r from-gold to-gold-bright px-4 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:brightness-110 transition shadow-[var(--shadow-gold)]">
              Continue to Details
            </button>
          ) : (
            <div className="mt-6 space-y-2">
              {canSubmit ? (
                <a
                  href={submitHref}
                  {...(channel === "whatsapp"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="block w-full text-center rounded-md bg-gradient-to-r from-gold to-gold-bright px-4 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:brightness-110 transition shadow-[var(--shadow-gold)]"
                >
                  Send Inquiry via {channel}
                </a>
              ) : (
                <button
                  disabled
                  className="w-full rounded-md bg-gradient-to-r from-gold to-gold-bright px-4 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] opacity-50 cursor-not-allowed"
                >
                  Send Inquiry via {channel}
                </button>
              )}
              {channel === "email" && canSubmit && (
                <div className="space-y-2 text-center">
                  <a
                    href={gmailWebLink("Product Inquiry – Peptide Empire", summary)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[11px] uppercase tracking-widest text-muted-foreground hover:text-gold transition"
                  >
                    No mail app? Open in Gmail web
                  </a>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(`To: ${CONTACT.email}\n\n${summary}`);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2500);
                      } catch {
                        setCopied(false);
                      }
                    }}
                    className="w-full rounded-md border border-border px-4 py-2 text-[11px] uppercase tracking-widest text-muted-foreground hover:border-gold hover:text-gold transition"
                  >
                    {copied ? "Order details copied" : "Copy order details"}
                  </button>
                  <p className="text-[11px] text-muted-foreground">
                    Send to <span className="text-gold">{CONTACT.email}</span>
                  </p>
                </div>
              )}
              <button onClick={() => setStep(1)} className="w-full rounded-md border border-border px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:border-gold hover:text-gold transition">
                Back
              </button>
            </div>
          )}

          <button onClick={clear} className="mt-3 w-full text-[10px] uppercase tracking-widest text-muted-foreground hover:text-destructive transition">
            Clear cart
          </button>

          <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            <ShieldCheck size={12} className="text-gold" /> Private · Discreet · Secure
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}{required && <span className="text-gold ml-1">*</span>}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required}
        className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:border-gold focus:outline-none" />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}