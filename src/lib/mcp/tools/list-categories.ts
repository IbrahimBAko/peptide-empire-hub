import { defineTool } from "@lovable.dev/mcp-js";
import { allEntries } from "../catalog";

export default defineTool({
  name: "list_categories",
  title: "List catalog categories",
  description: "List every product category in the Peptide Empire catalog with its product count.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const counts = new Map<string, number>();
    for (const p of allEntries()) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    const categories = [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return {
      content: [{ type: "text", text: JSON.stringify({ categories }, null, 2) }],
      structuredContent: { categories },
    };
  },
});