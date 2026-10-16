import { describe, expect, test } from "bun:test";
import { calculatePromo, promoSummary } from "./promo";

describe("promo discount", () => {
  test("EMILY1 deducts 4% from the final amount", () => {
    expect(calculatePromo(100, "EMILY1")).toMatchObject({ code: "EMILY1", discount: 4, total: 96 });
  });
  test("any other non-empty code also qualifies, without stacking", () => {
    expect(calculatePromo(250, "another code")).toMatchObject({ discount: 10, total: 240 });
  });
  test("empty and whitespace-only codes do not qualify", () => {
    for (const code of ["", "   "]) {
      expect(calculatePromo(100, code)).toMatchObject({ discount: 0, total: 100 });
    }
  });
  test("discount is rounded to cents and subtracted from the subtotal", () => {
    expect(calculatePromo(19.99, "EMILY1")).toMatchObject({ discount: 0.8, total: 19.19 });
  });
  test("invalid input cannot enter an inquiry or earn a discount", () => {
    for (const code of ["x".repeat(81), "EMILY1\nInjected"]) {
      expect(calculatePromo(100, code)).toMatchObject({ code: "", discount: 0, total: 100 });
      expect(calculatePromo(100, code).error).not.toBe("");
    }
  });
  test("inquiries carry the code, four-percent deduction and final total", () => {
    expect(promoSummary(100, " EMILY1 ")).toEqual([
      "Estimated subtotal: $100.00", "Promo code: EMILY1", "Promo discount (4%): -$4.00", "Estimated total: $96.00",
    ]);
  });
});