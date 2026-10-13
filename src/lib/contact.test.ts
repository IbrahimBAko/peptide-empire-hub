import { describe, expect, test } from "bun:test";
import { CONTACT, waLink } from "./contact";

describe("WhatsApp contact", () => {
  test("uses the requested business number", () => {
    expect(CONTACT.phoneDisplay).toBe("+1 (945) 437-0006");
    expect(new URL(waLink()).searchParams.get("phone")).toBe("19454370006");
  });

  test("preserves the customer's order message", () => {
    const message = "BPC-157 × 2\nDelivery: Douala & inquiry";
    expect(new URL(waLink(message)).searchParams.get("text")).toBe(message);
  });
});