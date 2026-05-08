import retatrutideImg from "@/assets/products/retatrutide.jpg";
import tirzepatideImg from "@/assets/products/tirzepatide.jpg";
import semaglutideImg from "@/assets/products/semaglutide.jpg";
import ghkCuImg from "@/assets/products/ghk-cu.jpg";
import glowBlendImg from "@/assets/products/glow-blend.jpg";
import motsCImg from "@/assets/products/mots-c.jpg";
import vialImg from "@/assets/vial.jpg";
import bpc157Img from "@/assets/products/bpc-157.jpg";
import tb500Img from "@/assets/products/tb-500.jpg";
import nadImg from "@/assets/products/nad.jpg";
import hghImg from "@/assets/products/hgh.jpg";
import melanotanImg from "@/assets/products/melanotan-2.jpg";
import ipamorelinImg from "@/assets/products/ipamorelin.jpg";
import glutathioneImg from "@/assets/products/glutathione.jpg";
import bacWaterImg from "@/assets/products/bacteriostatic-water.jpg";
import cagrilintideImg from "@/assets/products/cagrilintide.jpg";
import aod9604Img from "@/assets/products/aod-9604.jpg";
import epitalonImg from "@/assets/products/epitalon.jpg";
import hcgImg from "@/assets/products/hcg.jpg";
import hmgImg from "@/assets/products/hmg.jpg";
import mazdutideImg from "@/assets/products/mazdutide.jpg";
import survodutideImg from "@/assets/products/survodutide.jpg";
import semaxImg from "@/assets/products/semax.jpg";
import sermorelinImg from "@/assets/products/sermorelin.jpg";
import kisspeptinImg from "@/assets/products/kisspeptin.jpg";
import oxytocinImg from "@/assets/products/oxytocin.jpg";
import selankImg from "@/assets/products/selank.jpg";
import thymosinImg from "@/assets/products/thymosin-alpha-1.jpg";
import ss31Img from "@/assets/products/ss-31.jpg";
import dermorphinImg from "@/assets/products/dermorphin.jpg";
import tesamorelinImg from "@/assets/products/tesamorelin.jpg";
import glp1Img from "@/assets/products/glp-1.jpg";
import aceticAcidImg from "@/assets/products/acetic-acid.jpg";
import topilutamideImg from "@/assets/products/topilutamide.jpg";
import ru58841Img from "@/assets/products/ru-58841.jpg";
import pe2228Img from "@/assets/products/pe-22-28.jpg";
import kpvImg from "@/assets/products/kpv.jpg";
import hexarelinImg from "@/assets/products/hexarelin.jpg";
import dalosirvatImg from "@/assets/products/dalosirvat.jpg";

export type Variant = { size: string; price: number };
export type PackSpec = { strength: string; pack: string };

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
  packs?: PackSpec[]; // catalog-style "5mg × 10 vials"
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
    coa: "/coa/retatrutide-coa.png",
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
    packs: [
      { strength: "5mg", pack: "× 10 vials" },
      { strength: "10mg", pack: "× 10 vials" },
      { strength: "20mg", pack: "× 10 vials" },
      { strength: "50mg", pack: "× 10 vials" },
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
    coa: "/coa/tirzepatide-coa.png",
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
    packs: [
      { strength: "2mg", pack: "× 10 vials" },
      { strength: "5mg", pack: "× 10 vials" },
      { strength: "10mg", pack: "× 10 vials" },
      { strength: "50mg", pack: "× 10 vials" },
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
    packs: [
      { strength: "2mg", pack: "1 pen" },
      { strength: "5mg", pack: "1 pen" },
      { strength: "10mg", pack: "1 pen" },
      { strength: "15mg", pack: "1 pen" },
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
    coa: "/coa/semaglutide-coa.png",
    variants: [
      { size: "2 mg", price: 43 },
      { size: "5 mg", price: 51 },
      { size: "10 mg", price: 71 },
      { size: "15 mg", price: 86 },
      { size: "20 mg", price: 100 },
      { size: "30 mg", price: 131 },
    ],
    packs: [
      { strength: "2mg", pack: "× 10 vials" },
      { strength: "5mg", pack: "× 10 vials" },
      { strength: "10mg", pack: "× 10 vials" },
      { strength: "30mg", pack: "× 10 vials" },
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
    packs: [
      { strength: "2mg", pack: "1 pen" },
      { strength: "5mg", pack: "1 pen" },
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
    packs: [
      { strength: "50mg", pack: "× 10 vials" },
      { strength: "100mg", pack: "× 10 vials" },
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
    packs: [{ strength: "70mg", pack: "× 10 vials" }],
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
    coa: "/coa/mots-c-coa.png",
    variants: [
      { size: "10 mg", price: 70 },
      { size: "40 mg", price: 250 },
    ],
    packs: [
      { strength: "10mg", pack: "× 10 vials" },
      { strength: "40mg", pack: "× 10 vials" },
    ],
  },
];

type CatalogItem = {
  name: string;
  category: string;
  tagline: string;
  variants?: Variant[];
  packs?: PackSpec[];
  unit?: string; // "vials" | "pen" | "vial"
};

const inquireCatalog: CatalogItem[] = [
  {
    name: "BPC-157", category: "Regenerative", tagline: "Body Protection Compound",
    variants: [{ size: "2 mg", price: 27 }, { size: "5 mg", price: 41 }, { size: "10 mg", price: 81 }],
  },
  {
    name: "TB-500", category: "Regenerative", tagline: "Thymosin Beta-4 fragment",
    variants: [{ size: "2 mg", price: 49 }, { size: "5 mg", price: 90 }, { size: "10 mg", price: 180 }],
  },
  {
    name: "Cagrilintide", category: "Metabolic", tagline: "Long-acting amylin analog",
    variants: [{ size: "5 mg", price: 140 }, { size: "10 mg", price: 260 }],
  },
  {
    name: "NAD+", category: "Longevity", tagline: "Cellular energy cofactor",
    variants: [{ size: "100 mg", price: 60 }, { size: "500 mg", price: 105 }, { size: "1000 mg", price: 200 }],
  },
  {
    name: "AOD-9604", category: "Metabolic", tagline: "Lipolytic HGH fragment 176-191",
    variants: [{ size: "2 mg", price: 60 }, { size: "5 mg", price: 109 }, { size: "10 mg", price: 195 }],
  },
  {
    name: "Epitalon", category: "Longevity", tagline: "Pineal tetrapeptide",
    variants: [{ size: "10 mg", price: 38 }, { size: "50 mg", price: 176 }],
  },
  {
    name: "HGH", category: "Growth", tagline: "Human growth hormone (Somatropin 191AA)",
    variants: [
      { size: "6 iu", price: 43 }, { size: "8 iu", price: 46 }, { size: "10 iu", price: 49 },
      { size: "12 iu", price: 65 }, { size: "15 iu", price: 73 },
    ],
    unit: "iu",
  },
  {
    name: "HCG", category: "Hormonal", tagline: "Human chorionic gonadotropin",
    variants: [{ size: "5000 iu", price: 85 }, { size: "10000 iu", price: 165 }],
  },
  {
    name: "HMG", category: "Hormonal", tagline: "Human menopausal gonadotropin",
    variants: [{ size: "75 iu", price: 68 }],
  },
  {
    name: "Mazdutide", category: "Metabolic", tagline: "GLP-1 / glucagon dual agonist",
    variants: [{ size: "10 mg", price: 195 }],
  },
  {
    name: "Survodutide", category: "Metabolic", tagline: "GLP-1 / glucagon dual agonist",
    variants: [{ size: "10 mg", price: 326 }],
  },
  {
    name: "Melanotan 2", category: "Aesthetic", tagline: "Melanocortin receptor agonist",
    variants: [{ size: "10 mg", price: 50 }],
  },
  {
    name: "Ipamorelin", category: "Growth", tagline: "Selective GH secretagogue",
    variants: [{ size: "2 mg", price: 22 }, { size: "5 mg", price: 48 }, { size: "10 mg", price: 85 }],
  },
  {
    name: "Semax", category: "Cognitive", tagline: "Nootropic heptapeptide",
    variants: [{ size: "5 mg", price: 49 }, { size: "10 mg", price: 80 }],
  },
  {
    name: "Sermorelin", category: "Growth", tagline: "GHRH analog",
    variants: [{ size: "5 mg", price: 81 }, { size: "10 mg", price: 157 }],
  },
  {
    name: "Kisspeptin", category: "Hormonal", tagline: "Kisspeptin-10 reproductive axis peptide",
    variants: [{ size: "5 mg", price: 66 }, { size: "10 mg", price: 116 }],
  },
  {
    name: "Oxytocin", category: "Hormonal", tagline: "Neuropeptide hormone",
    variants: [{ size: "2 mg", price: 40 }, { size: "5 mg", price: 68 }],
  },
  {
    name: "Selank", category: "Cognitive", tagline: "Anxiolytic heptapeptide",
    variants: [{ size: "5 mg", price: 57 }, { size: "10 mg", price: 80 }],
  },
  {
    name: "Thymosin Alpha-1", category: "Immune", tagline: "Immune-modulating peptide",
    variants: [{ size: "5 mg", price: 178 }, { size: "10 mg", price: 67 }],
  },
  {
    name: "SS-31", category: "Mitochondrial", tagline: "Mitochondria-targeted peptide",
    variants: [{ size: "10 mg", price: 105 }, { size: "50 mg", price: 455 }],
  },
  {
    name: "Dermorphin", category: "Research", tagline: "Opioid heptapeptide",
    variants: [{ size: "5 mg", price: 36 }],
  },
  {
    name: "Glutathione", category: "Antioxidant", tagline: "Master antioxidant tripeptide",
    variants: [{ size: "1500 mg", price: 85 }],
  },
  {
    name: "Botulinum Toxin", category: "Aesthetic", tagline: "Neuromodulator",
    variants: [{ size: "100 iu", price: 230 }],
    unit: "iu",
  },
  {
    name: "Tesamorelin", category: "Growth", tagline: "GHRH analog",
    variants: [{ size: "2 mg", price: 64 }, { size: "5 mg", price: 121 }, { size: "10 mg", price: 200 }],
  },
  {
    name: "Insulin", category: "Hormonal", tagline: "Pancreatic hormone",
    variants: [{ size: "1 vial", price: 333 }],
    packs: [{ strength: "1 vial", pack: "/ box" }],
  },
  {
    name: "GLP-1", category: "Metabolic", tagline: "Glucagon-like peptide-1",
    variants: [{ size: "5 mg", price: 116 }],
  },
  {
    name: "Bacteriostatic Water", category: "Reconstitution", tagline: "0.9% benzyl alcohol diluent",
    variants: [{ size: "3 ml", price: 10 }, { size: "10 ml", price: 11 }],
  },
  {
    name: "Acetic Acid", category: "Reconstitution", tagline: "0.6% reconstitution solvent",
    variants: [{ size: "10 ml", price: 16 }],
  },
  { name: "Topilutamide", category: "Aesthetic", tagline: "Topical anti-androgen (Fluridil)" },
  { name: "RU-58841", category: "Aesthetic", tagline: "Non-steroidal topical anti-androgen" },
  { name: "PE-22-28", category: "Cognitive", tagline: "TREK-1 antagonist research peptide" },
  {
    name: "SNAP-8", category: "Aesthetic", tagline: "Acetyl octapeptide-3 cosmetic peptide",
    variants: [{ size: "10 mg", price: 55 }],
  },
  {
    name: "Melanotan 1", category: "Aesthetic", tagline: "Afamelanotide melanocortin agonist",
    variants: [{ size: "10 mg", price: 60 }],
  },
  {
    name: "KLOW Blend", category: "Regenerative", tagline: "GHK-Cu + BPC-157 + TB-500 + KPV synergy blend",
    variants: [{ size: "80 mg", price: 195 }],
  },
  {
    name: "CJC-1295 no DAC", category: "Growth", tagline: "Modified GRF (1-29) GHRH analog",
    variants: [{ size: "5 mg", price: 49 }, { size: "10 mg", price: 90 }],
  },
  {
    name: "5-Amino-1MQ", category: "Metabolic", tagline: "NNMT inhibitor metabolic research compound",
    variants: [{ size: "50 mg", price: 110 }],
  },
  {
    name: "KPV", category: "Regenerative", tagline: "Anti-inflammatory tripeptide (Lys-Pro-Val)",
    variants: [{ size: "5 mg", price: 45 }, { size: "10 mg", price: 80 }],
  },
  {
    name: "Hexarelin", category: "Growth", tagline: "Potent GH secretagogue hexapeptide",
    variants: [{ size: "5 mg", price: 55 }, { size: "10 mg", price: 95 }],
  },
  {
    name: "Dalosirvat", category: "Aesthetic", tagline: "SM04554 Wnt-pathway hair-loss research compound",
    variants: [{ size: "30 ml", price: 120 }],
  },
];

// Map of product slug -> COA file path (in /public)
const coaMap: Record<string, string> = {
  "aod-9604": "/coa/aod-9604-coa.png",
  "topilutamide": "/coa/topilutamide-coa.png",
  "ru-58841": "/coa/ru-58841-coa.png",
  "pe-22-28": "/coa/pe-22-28-coa.png",
  "hcg": "/coa/hcg-coa.png",
  "snap-8": "/coa/snap-8-coa.png",
  "melanotan-1": "/coa/melanotan-1-coa.png",
  "klow-blend": "/coa/klow-blend-coa.png",
  "cjc-1295-no-dac": "/coa/cjc-1295-no-dac-coa.png",
  "5-amino-1mq": "/coa/5-amino-1mq-coa.png",
  "kpv": "/coa/kpv-coa.png",
  "hexarelin": "/coa/hexarelin-coa.png",
  "dalosirvat": "/coa/dalosirvat-coa.png",
  "glutathione": "/coa/glutathione-coa.png",
  "bpc-157": "/coa/bpc-157-coa.png",
};

const customImages: Record<string, string> = {
  "bpc-157": bpc157Img,
  "tb-500": tb500Img,
  "nad": nadImg,
  "hgh": hghImg,
  "melanotan-2": melanotanImg,
  "ipamorelin": ipamorelinImg,
  "glutathione": glutathioneImg,
  "bacteriostatic-water": bacWaterImg,
  "cagrilintide": cagrilintideImg,
  "aod-9604": aod9604Img,
  "epitalon": epitalonImg,
  "hcg": hcgImg,
  "hmg": hmgImg,
  "mazdutide": mazdutideImg,
  "survodutide": survodutideImg,
  "semax": semaxImg,
  "sermorelin": sermorelinImg,
  "kisspeptin": kisspeptinImg,
  "oxytocin": oxytocinImg,
  "selank": selankImg,
  "thymosin-alpha-1": thymosinImg,
  "ss-31": ss31Img,
  "dermorphin": dermorphinImg,
  "tesamorelin": tesamorelinImg,
  "glp-1": glp1Img,
  "acetic-acid": aceticAcidImg,
  "topilutamide": topilutamideImg,
  "ru-58841": ru58841Img,
  "pe-22-28": pe2228Img,
  "kpv": kpvImg,
  "hexarelin": hexarelinImg,
  "dalosirvat": dalosirvatImg,
};

function variantToPack(v: Variant, unit?: string): PackSpec {
  const strength = v.size.replace(/\s+/g, "");
  const isVolume = /ml/i.test(v.size);
  const isUnit = unit === "iu" || /iu/i.test(v.size);
  const isPen = /pen/i.test(v.size);
  const isVial = /vial/i.test(v.size);
  if (isPen || isVial) return { strength, pack: "/ box" };
  if (isVolume || isUnit) return { strength, pack: "× 10 vials" };
  return { strength, pack: "× 10 vials" };
}

for (const item of inquireCatalog) {
  const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (products.some((p) => p.slug === slug)) continue;
  const variants = item.variants;
  const packs = item.packs ?? variants?.map((v) => variantToPack(v, item.unit));
  products.push({
    slug,
    name: item.name,
    category: item.category,
    tagline: item.tagline,
    description: `Premium research-grade ${item.name}. Independently HPLC-verified, lyophilized for stability and dispatched globally with COA on request.`,
    highlights: ["Pharma-grade synthesis", "HPLC verified ≥ 99% purity", "Discreet global dispatch"],
    purity: "≥ 99.0%",
    image: customImages[slug] ?? vialImg,
    inquireOnly: !variants,
    coa: coaMap[slug],
    variants,
    packs,
  });
}