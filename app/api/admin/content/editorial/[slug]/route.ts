import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { readJson } from "@/lib/admin-auth/route-input";
import { editorialAdminSchema } from "@/features/admin/validation/schemas";
import { updateEditorialPage } from "@/features/admin/services/admin-content-service";
import { editorialRouteSlugs } from "@/lib/config/site-routes";

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/content/editorial/[slug]">) {
  return withAdmin(request, async (admin) => {
    const { slug } = await params;
    if (!editorialRouteSlugs.includes(slug as (typeof editorialRouteSlugs)[number])) {
      return jsonError("UNKNOWN_PAGE", "Only existing filesystem routes can be edited here.", 404);
    }
    const parsed = await readJson(request, editorialAdminSchema, "INVALID_PAGE", "page content");
    if (parsed.response) return parsed.response;
    return jsonSuccess(await updateEditorialPage(admin, slug, parsed.data));
  });
}
