import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { enquiryUpdateSchema } from "@/features/admin/validation/schemas";
import { recordAdminAction } from "@/lib/admin-auth/audit";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/enquiries/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = (await params).id;
    let body: unknown;
    try { body = await request.json(); } catch { return jsonError("INVALID_JSON", "A valid JSON body is required.", 400); }
    const parsed = enquiryUpdateSchema.safeParse(body);
    if (!parsed.success) return jsonError("INVALID_ENQUIRY", parsed.error.issues[0]?.message ?? "Check the enquiry update.", 400);
    const updated = await prisma.contactSubmission.update({ where: { id }, data: parsed.data });
    await recordAdminAction({ actorId: admin.id, action: "UPDATE", entityType: "ContactSubmission", entityId: id, summary: `Updated enquiry ${id} (${updated.status}).` });
    return jsonSuccess(updated);
  });
}

export async function DELETE(request: Request, { params }: RouteContext<"/api/admin/enquiries/[id]">) {
  return withAdmin(request, async (admin) => {
    const id = (await params).id;
    const existing = await prisma.contactSubmission.findUnique({ where: { id }, select: { id: true } });
    if (!existing) return jsonError("NOT_FOUND", "The enquiry was not found.", 404);
    await prisma.contactSubmission.delete({ where: { id } });
    await recordAdminAction({ actorId: admin.id, action: "DELETE", entityType: "ContactSubmission", entityId: id, summary: "Deleted a contact enquiry." });
    return jsonSuccess({ id });
  });
}
