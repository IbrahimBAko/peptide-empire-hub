import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CONTACT, mailLink, tgLink, waLink } from "@/lib/contact";
import { Building2, Globe2, ShieldCheck, Truck, MessageCircle, Send, Mail } from "lucide-react";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale & Distribution — Peptide Empire" },
      { name: "description", content: "Institutional, wholesale and distributor inquiries for premium research peptides. Bulk pricing, COA documentation, global logistics." },
      { property: "og:title", content: "Wholesale & Distribution — Peptide Empire" },
      { property: "og:description", content: "Partner with Peptide Empire for institutional volume and global distribution." },
    ],
  }),
  component: WholesalePage,
});

type Form = {
  organization: string;
  contactName: string;
  email: string;
  whatsapp: string;
  country: string;
  type: "Research Lab" | "Clinic" | "Distributor" | "Compounding Pharmacy" | "Other";
  products: string;
  volume: string;
  notes: string;
  channel: "whatsapp" | "telegram" | "email";
};

function WholesalePage() {
  const [f, setF] = useState<Form>({
    organization: "", contactName: "", email: "", whatsapp: "", country: "",
    type: "Research Lab", products: "", volume: "", notes: "", channel: "whatsapp",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!f.organization.trim()) e.organization = "Organization required";
    if (!f.contactName.trim()) e.contactName = "Contact name required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Valid email required";
    if (!f.country.trim()) e.country = "Country required";
    if (!f.products.trim()) e.products = "Please list products";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function send() {
    if (!validate()) return;
    const lines = [
      "🏛️ *PEPTIDE EMPIRE — WHOLESALE / INSTITUTIONAL INQUIRY*",
      "━━━━━━━━━━━━━━━━━━━━━",
      "",
      `Organization: ${f.organization}`,
      `Type: ${f.type}`,
      `Contact: ${f.contactName}`,
      `Email: ${f.email}`,
      f.whatsapp && `WhatsApp: ${f.whatsapp}`,
      `Country: ${f.country}`,
      "",
      "Products of interest:",
      f.products,
      "",
      `Estimated volume / cadence: ${f.volume || "—"}`,
      f.notes && `\nNotes:\n${f.notes}`,
      "",
      "Please share institutional pricing, lead times and COA documentation. Thank you.",
    ].filter(Boolean).join("\n");
    const subject = `Wholesale Inquiry — ${f.organization}`;
    const url = f.channel === "whatsapp" ? waLink(lines) : f.channel === "telegram" ? tgLink(lines) : mailLink(subject, lines);
    if (f.channel === "email") {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Institutional Program</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl max-w-3xl">
        Wholesale & <span className="text-gradient-gold">Distribution</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
        Bulk supply for accredited research laboratories, clinics, compounding pharmacies and authorized distributors. Tiered pricing, batch COAs, white-glove logistics.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {[
          { icon: Building2, t: "Institutional Volumes", d: "Tiered pricing from 100+ vials" },
          { icon: ShieldCheck, t: "Batch COA", d: "Independent HPLC per lot" },
          { icon: Globe2, t: "Global Logistics", d: "60+ countries, customs-managed" },
          { icon: Truck, t: "Cold-Chain Option", d: "Temperature-monitored shipping" },
        ].map((s) => (
          <div key={s.t} className="rounded-xl border border-border bg-[var(--gradient-card)] p-5">
            <s.icon className="text-gold" size={22} />
            <h3 className="mt-3 font-display text-lg">{s.t}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-border bg-[var(--gradient-card)] p-6 md:p-8">
          <h2 className="font-display text-2xl">Request Information</h2>
          <p className="mt-1 text-sm text-muted-foreground">All inquiries answered by a specialist within 24 hours.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="Organization *" error={errors.organization}>
              <input className={inputCls} maxLength={120} value={f.organization} onChange={(e) => setF({ ...f, organization: e.target.value })} />
            </Field>
            <Field label="Organization Type *">
              <select className={inputCls} value={f.type} onChange={(e) => setF({ ...f, type: e.target.value as Form["type"] })}>
                <option>Research Lab</option><option>Clinic</option><option>Distributor</option>
                <option>Compounding Pharmacy</option><option>Other</option>
              </select>
            </Field>
            <Field label="Contact Name *" error={errors.contactName}>
              <input className={inputCls} maxLength={100} value={f.contactName} onChange={(e) => setF({ ...f, contactName: e.target.value })} />
            </Field>
            <Field label="Email *" error={errors.email}>
              <input className={inputCls} type="email" maxLength={255} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
            </Field>
            <Field label="WhatsApp / Phone">
              <input className={inputCls} maxLength={40} value={f.whatsapp} onChange={(e) => setF({ ...f, whatsapp: e.target.value })} />
            </Field>
            <Field label="Country *" error={errors.country}>
              <input className={inputCls} maxLength={80} value={f.country} onChange={(e) => setF({ ...f, country: e.target.value })} />
            </Field>
            <div className="md:col-span-2">
              <Field label="Products of Interest *" error={errors.products}>
                <textarea rows={3} className={inputCls} maxLength={1000} value={f.products} onChange={(e) => setF({ ...f, products: e.target.value })} placeholder="e.g. Tirzepatide 10mg × 200, Semaglutide 5mg × 500" />
              </Field>
            </div>
            <Field label="Estimated Volume / Cadence">
              <input className={inputCls} maxLength={150} value={f.volume} onChange={(e) => setF({ ...f, volume: e.target.value })} placeholder="e.g. 500 vials / month" />
            </Field>
            <Field label="Preferred Channel">
              <select className={inputCls} value={f.channel} onChange={(e) => setF({ ...f, channel: e.target.value as Form["channel"] })}>
                <option value="whatsapp">WhatsApp</option><option value="telegram">Telegram</option><option value="email">Email</option>
              </select>
            </Field>
            <div className="md:col-span-2">
              <Field label="Additional Notes">
                <textarea rows={3} className={inputCls} maxLength={1000} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} />
              </Field>
            </div>
          </div>
          <button
            onClick={send}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold-bright px-7 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] hover:brightness-110 transition"
          >
            {f.channel === "whatsapp" && <MessageCircle size={16} />}
            {f.channel === "telegram" && <Send size={16} />}
            {f.channel === "email" && <Mail size={16} />}
            Submit Inquiry
          </button>
          <p className="mt-3 text-[11px] text-muted-foreground">Strictly for institutional and research procurement. Not consumer sales.</p>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-gold/30 bg-[var(--gradient-card)] p-6 shadow-[var(--shadow-luxury)]">
            <h3 className="font-display text-xl">Direct Channels</h3>
            <p className="mt-2 text-sm text-muted-foreground">Speak with our wholesale desk:</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a className="text-gold hover:underline" href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp · {CONTACT.phoneDisplay}</a></li>
              <li><a className="text-gold hover:underline" href={tgLink()} target="_blank" rel="noopener noreferrer">Telegram · {CONTACT.phoneDisplay}</a></li>
              <li><a className="text-gold hover:underline" href={mailLink()} target="_blank" rel="noopener noreferrer">{CONTACT.email}</a></li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card/50 p-6">
            <h3 className="font-display text-lg">Distributor Partnerships</h3>
            <p className="mt-2 text-sm text-muted-foreground">Exclusive territory programs available for established distributors with regulated logistics infrastructure. Mention "Distributor Partnership" in your inquiry.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}