import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { withAdmin } from "@/lib/admin-auth/guard";
import { productAdminSchema } from "@/features/admin/validation/schemas";
import { deleteAdminProduct, updateAdminProduct } from "@/features/admin/services/admin-product-service";

function parseId(raw: string) {
  const id = Number(raw);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/products/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = parseId((await params).id);
    if (!id) return jsonError("INVALID_ID", "A valid product ID is required.", 400);
    let body: unknown;
    try { body = await request.json(); } catch { return jsonError("INVALID_JSON", "A valid JSON body is required.", 400); }
    const parsed = productAdminSchema.safeParse(body);
    if (!parsed.success) return jsonError("INVALID_PRODUCT", parsed.error.issues[0]?.message ?? "Check the product fields.", 400);
    const result = await updateAdminProduct(admin, id, parsed.data);
    if ("error" in result) return jsonError("INVALID_RELATION", result.error ?? "Check the category, subcategory, and image references.", 400);
    return jsonSuccess(result.product);
  });
}

export async function DELETE(request: Request, { params }: RouteContext<"/api/admin/products/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = parseId((await params).id);
    if (!id) return jsonError("INVALID_ID", "A valid product ID is required.", 400);
    return jsonSuccess(await deleteAdminProduct(admin, id));
  });
}
