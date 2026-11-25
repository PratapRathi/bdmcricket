import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { parseEntityId, readJson } from "@/lib/admin-auth/route-input";
import { milestoneAdminSchema } from "@/features/admin/validation/schemas";
import { deleteMilestone, updateMilestone } from "@/features/admin/services/admin-content-service";

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/content/milestones/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = parseEntityId((await params).id);
    if (!id) return jsonError("INVALID_ID", "A valid milestone ID is required.", 400);
    const parsed = await readJson(request, milestoneAdminSchema, "INVALID_MILESTONE", "milestone");
    if (parsed.response) return parsed.response;
    return jsonSuccess(await updateMilestone(admin, id, parsed.data));
  });
}

export async function DELETE(request: Request, { params }: RouteContext<"/api/admin/content/milestones/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = parseEntityId((await params).id);
    if (!id) return jsonError("INVALID_ID", "A valid milestone ID is required.", 400);
    return jsonSuccess(await deleteMilestone(admin, id));
  });
}
