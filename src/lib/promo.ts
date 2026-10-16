import { z } from "zod";

export const promoCodeSchema = z.string().trim().max(80, "Use 80 characters or fewer.")
  .refine((code) => !/[\u0000-\u001f\u007f]/.test(code), "Remove special control characters.");

export function calculatePromo(subtotal: number, input: string) {
  const result = promoCodeSchema.safeParse(input);
  const code = result.success ? result.data : "";
  const cents = Math.max(0, Math.round(subtotal * 100));
  const discountCents = code ? Math.round(cents * 0.04) : 0;
  return {
    code,
    discount: discountCents / 100,
    total: (cents - discountCents) / 100,
    error: result.success ? "" : result.error.issues[0]?.message ?? "Invalid promo code.",
  };
}

export function promoSummary(subtotal: number, input: string) {
  const { code, discount, total } = calculatePromo(subtotal, input);
  return [
    `Estimated subtotal: $${subtotal.toFixed(2)}`,
    ...(code ? [`Promo code: ${code}`, `Promo discount (4%): -$${discount.toFixed(2)}`] : []),
    `Estimated total: $${total.toFixed(2)}`,
  ];
}