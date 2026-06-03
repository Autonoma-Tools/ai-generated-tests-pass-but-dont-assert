import { calculateDiscountedPrice } from "./calculateDiscountedPrice";

/**
 * BEFORE: the tautological test.
 *
 * This is the kind of test an AI assistant produces when asked to
 * "write a test for calculateDiscountedPrice" without being told what
 * the correct output should be. The expected value is derived from the
 * function itself, so the assertion compares the implementation to a
 * copy of the implementation.
 *
 * The test passes. It always passes. It will keep passing even if the
 * discount logic is wrong, because the "expected" side moves in lockstep
 * with the "actual" side. It asserts that the code does what the code
 * does, which is true by construction and tells you nothing.
 */
describe("calculateDiscountedPrice (tautological / before)", () => {
  it("applies the Silver discount", () => {
    const price = 100;

    // The expected value is computed by re-running the same code path.
    // If the Silver rate were changed from 15% to 5%, this line would
    // change with it, and the assertion would still pass.
    const expected = calculateDiscountedPrice(price, "Silver");

    expect(calculateDiscountedPrice(price, "Silver")).toBe(expected);
  });

  it("applies the Gold discount", () => {
    const price = 200;

    // Same failure mode: the function is its own oracle.
    const expected = calculateDiscountedPrice(price, "Gold");

    expect(calculateDiscountedPrice(price, "Gold")).toBe(expected);
  });
});
