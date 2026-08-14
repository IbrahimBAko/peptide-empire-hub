/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR THE PRODUCTION SITE URL
 *
 *  When a custom domain is connected, change SITE_URL below to
 *  the new domain (no trailing slash), e.g. "https://example.com".
 *  Canonical tags, og:url, sitemap.xml, robots.txt and JSON-LD all
 *  derive from this value — nothing else needs editing.
 *
 *  GOOGLE SEARCH CONSOLE:
 *  Prefer DNS or HTML-file verification. If Google asks for the
 *  meta-tag method, paste the real code into GSC_VERIFICATION below
 *  (it is rendered in <head> only when non-empty). Leave it "" until
 *  you have the actual code from Search Console — never guess one.
 * ─────────────────────────────────────────────────────────────
 */
export const SITE_URL = "https://peptide-empire-hub.lovable.app";

export const SITE_NAME = "Peptide Empire";

export const GSC_VERIFICATION = "";

/** Absolute URL for a site-relative path. */
export const abs = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Default social sharing image (public/og-cover.jpg). */
export const OG_IMAGE = abs("/og-cover.jpg");

type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
};

/** Builds the per-route meta array: title, description, OG and Twitter tags. */
export function seoMeta({ title, description, path, type = "website", image = OG_IMAGE }: SeoInput) {
  const url = abs(path);
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}

/** Self-referencing canonical link for a leaf route. */
export const canonical = (path: string) => [{ rel: "canonical", href: abs(path) }];

/** Keep utility pages (cart, sign-in, consent) out of the index. */
export const noindex = { name: "robots", content: "noindex, nofollow" };

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
