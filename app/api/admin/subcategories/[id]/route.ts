import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { subcategoryAdminSchema } from "@/features/admin/validation/schemas";
import { deleteAdminSubcategory, updateAdminSubcategory } from "@/features/admin/services/admin-category-service";

function parseId(raw: string) { const id = Number(raw); return Number.isSafeInteger(id) && id > 0 ? id : null; }

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/subcategories/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = parseId((await params).id);
    if (!id) return jsonError("INVALID_ID", "A valid subcategory ID is required.", 400);
    let body: unknown;
    try { body = await request.json(); } catch { return jsonError("INVALID_JSON", "A valid JSON body is required.", 400); }
    const parsed = subcategoryAdminSchema.safeParse(body);
    if (!parsed.success) return jsonError("INVALID_SUBCATEGORY", parsed.error.issues[0]?.message ?? "Check the subcategory fields.", 400);
    const result = await updateAdminSubcategory(admin, id, parsed.data);
    if ("error" in result) return jsonError("INVALID_SUBCATEGORY", result.error, 400);
    return jsonSuccess(result.subcategory);
  });
}

export async function DELETE(request: Request, { params }: RouteContext<"/api/admin/subcategories/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = parseId((await params).id);
    if (!id) return jsonError("INVALID_ID", "A valid subcategory ID is required.", 400);
    const result = await deleteAdminSubcategory(admin, id);
    if ("error" in result) return jsonError("SUBCATEGORY_IN_USE", result.error, 409);
    return jsonSuccess(result.subcategory);
  });
}
