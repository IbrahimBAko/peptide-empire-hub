import { products, type Product } from "@/lib/products";

export type CatalogEntry = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  purity: string;
  highlights: string[];
  packs: { strength: string; pack: string }[];
  variants: { size: string; price: number }[];
  inquireOnly: boolean;
  labVerified: boolean;
  coaUrl?: string;
};

export function toEntry(p: Product): CatalogEntry {
  return {
    slug: p.slug,
    name: p.name,
    category: p.category,
    tagline: p.tagline,
    description: p.description,
    purity: p.purity,
    highlights: p.highlights ?? [],
    packs: p.packs ?? [],
    variants: p.variants ?? [],
    inquireOnly: Boolean(p.inquireOnly),
    labVerified: Boolean(p.coa),
    ...(p.coa ? { coaUrl: p.coa } : {}),
  };
}

export function allEntries(): CatalogEntry[] {
  return products.map(toEntry);
}

export function findEntry(slug: string): CatalogEntry | undefined {
  const p = products.find((x) => x.slug.toLowerCase() === slug.toLowerCase());
  return p ? toEntry(p) : undefined;
}