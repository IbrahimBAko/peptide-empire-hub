import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, type CartItem } from "@/lib/cart";
import { CONTACT, mailLink, tgLink, waLink } from "@/lib/contact";
import { ShoppingCart, Trash2, ArrowRight, MessageCircle, Send, Mail, ShieldCheck, Truck, Lock } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart & Order Inquiry — Peptide Empire" },
      { name: "description", content: "Review your selected peptides and submit a professional order inquiry via WhatsApp, Telegram, or Email." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

type ContactMethod = "whatsapp" | "telegram" | "email";

function CartPage() {
  const { items, remove, updateQty, clear, subtotal, count } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"review" | "details">("review");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    telegram: "",
    country: "",
    address: "",
    method: "whatsapp" as ContactMethod,
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim() || form.fullName.length > 100) e.fullName = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || form.email.length > 255) e.email = "Valid email required";
    if (!form.whatsapp.trim() || form.whatsapp.length > 30) e.whatsapp = "WhatsApp number required";
    if (!form.country.trim() || form.country.length > 80) e.country = "Country required";
    if (form.notes.length > 1000) e.notes = "Max 1000 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function buildSummary(items: CartItem[]) {
    const lines: string[] = [];
    lines.push("🛒 *PEPTIDE EMPIRE — ORDER INQUIRY*");
    lines.push("━━━━━━━━━━━━━━━━━━━━━");
    lines.push("");
    lines.push("👤 *Customer*");
    lines.push(`Name: ${form.fullName}`);
    lines.push(`Email: ${form.email}`);
    lines.push(`WhatsApp: ${form.whatsapp}`);
    if (form.telegram) lines.push(`Telegram: @${form.telegram.replace(/^@/, "")}`);
    lines.push(`Country: ${form.country}`);
    if (form.address) lines.push(`Address: ${form.address}`);
    lines.push(`Preferred contact: ${form.method.toUpperCase()}`);
    lines.push("");
    lines.push("📦 *Products*");
    let total = 0;
    items.forEach((i, idx) => {
      const line = `${idx + 1}. ${i.name} — ${i.size} × ${i.quantity}` +
        (i.inquireOnly || !i.price ? "  (price on request)" : `  $${(i.price * i.quantity).toFixed(0)}`);
      lines.push(line);
      if (!i.inquireOnly && i.price) total += i.price * i.quantity;
    });
    lines.push("");
    if (total > 0) lines.push(`💰 *Subtotal:* $${total.toFixed(0)} USD (excl. shipping)`);
    if (form.notes) {
      lines.push("");
      lines.push("📝 *Notes*");
      lines.push(form.notes);
    }
    lines.push("");
    lines.push("Please confirm availability, total with shipping, and payment instructions. Thank you!");
    return lines.join("\n");
  }

  function submit() {
    if (!validate()) return;
    const message = buildSummary(items);
    let url = "";
    if (form.method === "whatsapp") url = waLink(message);
    else if (form.method === "telegram") url = tgLink(message);
    else url = mailLink(`Order Inquiry — ${form.fullName}`, message);
    window.open(url, "_blank", "noopener");
  }

  if (count === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
          <ShoppingCart size={28} className="text-gold" />
        </div>
        <h1 className="font-display text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Browse the catalog and add peptides to begin your inquiry.</p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold-bright px-7 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:brightness-110 transition"
        >
          Explore Catalog <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Secure Inquiry</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Your Selection</h1>
        <p className="mt-2 text-muted-foreground text-sm">
          Review your products, then submit a professional order inquiry. A specialist will confirm pricing & shipping within 24h.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* LEFT — items / form */}
        <div className="space-y-6">
          {step === "review" ? (
            <div className="rounded-2xl border border-border bg-[var(--gradient-card)] overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-xl">Selected Products ({count})</h2>
                <button
                  onClick={() => clear()}
                  className="text-xs text-muted-foreground hover:text-destructive transition"
                >
                  Clear all
                </button>
              </div>
              <ul className="divide-y divide-border">
                {items.map((i) => (
                  <li key={`${i.slug}-${i.size}`} className="p-6 flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <div className="font-medium">{i.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {i.size}
                        {i.inquireOnly && <span className="ml-2 text-gold">• Price on request</span>}
                      </div>
                    </div>
                    <div className="flex items-center rounded-md border border-border">
                      <button onClick={() => updateQty(i.slug, i.size, i.quantity - 1)} className="px-2.5 py-1.5 text-muted-foreground hover:text-gold">−</button>
                      <span className="px-3 text-sm w-8 text-center">{i.quantity}</span>
                      <button onClick={() => updateQty(i.slug, i.size, i.quantity + 1)} className="px-2.5 py-1.5 text-muted-foreground hover:text-gold">+</button>
                    </div>
                    <div className="w-20 text-right text-sm">
                      {i.inquireOnly || !i.price ? (
                        <span className="text-muted-foreground italic text-xs">Inquire</span>
                      ) : (
                        <span className="text-gold font-semibold">${(i.price * i.quantity).toFixed(0)}</span>
                      )}
                    </div>
                    <button
                      onClick={() => remove(i.slug, i.size)}
                      aria-label={`Remove ${i.name}`}
                      className="text-muted-foreground hover:text-destructive transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-[var(--gradient-card)] p-6 md:p-8">
              <h2 className="font-display text-2xl">Customer Details</h2>
              <p className="mt-1 text-sm text-muted-foreground">Required so a specialist can confirm your order privately.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Field label="Full Name *" error={errors.fullName}>
                  <input value={form.fullName} maxLength={100} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Email Address *" error={errors.email}>
                  <input type="email" value={form.email} maxLength={255} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
                </Field>
                <Field label="WhatsApp Number *" error={errors.whatsapp}>
                  <input value={form.whatsapp} maxLength={30} placeholder="+1 555 555 5555" onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Telegram Username (optional)">
                  <input value={form.telegram} maxLength={50} placeholder="@username" onChange={(e) => setForm({ ...form, telegram: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Country *" error={errors.country}>
                  <input value={form.country} maxLength={80} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Preferred Contact Method *">
                  <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value as ContactMethod })} className={inputCls}>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telegram">Telegram</option>
                    <option value="email">Email</option>
                  </select>
                </Field>
                <div className="md:col-span-2">
                  <Field label="Delivery Address (optional)">
                    <input value={form.address} maxLength={250} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputCls} />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field label="Additional Notes / Special Requests" error={errors.notes}>
                    <textarea value={form.notes} maxLength={1000} rows={4} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputCls} />
                  </Field>
                </div>
              </div>
              <button
                onClick={() => setStep("review")}
                className="mt-6 text-xs text-muted-foreground hover:text-gold"
              >
                ← Back to cart
              </button>
            </div>
          )}

          {/* trust strip */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            {[
              { icon: ShieldCheck, t: "HPLC Verified" },
              { icon: Lock, t: "Discreet & Private" },
              { icon: Truck, t: "48h Dispatch" },
            ].map((b) => (
              <div key={b.t} className="flex items-center gap-2 rounded-md border border-border bg-card/40 px-3 py-2">
                <b.icon size={14} className="text-gold" />
                <span className="text-muted-foreground">{b.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — summary */}
        <aside className="lg:sticky lg:top-24 self-start rounded-2xl border border-gold/30 bg-[var(--gradient-card)] p-6 shadow-[var(--shadow-luxury)]">
          <h3 className="font-display text-xl">Order Summary</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Items</span>
              <span>{count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-gold font-semibold">{subtotal > 0 ? `$${subtotal.toFixed(0)}` : "On request"}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Shipping</span>
              <span>Confirmed by specialist</span>
            </div>
          </div>
          <div className="mt-5 border-t border-border pt-5">
            {step === "review" ? (
              <button
                onClick={() => setStep("details")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold-bright px-6 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:brightness-110 transition"
              >
                Continue to Details <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={submit}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold-bright px-6 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:brightness-110 transition"
              >
                {form.method === "whatsapp" && <MessageCircle size={16} />}
                {form.method === "telegram" && <Send size={16} />}
                {form.method === "email" && <Mail size={16} />}
                Send Inquiry
              </button>
            )}
            <p className="mt-3 text-[11px] text-muted-foreground text-center leading-relaxed">
              This is not an instant payment. We&apos;ll confirm availability, total & payment privately via your chosen channel.
            </p>
          </div>
          <div className="mt-5 text-[11px] text-muted-foreground">
            Reach us anytime: <span className="text-gold">{CONTACT.phoneDisplay}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}