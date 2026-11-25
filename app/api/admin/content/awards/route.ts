import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonSuccess } from "@/lib/api/responses";
import { readJson } from "@/lib/admin-auth/route-input";
import { awardAdminSchema } from "@/features/admin/validation/schemas";
import { createAward } from "@/features/admin/services/admin-content-service";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  return withAdmin(request, async () => jsonSuccess(await prisma.award.findMany({ orderBy: { sortOrder: "asc" }, include: { image: { select: { key: true, altText: true } } } })));
}

export async function POST(request: Request) {
  return withAdmin(request, async (admin) => {
    const parsed = await readJson(request, awardAdminSchema, "INVALID_AWARD", "award");
    if (parsed.response) return parsed.response;
    return jsonSuccess(await createAward(admin, parsed.data), { status: 201 });
  });
}
