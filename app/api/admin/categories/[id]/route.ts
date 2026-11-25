import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { categoryAdminSchema } from "@/features/admin/validation/schemas";
import { deleteAdminCategory, updateAdminCategory } from "@/features/admin/services/admin-category-service";

function parseId(raw: string) { const id = Number(raw); return Number.isSafeInteger(id) && id > 0 ? id : null; }

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/categories/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = parseId((await params).id);
    if (!id) return jsonError("INVALID_ID", "A valid category ID is required.", 400);
    let body: unknown;
    try { body = await request.json(); } catch { return jsonError("INVALID_JSON", "A valid JSON body is required.", 400); }
    const parsed = categoryAdminSchema.safeParse(body);
    if (!parsed.success) return jsonError("INVALID_CATEGORY", parsed.error.issues[0]?.message ?? "Check the category fields.", 400);
    const result = await updateAdminCategory(admin, id, parsed.data);
    if ("error" in result) return jsonError("INVALID_CATEGORY", result.error, 400);
    return jsonSuccess(result.category);
  });
}

export async function DELETE(request: Request, { params }: RouteContext<"/api/admin/categories/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = parseId((await params).id);
    if (!id) return jsonError("INVALID_ID", "A valid category ID is required.", 400);
    const result = await deleteAdminCategory(admin, id);
    if ("error" in result) return jsonError("CATEGORY_IN_USE", result.error, 409);
    return jsonSuccess(result.category);
  });
}
