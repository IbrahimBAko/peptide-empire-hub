import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listProducts from "./tools/list-products";
import getProduct from "./tools/get-product";
import listCategories from "./tools/list-categories";
import getOrderInfo from "./tools/get-order-info";

const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "peptide-empire-hub",
  title: "Peptide Empire Hub",
  version: "0.1.0",
  instructions:
    "Public tools for the Peptide Empire research peptide catalog. Use `list_categories` and `list_products` to browse or search the catalog, `get_product` for full specifications, pack sizes, pricing and Certificate of Analysis availability, and `get_order_info` for the inquiry-based ordering process and business contact channels. All products are for laboratory research use only.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listProducts, getProduct, listCategories, getOrderInfo],
});