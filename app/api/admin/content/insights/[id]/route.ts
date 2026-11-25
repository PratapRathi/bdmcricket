import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { parseEntityId, readJson } from "@/lib/admin-auth/route-input";
import { insightAdminSchema } from "@/features/admin/validation/schemas";
import { deleteInsight, updateInsight } from "@/features/admin/services/admin-content-service";

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/content/insights/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = parseEntityId((await params).id);
    if (!id) return jsonError("INVALID_ID", "A valid content ID is required.", 400);
    const parsed = await readJson(request, insightAdminSchema, "INVALID_INSIGHT", "company content");
    if (parsed.response) return parsed.response;
    return jsonSuccess(await updateInsight(admin, id, parsed.data));
  });
}

export async function DELETE(request: Request, { params }: RouteContext<"/api/admin/content/insights/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = parseEntityId((await params).id);
    if (!id) return jsonError("INVALID_ID", "A valid content ID is required.", 400);
    return jsonSuccess(await deleteInsight(admin, id));
  });
}
