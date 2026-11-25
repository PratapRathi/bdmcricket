import { prisma } from "@/lib/prisma";
import { hasSameOrigin } from "@/lib/admin-auth/guard";
import { setAdminSession } from "@/lib/admin-auth/session";
import { DUMMY_PASSWORD_HASH, verifyPassword } from "@/lib/admin-auth/password";
import { recordAdminAction } from "@/lib/admin-auth/audit";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { adminLoginSchema } from "@/features/admin/validation/schemas";

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return jsonError("INVALID_ORIGIN", "This request is not allowed.", 403);
  if (!process.env.ADMIN_SESSION_SECRET || Buffer.byteLength(process.env.ADMIN_SESSION_SECRET) < 32) {
    return jsonError("AUTH_UNAVAILABLE", "Admin authentication is not configured.", 503);
  }

  let input: unknown;
  try { input = await request.json(); } catch { return jsonError("INVALID_JSON", "A valid JSON body is required.", 400); }
  const parsed = adminLoginSchema.safeParse(input);
  if (!parsed.success) return jsonError("INVALID_CREDENTIALS", "Enter a valid admin ID and password.", 400);

  const admin = await prisma.adminUser.findUnique({ where: { username: parsed.data.username } });
  if (admin?.lockedUntil && admin.lockedUntil > new Date()) return jsonError("LOGIN_THROTTLED", "Too many failed attempts. Try again later.", 429);

  const passwordMatches = await verifyPassword(parsed.data.password, admin?.passwordHash ?? DUMMY_PASSWORD_HASH);
  if (!admin || !admin.isActive || !passwordMatches) {
    if (admin?.isActive) {
      const attempts = admin.failedLoginAttempts + 1;
      await prisma.adminUser.update({
        where: { id: admin.id },
        data: attempts >= 5
          ? { failedLoginAttempts: 0, lockedUntil: new Date(Date.now() + 15 * 60_000) }
          : { failedLoginAttempts: attempts },
      });
    }
    return jsonError("INVALID_CREDENTIALS", "The admin ID or password is incorrect.", 401);
  }

  if (admin.failedLoginAttempts || admin.lockedUntil) {
    await prisma.adminUser.update({ where: { id: admin.id }, data: { failedLoginAttempts: 0, lockedUntil: null } });
  }
  await setAdminSession(admin);
  await recordAdminAction({ actorId: admin.id, action: "LOGIN", entityType: "AdminUser", entityId: admin.id, summary: "Admin signed in." });
  return jsonSuccess({ username: admin.username }, { headers: { "Cache-Control": "no-store, private" } });
}
