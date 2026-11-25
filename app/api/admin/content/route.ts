import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonSuccess } from "@/lib/api/responses";
import { getAdminSiteContent } from "@/features/admin/services/admin-content-service";

export async function GET(request: Request) {
  return withAdmin(request, async () => jsonSuccess(await getAdminSiteContent()));
}
