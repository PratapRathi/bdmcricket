import { prisma } from "@/lib/prisma";
import { withAdmin } from "@/lib/admin-auth/guard";
import { setAdminSession } from "@/lib/admin-auth/session";
import { hashPassword, verifyPassword } from "@/lib/admin-auth/password";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { adminCredentialsSchema } from "@/features/admin/validation/schemas";

export async function PATCH(request: Request) {
  return withAdmin(request, async (actor) => {
    let body: unknown;
    try { body = await request.json(); } catch { return jsonError("INVALID_JSON", "A valid JSON body is required.", 400); }
    const parsed = adminCredentialsSchema.safeParse(body);
    if (!parsed.success) return jsonError("INVALID_CREDENTIALS", parsed.error.issues[0]?.message ?? "Check the new admin credentials.", 400);

    const current = await prisma.adminUser.findUnique({ where: { id: actor.id } });
    if (!current || !await verifyPassword(parsed.data.currentPassword, current.passwordHash)) {
      return jsonError("INVALID_PASSWORD", "The current password is incorrect.", 401);
    }
    const username = parsed.data.newUsername ?? current.username;
    const passwordHash = parsed.data.newPassword ? await hashPassword(parsed.data.newPassword) : current.passwordHash;
    if (username === current.username && passwordHash === current.passwordHash) {
      return jsonError("NO_CHANGES", "Enter a different admin ID or password.", 400);
    }

    const updated = await prisma.$transaction(async (tx) => {
      const admin = await tx.adminUser.update({
        where: { id: actor.id },
        data: { username, passwordHash, sessionVersion: { increment: 1 }, failedLoginAttempts: 0, lockedUntil: null },
        select: { id: true, username: true, sessionVersion: true },
      });
      await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "UPDATE_CREDENTIALS", entityType: "AdminUser", entityId: actor.id, summary: "Admin credentials were updated." } });
      return admin;
    });
    await setAdminSession(updated);
    return jsonSuccess({ username: updated.username, message: "Credentials updated. Other admin sessions have been signed out." });
  });
}
