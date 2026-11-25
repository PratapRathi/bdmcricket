import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonSuccess } from "@/lib/api/responses";
import { readJson } from "@/lib/admin-auth/route-input";
import { ratingsAdminSchema } from "@/features/admin/validation/schemas";
import { updateRatings } from "@/features/admin/services/admin-content-service";

export async function PUT(request: Request) {
  return withAdmin(request, async (admin) => {
    const parsed = await readJson(request, ratingsAdminSchema, "INVALID_RATINGS", "rating distribution");
    if (parsed.response) return parsed.response;
    return jsonSuccess(await updateRatings(admin, parsed.data));
  });
}
