import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { allEntries } from "../catalog";

export default defineTool({
  name: "list_products",
  title: "List research peptides",
  description:
    "List Peptide Empire's public research peptide catalog. Optionally filter by search term or category.",
  inputSchema: {
    search: z.string().optional().describe("Case-insensitive match on product name, tagline or category."),
    category: z.string().optional().describe("Exact category name, e.g. 'Metabolic'."),
    limit: z.number().int().optional().describe("Maximum number of products to return (default 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ search, category, limit }) => {
    const q = search?.trim().toLowerCase();
    let rows = allEntries();
    if (category) rows = rows.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    if (q) {
      rows = rows.filter((p) =>
        [p.name, p.tagline, p.category, p.description].join(" ").toLowerCase().includes(q),
      );
    }
    const max = Math.min(Math.max(limit ?? 50, 1), 200);
    const items = rows.slice(0, max).map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      tagline: p.tagline,
      purity: p.purity,
      labVerified: p.labVerified,
      priceFrom: p.variants.length ? Math.min(...p.variants.map((v) => v.price)) : null,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify({ total: rows.length, items }, null, 2) }],
      structuredContent: { total: rows.length, items },
    };
  },
});