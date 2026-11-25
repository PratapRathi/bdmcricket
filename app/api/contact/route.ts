import { createHmac } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { hasSameOrigin } from "@/lib/admin-auth/guard";
import { contactSubmissionSchema } from "@/features/admin/validation/schemas";
import { jsonError, jsonSuccess } from "@/lib/api/responses";

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return jsonError("INVALID_ORIGIN", "This request is not allowed.", 403);
  let body: unknown;
  try { body = await request.json(); } catch { return jsonError("INVALID_JSON", "A valid JSON body is required.", 400); }
  const parsed = contactSubmissionSchema.safeParse(body);
  if (!parsed.success) return jsonError("INVALID_ENQUIRY", parsed.error.issues[0]?.message ?? "Check the enquiry fields.", 400);

  if (parsed.data.website) return jsonSuccess({ received: true }, { status: 201, headers: { "Cache-Control": "no-store" } });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const rateLimitSecret = process.env.ADMIN_SESSION_SECRET || process.env.DATABASE_URL;
  if (!rateLimitSecret) return jsonError("CONTACT_UNAVAILABLE", "The enquiry form is temporarily unavailable.", 503);
  const ipHash = createHmac("sha256", rateLimitSecret).update(ip).digest("hex");
  const recentCount = await prisma.contactSubmission.count({ where: { ipHash, createdAt: { gte: new Date(Date.now() - 10 * 60_000) } } });
  if (recentCount >= 3) return jsonError("RATE_LIMITED", "Please wait before sending another enquiry.", 429);

  const submission = {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: parsed.data.subject,
    message: parsed.data.message,
  };
  const created = await prisma.contactSubmission.create({ data: { ...submission, ipHash }, select: { id: true } });
  return jsonSuccess({ received: true, reference: created.id }, { status: 201, headers: { "Cache-Control": "no-store" } });
}
