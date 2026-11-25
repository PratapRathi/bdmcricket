import assert from "node:assert/strict";
import test from "node:test";
import { productQuerySchema } from "../features/products/validation/product-query";

test("product filters default to an unfiltered featured catalogue", () => {
  const result = productQuerySchema.safeParse({});
  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data, { q: "", category: "", subcategory: "", sort: "featured" });
  }
});

test("product filters trim search text and allow supported sorts", () => {
  const result = productQuerySchema.safeParse({ q: "  Kashmir willow  ", sort: "price-low" });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.q, "Kashmir willow");
    assert.equal(result.data.sort, "price-low");
  }
});

test("product filters reject invalid sorts and oversized search text", () => {
  assert.equal(productQuerySchema.safeParse({ sort: "random" }).success, false);
  assert.equal(productQuerySchema.safeParse({ q: "x".repeat(101) }).success, false);
});
