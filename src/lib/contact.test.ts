import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { CONTACT, waLink } from "./contact";

describe("WhatsApp contact", () => {
  test("uses the requested business number", () => {
    assert.equal(CONTACT.phoneDisplay, "+1 (945) 437-0006");
    assert.equal(new URL(waLink()).searchParams.get("phone"), "19454370006");
  });

  test("preserves the customer's order message", () => {
    const message = "BPC-157 × 2\nDelivery: Douala & inquiry";
    assert.equal(new URL(waLink(message)).searchParams.get("text"), message);
  });
});