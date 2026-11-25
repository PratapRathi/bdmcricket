import { z } from "zod";
import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { prisma } from "@/lib/prisma";

const querySchema = z.object({
  q: z.string().trim().max(120).default(""),
  status: z.enum(["NEW", "IN_PROGRESS", "RESOLVED"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
});

export async function GET(request: Request) {
  return withAdmin(request, async () => {
    const url = new URL(request.url);
    const parsed = querySchema.safeParse({ q: url.searchParams.get("q") ?? "", status: url.searchParams.get("status") ?? undefined, page: url.searchParams.get("page") ?? 1 });
    if (!parsed.success) return jsonError("INVALID_FILTER", "The enquiry filters are invalid.", 400);

    const where = {
      ...(parsed.data.status ? { status: parsed.data.status } : {}),
      ...(parsed.data.q ? { OR: [
        { name: { contains: parsed.data.q, mode: "insensitive" as const } },
        { email: { contains: parsed.data.q, mode: "insensitive" as const } },
        { subject: { contains: parsed.data.q, mode: "insensitive" as const } },
        { message: { contains: parsed.data.q, mode: "insensitive" as const } },
      ] } : {}),
    };
    const pageSize = 30;
    const [total, submissions] = await Promise.all([
      prisma.contactSubmission.count({ where }),
      prisma.contactSubmission.findMany({ where, orderBy: { createdAt: "desc" }, skip: (parsed.data.page - 1) * pageSize, take: pageSize }),
    ]);
    return jsonSuccess({ submissions, total, page: parsed.data.page, pageSize });
  });
}
