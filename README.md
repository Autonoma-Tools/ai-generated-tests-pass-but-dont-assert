# AI-Generated Tests That Pass But Don't Assert Anything

TypeScript companion for 'AI-Generated Tests That Pass But Don't Assert Anything': a discount-calculation module with a tautological test (before) and a behavior-asserting test (after), illustrating exactly how AI-generated unit tests create false coverage and how to fix them.

> Companion code for the Autonoma blog post: **[AI-Generated Tests That Pass But Don't Assert Anything](https://getautonoma.com/blog/ai-generated-tests-pass-but-dont-assert)**

## Requirements

Node 18+ (npm install pulls Jest, ts-jest, and TypeScript)

## Quickstart

```bash
git clone https://github.com/Autonoma-Tools/ai-generated-tests-pass-but-dont-assert.git
cd ai-generated-tests-pass-but-dont-assert
npm install && npm test
```

## Project structure

```
.
├── package.json
├── tsconfig.json
├── jest.config.js
└── src
    └── discount
        ├── calculateDiscountedPrice.ts   # the implementation under test
        ├── tautological.test.ts          # BEFORE: passes even when the logic is wrong
        └── behavioral.test.ts            # AFTER: fails when the logic is wrong
```

- `src/discount/calculateDiscountedPrice.ts` is the function under test: Silver tier is 15% off, Gold tier is 25% off.

## Before and after: the tautological trap

This repo demonstrates the article's core point with two test files that test the *same* function, side by side.

**Before (`tautological.test.ts`)** is the test an AI assistant tends to produce when asked to "write a test" without being told the expected output. It derives the expected value by calling the function itself:

```ts
const expected = calculateDiscountedPrice(price, "Silver");
expect(calculateDiscountedPrice(price, "Silver")).toBe(expected);
```

Both sides of the assertion run the same code, so the test is a tautology. It passes by construction and proves nothing about correctness. Change the Silver rate from 15% to 5% and this test still passes: the "expected" value drifts along with the bug.

**After (`behavioral.test.ts`)** asserts against independently derived, hand-computed values from the business rule:

```ts
expect(calculateDiscountedPrice(100, "Silver")).toBe(85);  // 100 * 0.85
expect(calculateDiscountedPrice(200, "Gold")).toBe(150);   // 200 * 0.75
```

The expected side never calls the function, so it cannot move with a buggy implementation. Change the Silver rate to 5% and this test fails immediately, catching the regression.

### Prove it yourself

Run each suite independently:

```bash
npm run test:before   # the tautological suite
npm run test:after    # the behavior-asserting suite
```

Then edit `src/discount/calculateDiscountedPrice.ts` and change `Silver: 0.15` to `Silver: 0.05`. Re-run both:

- `npm run test:before` still passes (false coverage, the bug survives).
- `npm run test:after` fails on the Silver case (the bug is caught).

That difference is the entire thesis: a test that asserts the implementation back to itself gives you a green check and zero protection.

## About

This repository is maintained by [Autonoma](https://getautonoma.com) as reference material for the linked blog post. Autonoma builds autonomous AI agents that plan, execute, and maintain end-to-end tests directly from your codebase.

If something here is wrong, out of date, or unclear, please [open an issue](https://github.com/Autonoma-Tools/ai-generated-tests-pass-but-dont-assert/issues/new).

## License

Released under the [MIT License](./LICENSE) © 2026 Autonoma Labs.
