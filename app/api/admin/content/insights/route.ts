import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonSuccess } from "@/lib/api/responses";
import { readJson } from "@/lib/admin-auth/route-input";
import { insightAdminSchema } from "@/features/admin/validation/schemas";
import { createInsight } from "@/features/admin/services/admin-content-service";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  return withAdmin(request, async () => jsonSuccess(await prisma.companyInsight.findMany({ orderBy: [{ section: "asc" }, { sortOrder: "asc" }] })));
}

export async function POST(request: Request) {
  return withAdmin(request, async (admin) => {
    const parsed = await readJson(request, insightAdminSchema, "INVALID_INSIGHT", "company content");
    if (parsed.response) return parsed.response;
    return jsonSuccess(await createInsight(admin, parsed.data), { status: 201 });
  });
}
