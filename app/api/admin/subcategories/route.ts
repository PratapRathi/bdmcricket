import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { subcategoryAdminSchema } from "@/features/admin/validation/schemas";
import { createAdminSubcategory } from "@/features/admin/services/admin-category-service";

export async function POST(request: Request) {
  return withAdmin(request, async (admin) => {
    let body: unknown;
    try { body = await request.json(); } catch { return jsonError("INVALID_JSON", "A valid JSON body is required.", 400); }
    const parsed = subcategoryAdminSchema.safeParse(body);
    if (!parsed.success) return jsonError("INVALID_SUBCATEGORY", parsed.error.issues[0]?.message ?? "Check the subcategory fields.", 400);
    const result = await createAdminSubcategory(admin, parsed.data);
    if ("error" in result) return jsonError("INVALID_SUBCATEGORY", result.error, 400);
    return jsonSuccess(result.subcategory, { status: 201 });
  });
}
