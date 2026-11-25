import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { parseEntityId, readJson } from "@/lib/admin-auth/route-input";
import { awardAdminSchema } from "@/features/admin/validation/schemas";
import { deleteAward, updateAward } from "@/features/admin/services/admin-content-service";

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/content/awards/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = parseEntityId((await params).id);
    if (!id) return jsonError("INVALID_ID", "A valid award ID is required.", 400);
    const parsed = await readJson(request, awardAdminSchema, "INVALID_AWARD", "award");
    if (parsed.response) return parsed.response;
    return jsonSuccess(await updateAward(admin, id, parsed.data));
  });
}

export async function DELETE(request: Request, { params }: RouteContext<"/api/admin/content/awards/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = parseEntityId((await params).id);
    if (!id) return jsonError("INVALID_ID", "A valid award ID is required.", 400);
    return jsonSuccess(await deleteAward(admin, id));
  });
}
