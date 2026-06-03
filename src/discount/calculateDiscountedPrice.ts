export type Tier = "Silver" | "Gold";

/**
 * Discount rates by membership tier.
 * Silver members get 15% off, Gold members get 25% off.
 */
const DISCOUNT_RATES: Record<Tier, number> = {
  Silver: 0.15,
  Gold: 0.25,
};

/**
 * Returns the price after applying the tier discount.
 *
 * Silver = price * 0.85
 * Gold   = price * 0.75
 *
 * @param price the original price, must be a non-negative finite number
 * @param tier the membership tier
 */
export function calculateDiscountedPrice(price: number, tier: Tier): number {
  if (!Number.isFinite(price) || price < 0) {
    throw new RangeError("price must be a non-negative finite number");
  }

  const rate = DISCOUNT_RATES[tier];
  if (rate === undefined) {
    throw new RangeError(`unknown tier: ${tier}`);
  }

  return price * (1 - rate);
}
