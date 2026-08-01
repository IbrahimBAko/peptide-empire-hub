import { defineTool } from "@lovable.dev/mcp-js";
import { CONTACT } from "@/lib/contact";

export default defineTool({
  name: "get_order_info",
  title: "Get ordering & contact info",
  description:
    "Get Peptide Empire's inquiry-based ordering process, accepted payment methods and public business contact channels (WhatsApp, email).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      orderingModel:
        "Inquiry-based ordering. Build a cart on the website, then send the order summary to the business via WhatsApp or email. No instant online checkout.",
      contact: {
        whatsapp: CONTACT.phoneDisplay,
        whatsappLink: `whatsapp://send?phone=${CONTACT.whatsapp}`,
        email: CONTACT.email,
      },
      paymentMethods: ["Chime", "Gift Card", "Cash App", "Bitcoin", "USDT (Tron TRC20)"],
      notes:
        "All products are sold strictly for laboratory research use only and are not for human or veterinary consumption.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});