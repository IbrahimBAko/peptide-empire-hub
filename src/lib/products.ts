import retatrutideImg from "@/assets/products/retatrutide.jpg";
import tirzepatideImg from "@/assets/products/tirzepatide.jpg";
import semaglutideImg from "@/assets/products/semaglutide.jpg";
import ghkCuImg from "@/assets/products/ghk-cu.jpg";
import glowBlendImg from "@/assets/products/glow-blend.jpg";
import motsCImg from "@/assets/products/mots-c.jpg";
import vialImg from "@/assets/vial.jpg";

export type Variant = { size: string; price: number };

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  purity: string;
  image: string;
  variants?: Variant[];
  inquireOnly?: boolean;
  coa?: string; // public path to COA image
};

export const products: Product[] = [
  {
    slug: "retatrutide",
    name: "Retatrutide",
    category: "Metabolic",
    tagline: "Triple-agonist next-generation research peptide",
    description:
      "A novel GLP-1 / GIP / glucagon receptor tri-agonist studied for advanced metabolic research applications.",
    highlights: ["Tri-agonist GLP-1/GIP/GCG", "Lyophilized powder", "Third-party HPLC tested"],
    purity: "≥ 99.0%",
    image: retatrutideImg,
    variants: [
      { size: "5 mg", price: 95 },
      { size: "10 mg", price: 141 },
      { size: "15 mg", price: 204 },
      { size: "20 mg", price: 242 },
      { size: "30 mg", price: 273 },
      { size: "40 mg", price: 291 },
      { size: "50 mg", price: 315 },
      { size: "60 mg", price: 360 },
    ],
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    category: "Metabolic",
    tagline: "Dual GIP & GLP-1 receptor agonist",
    description:
      "Premium-grade tirzepatide for advanced metabolic and endocrine research protocols.",
    highlights: ["Dual GIP/GLP-1 action", "High-potency formulation", "COA on request"],
    purity: "≥ 99.0%",
    image: tirzepatideImg,
    variants: [
      { size: "2 mg", price: 47 },
      { size: "5 mg", price: 47 },
      { size: "10 mg", price: 74 },
      { size: "15 mg", price: 84 },
      { size: "20 mg", price: 116 },
      { size: "30 mg", price: 156 },
      { size: "50 mg", price: 256 },
      { size: "60 mg", price: 293 },
    ],
  },
  {
    slug: "tirzepatide-pen",
    name: "Tirzepatide Pen",
    category: "Metabolic",
    tagline: "Pre-filled tirzepatide pen device",
    description:
      "Convenient pre-assembled pen format of premium tirzepatide for streamlined research dosing.",
    highlights: ["Pen-format delivery", "Pre-measured doses", "Pharma-grade synthesis"],
    purity: "≥ 99.0%",
    image: tirzepatideImg,
    variants: [
      { size: "2 mg", price: 38 },
      { size: "5 mg", price: 43 },
      { size: "10 mg", price: 56 },
      { size: "15 mg", price: 72 },
    ],
  },
  {
    slug: "semaglutide",
    name: "Semaglutide",
    category: "Metabolic",
    tagline: "Selective GLP-1 receptor agonist",
    description:
      "Industry-standard GLP-1 receptor agonist for clinical-grade research investigations.",
    highlights: ["Long half-life", "Lyophilized stability", "Independently verified"],
    purity: "≥ 99.0%",
    image: semaglutideImg,
    variants: [
      { size: "2 mg", price: 43 },
      { size: "5 mg", price: 51 },
      { size: "10 mg", price: 71 },
      { size: "15 mg", price: 86 },
      { size: "20 mg", price: 100 },
      { size: "30 mg", price: 131 },
    ],
  },
  {
    slug: "semaglutide-pen",
    name: "Semaglutide Pen",
    category: "Metabolic",
    tagline: "Pre-filled semaglutide pen device",
    description:
      "Pre-assembled pen format of premium semaglutide for convenient research dosing protocols.",
    highlights: ["Pen-format delivery", "Pre-measured doses", "Pharma-grade synthesis"],
    purity: "≥ 99.0%",
    image: semaglutideImg,
    variants: [
      { size: "2 mg", price: 30 },
      { size: "5 mg", price: 35 },
    ],
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    category: "Regenerative",
    tagline: "Copper peptide complex",
    description:
      "Naturally occurring copper-binding tripeptide widely studied in skin, hair, and tissue regeneration research.",
    highlights: ["Copper-bound tripeptide", "Cosmetic & wound research", "Premium purity"],
    purity: "≥ 99.5%",
    image: ghkCuImg,
    variants: [
      { size: "50 mg", price: 33 },
      { size: "100 mg", price: 65 },
    ],
  },
  {
    slug: "glow-blend",
    name: "Glow Blend",
    category: "Aesthetic",
    tagline: "Signature aesthetic research blend",
    description:
      "Curated multi-peptide aesthetic complex formulated for targeted skin and pigmentation research.",
    highlights: ["Synergistic blend", "Empire-exclusive formula", "Lab tested"],
    purity: "Pharma-grade",
    image: glowBlendImg,
    variants: [{ size: "70 mg", price: 231 }],
  },
  {
    slug: "mots-c",
    name: "MOTS-C",
    category: "Mitochondrial",
    tagline: "Mitochondrial-derived peptide",
    description:
      "16-amino-acid mitochondrial-derived peptide investigated for metabolic homeostasis and cellular energetics.",
    highlights: ["Mitochondrial origin", "Metabolic research", "Premium synthesis"],
    purity: "≥ 99.0%",
    image: motsCImg,
    variants: [
      { size: "10 mg", price: 70 },
      { size: "40 mg", price: 250 },
    ],
  },
];

const inquireCatalog: { name: string; category: string; tagline: string }[] = [
  { name: "BPC-157", category: "Regenerative", tagline: "Body Protection Compound" },
  { name: "TB-500", category: "Regenerative", tagline: "Thymosin Beta-4 fragment" },
  { name: "Cagrilintide", category: "Metabolic", tagline: "Long-acting amylin analog" },
  { name: "NAD+", category: "Longevity", tagline: "Cellular energy cofactor" },
  { name: "AOD-9604", category: "Metabolic", tagline: "Lipolytic HGH fragment" },
  { name: "Epitalon", category: "Longevity", tagline: "Pineal tetrapeptide" },
  { name: "HGH", category: "Growth", tagline: "Human growth hormone" },
  { name: "HCG", category: "Hormonal", tagline: "Human chorionic gonadotropin" },
  { name: "HMG", category: "Hormonal", tagline: "Human menopausal gonadotropin" },
  { name: "Mazdutide", category: "Metabolic", tagline: "GLP-1 / glucagon dual agonist" },
  { name: "Survodutide", category: "Metabolic", tagline: "GLP-1 / glucagon dual agonist" },
  { name: "Melanotan 2", category: "Aesthetic", tagline: "Melanocortin receptor agonist" },
  { name: "Ipamorelin", category: "Growth", tagline: "Selective GH secretagogue" },
  { name: "Semax", category: "Cognitive", tagline: "Nootropic heptapeptide" },
  { name: "Sermorelin", category: "Growth", tagline: "GHRH analog" },
  { name: "Kisspeptin", category: "Hormonal", tagline: "Reproductive axis peptide" },
  { name: "Oxytocin", category: "Hormonal", tagline: "Neuropeptide hormone" },
  { name: "Selank", category: "Cognitive", tagline: "Anxiolytic heptapeptide" },
  { name: "Thymosin Alpha-1", category: "Immune", tagline: "Immune-modulating peptide" },
  { name: "SS-31", category: "Mitochondrial", tagline: "Mitochondria-targeted peptide" },
  { name: "Dermorphin", category: "Research", tagline: "Opioid heptapeptide" },
  { name: "Glutathione", category: "Antioxidant", tagline: "Master antioxidant tripeptide" },
  { name: "Botulinum Toxin", category: "Aesthetic", tagline: "Neuromodulator" },
  { name: "Tesamorelin", category: "Growth", tagline: "GHRH analog" },
  { name: "Insulin", category: "Hormonal", tagline: "Pancreatic hormone" },
  { name: "GLP-1", category: "Metabolic", tagline: "Glucagon-like peptide-1" },
  { name: "Bacteriostatic Water", category: "Reconstitution", tagline: "0.9% benzyl alcohol diluent" },
  { name: "Acetic Acid", category: "Reconstitution", tagline: "Reconstitution solvent" },
  { name: "Topilutamide", category: "Aesthetic", tagline: "Topical anti-androgen (Fluridil)" },
  { name: "RU-58841", category: "Aesthetic", tagline: "Non-steroidal topical anti-androgen" },
  { name: "PE-22-28", category: "Cognitive", tagline: "TREK-1 antagonist research peptide" },
  { name: "AOD-9604", category: "Metabolic", tagline: "Lipolytic HGH fragment 176-191" },
];

// Map of product slug -> COA file path (in /public)
const coaMap: Record<string, string> = {
  "aod-9604": "/coa/aod-9604-coa.png",
  "topilutamide": "/coa/topilutamide-coa.png",
  "ru-58841": "/coa/ru-58841-coa.png",
  "pe-22-28": "/coa/pe-22-28-coa.png",
};

for (const item of inquireCatalog) {
  const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (products.some((p) => p.slug === slug)) continue;
  products.push({
    slug,
    name: item.name,
    category: item.category,
    tagline: item.tagline,
    description: `Premium research-grade ${item.name}. Contact us directly for current pricing, available sizes, and bulk inquiries.`,
    highlights: ["Pharma-grade synthesis", "HPLC verified", "Discreet dispatch"],
    purity: "≥ 99.0%",
    image: vialImg,
    inquireOnly: true,
    coa: coaMap[slug],
  });
}