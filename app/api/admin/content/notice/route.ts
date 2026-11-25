import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonSuccess } from "@/lib/api/responses";
import { readJson } from "@/lib/admin-auth/route-input";
import { noticeAdminSchema } from "@/features/admin/validation/schemas";
import { updateSiteNotice } from "@/features/admin/services/admin-content-service";

export async function PATCH(request: Request) {
  return withAdmin(request, async (admin) => {
    const parsed = await readJson(request, noticeAdminSchema, "INVALID_NOTICE", "site notice");
    if (parsed.response) return parsed.response;
    return jsonSuccess(await updateSiteNotice(admin, parsed.data));
  });
}
