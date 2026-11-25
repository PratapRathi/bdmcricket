import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { categoryAdminSchema } from "@/features/admin/validation/schemas";
import { createAdminCategory, listAdminCategories } from "@/features/admin/services/admin-category-service";

export async function GET(request: Request) {
  return withAdmin(request, async () => jsonSuccess(await listAdminCategories()));
}

export async function POST(request: Request) {
  return withAdmin(request, async (admin) => {
    let body: unknown;
    try { body = await request.json(); } catch { return jsonError("INVALID_JSON", "A valid JSON body is required.", 400); }
    const parsed = categoryAdminSchema.safeParse(body);
    if (!parsed.success) return jsonError("INVALID_CATEGORY", parsed.error.issues[0]?.message ?? "Check the category fields.", 400);
    const result = await createAdminCategory(admin, parsed.data);
    if ("error" in result) return jsonError("INVALID_CATEGORY", result.error, 400);
    return jsonSuccess(result.category, { status: 201 });
  });
}
