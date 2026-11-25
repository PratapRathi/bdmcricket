import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonSuccess } from "@/lib/api/responses";
import { readJson } from "@/lib/admin-auth/route-input";
import { milestoneAdminSchema } from "@/features/admin/validation/schemas";
import { createMilestone } from "@/features/admin/services/admin-content-service";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  return withAdmin(request, async () => jsonSuccess(await prisma.companyMilestone.findMany({ orderBy: { sortOrder: "asc" } })));
}

export async function POST(request: Request) {
  return withAdmin(request, async (admin) => {
    const parsed = await readJson(request, milestoneAdminSchema, "INVALID_MILESTONE", "milestone");
    if (parsed.response) return parsed.response;
    return jsonSuccess(await createMilestone(admin, parsed.data), { status: 201 });
  });
}
