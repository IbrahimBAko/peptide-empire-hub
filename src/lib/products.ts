import retatrutideImg from "@/assets/products/retatrutide.jpg";
import tirzepatideImg from "@/assets/products/tirzepatide.jpg";
import semaglutideImg from "@/assets/products/semaglutide.jpg";
import ghkCuImg from "@/assets/products/ghk-cu.jpg";
import glowBlendImg from "@/assets/products/glow-blend.jpg";
import motsCImg from "@/assets/products/mots-c.jpg";

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  purity: string;
  size: string;
  image: string;
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
    size: "10 mg / vial",
    image: retatrutideImg,
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
    size: "10 mg / vial",
    image: tirzepatideImg,
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
    size: "5 mg / vial",
    image: semaglutideImg,
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
    size: "100 mg / vial",
    image: ghkCuImg,
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
    size: "Custom blend vial",
    image: glowBlendImg,
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
    size: "10 mg / vial",
    image: motsCImg,
  },
];