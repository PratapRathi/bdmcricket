import "server-only";

import { prisma } from "@/lib/prisma";

export async function recordAdminAction(input: {
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  summary: string;
}) {
  await prisma.adminAuditLog.create({ data: input });
}
