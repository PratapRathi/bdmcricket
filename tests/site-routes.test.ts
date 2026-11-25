import assert from "node:assert/strict";
import test from "node:test";
import { categoryRouteSlugs, editorialRouteSlugs, legacyHtmlPageSlugs, legacyRouteRedirects, staticPublicPaths } from "../lib/config/site-routes";

test("all public route constants are unique and list every website page", () => {
  assert.equal(categoryRouteSlugs.length, 6);
  assert.equal(editorialRouteSlugs.length, 13);
  assert.equal(new Set(staticPublicPaths).size, staticPublicPaths.length);
  assert.ok(staticPublicPaths.includes("/"));
  assert.ok(staticPublicPaths.includes("/products"));
  for (const slug of categoryRouteSlugs) assert.ok(staticPublicPaths.includes(`/${slug}`));
  for (const slug of editorialRouteSlugs) assert.ok(staticPublicPaths.includes(`/${slug}`));
});

test("source site aliases redirect to existing product routes", () => {
  assert.equal(legacyHtmlPageSlugs.length, 31);
  assert.equal(legacyRouteRedirects["cricket-bat"], "/bats");
  assert.equal(legacyRouteRedirects["cricket-equipment"], "/products");
  assert.ok(legacyRouteRedirects["cricket-helmet"].startsWith("/protective-gear#"));
});
