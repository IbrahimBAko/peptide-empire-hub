import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { findEntry } from "../catalog";

export default defineTool({
  name: "get_product",
  title: "Get peptide details",
  description:
    "Get full public details for one research peptide: description, specifications, pack sizes, pricing and Certificate of Analysis availability.",
  inputSchema: { slug: z.string().min(1).describe("Product slug, e.g. 'retatrutide'.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const product = findEntry(slug);
    if (!product) throw new ToolError(`No product found with slug "${slug}".`);
    return {
      content: [{ type: "text", text: JSON.stringify(product, null, 2) }],
      structuredContent: { product },
    };
  },
});