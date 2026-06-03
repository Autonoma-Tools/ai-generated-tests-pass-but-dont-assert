import { calculateDiscountedPrice } from "./calculateDiscountedPrice";

/**
 * AFTER: the behavior-asserting test.
 *
 * The expected values here are derived independently of the function.
 * They are computed by hand from the business rule:
 *
 *   Silver = price * 0.85   (15% off)
 *   Gold   = price * 0.75   (25% off)
 *
 * Because the expected side does not call the function, it cannot drift
 * with a buggy implementation. If someone changes the Silver rate from
 * 15% to 5%, calculateDiscountedPrice(100, "Silver") returns 95 while the
 * test still expects 85, so the test fails and the regression is caught.
 */
describe("calculateDiscountedPrice (behavioral / after)", () => {
  it("charges 85 percent of price for Silver", () => {
    // Hand-computed: 100 * 0.85 = 85. Not produced by the function.
    expect(calculateDiscountedPrice(100, "Silver")).toBe(85);
  });

  it("charges 75 percent of price for Gold", () => {
    // Hand-computed: 200 * 0.75 = 150.
    expect(calculateDiscountedPrice(200, "Gold")).toBe(150);
  });

  it("rejects negative prices", () => {
    expect(() => calculateDiscountedPrice(-1, "Silver")).toThrow(RangeError);
  });
});
