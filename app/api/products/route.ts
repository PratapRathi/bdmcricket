import { getProductsForBrowser } from "@/lib/data/catalog";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { productQuerySchema } from "@/features/products/validation/product-query";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = productQuerySchema.safeParse({
    q: url.searchParams.get("q") ?? "",
    category: url.searchParams.get("category") ?? "",
    subcategory: url.searchParams.get("subcategory") ?? "",
    sort: url.searchParams.get("sort") ?? "featured",
  });

  if (!parsed.success) return jsonError("INVALID_QUERY", "Product filters are invalid.", 400);

  try {
    const products = await getProductsForBrowser({
      query: parsed.data.q,
      categorySlug: parsed.data.category,
      subcategorySlug: parsed.data.subcategory,
      sort: parsed.data.sort,
    });
    return jsonSuccess(products, { headers: { "Cache-Control": "private, max-age=30" } });
  } catch (error) {
    console.error("Product catalogue request failed", error);
    return jsonError("PRODUCTS_UNAVAILABLE", "Products could not be loaded right now.", 500);
  }
}
