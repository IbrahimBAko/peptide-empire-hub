import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { calculatePromo, promoSummary } from "./promo";

describe("promo discount", () => {
  test("WELCOME4 deducts 4% from the final amount", () => {
    const result = calculatePromo(100, "WELCOME4");
    assert.equal(result.code, "WELCOME4");
    assert.equal(result.discount, 4);
    assert.equal(result.total, 96);
  });
  test("any other non-empty code also qualifies, without stacking", () => {
    const result = calculatePromo(250, "another code");
    assert.equal(result.discount, 10);
    assert.equal(result.total, 240);
  });
  test("empty and whitespace-only codes do not qualify", () => {
    for (const code of ["", "   "]) {
      assert.equal(calculatePromo(100, code).discount, 0);
      assert.equal(calculatePromo(100, code).total, 100);
    }
  });
  test("discount is rounded to cents and subtracted from the subtotal", () => {
    assert.equal(calculatePromo(19.99, "WELCOME4").discount, 0.8);
    assert.equal(calculatePromo(19.99, "WELCOME4").total, 19.19);
  });
  test("invalid input cannot enter an inquiry or earn a discount", () => {
    for (const code of ["x".repeat(81), "WELCOME4\nInjected"]) {
      const result = calculatePromo(100, code);
      assert.equal(result.code, "");
      assert.equal(result.discount, 0);
      assert.equal(result.total, 100);
      assert.notEqual(result.error, "");
    }
  });
  test("inquiries carry the code, four-percent deduction and final total", () => {
    assert.deepEqual(promoSummary(100, " WELCOME4 "), [
      "Estimated subtotal: $100.00", "Promo code: WELCOME4", "Promo discount (4%): -$4.00", "Estimated total: $96.00",
    ]);
  });
});
