# Project rules

- Keep business contact destinations centralized in `src/lib/contact.ts` so every inquiry channel uses the same current contact details.
- Keep promo validation, cent-rounded totals, and inquiry discount lines in `src/lib/promo.ts` so the cart and both inquiry channels use the same calculation; no payment or order server currently processes these inquiries.
- Product detail pages use the catalog slug on `/products/$slug`; keep them discoverable from catalog links and the sitemap so search engines can index each compound.