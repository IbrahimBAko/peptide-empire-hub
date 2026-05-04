import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileCheck2, Download, ShieldCheck } from "lucide-react";

type Props = { coaUrl: string; productName: string };

export function CoaViewer({ coaUrl, productName }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="inline-flex items-center gap-1.5 rounded-md border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold hover:bg-gold/20 transition"
          >
            <FileCheck2 size={14} /> View COA
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <ShieldCheck size={18} className="text-gold" />
              {productName} — Certificate of Analysis
            </DialogTitle>
          </DialogHeader>
          <div className="rounded-lg overflow-hidden border border-border bg-white">
            <img src={coaUrl} alt={`${productName} Certificate of Analysis`} className="w-full h-auto" />
          </div>
          <a
            href={coaUrl}
            download
            className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold-bright px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition"
          >
            <Download size={14} /> Download COA (PNG)
          </a>
        </DialogContent>
      </Dialog>
      <a
        href={coaUrl}
        download
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-gold hover:text-gold transition"
      >
        <Download size={14} /> Download
      </a>
    </div>
  );
}

export function LabVerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
      <ShieldCheck size={10} /> Lab Verified
    </span>
  );
}