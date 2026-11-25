import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { withAdmin } from "@/lib/admin-auth/guard";
import { productAdminSchema } from "@/features/admin/validation/schemas";
import { createAdminProduct, listAdminProducts } from "@/features/admin/services/admin-product-service";

export async function GET(request: Request) {
  return withAdmin(request, async () => jsonSuccess(await listAdminProducts()));
}

export async function POST(request: Request) {
  return withAdmin(request, async (admin) => {
    let body: unknown;
    try { body = await request.json(); } catch { return jsonError("INVALID_JSON", "A valid JSON body is required.", 400); }
    const parsed = productAdminSchema.safeParse(body);
    if (!parsed.success) return jsonError("INVALID_PRODUCT", parsed.error.issues[0]?.message ?? "Check the product fields.", 400);
    const result = await createAdminProduct(admin, parsed.data);
    if ("error" in result) return jsonError("INVALID_RELATION", result.error ?? "Check the category, subcategory, and image references.", 400);
    return jsonSuccess(result.product, { status: 201 });
  });
}
