import { clearAdminSession } from "@/lib/admin-auth/session";
import { jsonSuccess, jsonError } from "@/lib/api/responses";
import { hasSameOrigin } from "@/lib/admin-auth/guard";

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return jsonError("INVALID_ORIGIN", "This request is not allowed.", 403);
  await clearAdminSession();
  return jsonSuccess({ signedOut: true }, { headers: { "Cache-Control": "no-store" } });
}
