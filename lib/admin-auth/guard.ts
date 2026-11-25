import "server-only";

import { unstable_rethrow } from "next/navigation";
import { jsonError } from "@/lib/api/responses";
import { getAdminSession, type AdminIdentity } from "@/lib/admin-auth/session";

export function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const expectedOrigin = process.env.APP_ORIGIN ?? new URL(request.url).origin;
  return origin === expectedOrigin;
}

export async function withAdmin(request: Request, action: (admin: AdminIdentity) => Promise<Response>) {
  let admin: AdminIdentity | null;
  try {
    admin = await getAdminSession();
  } catch (error) {
    unstable_rethrow(error);
    console.error("Admin session validation failed", error);
    return jsonError("AUTH_UNAVAILABLE", "Admin authentication is not configured.", 503);
  }
  if (!admin) return jsonError("UNAUTHENTICATED", "Sign in to use the admin portal.", 401);
  if (request.method !== "GET" && !hasSameOrigin(request)) return jsonError("INVALID_ORIGIN", "This request is not allowed.", 403);

  try {
    const response = await action(admin);
    response.headers.set("Cache-Control", "no-store, private");
    response.headers.set("X-Content-Type-Options", "nosniff");
    return response;
  } catch (error) {
    if (isPrismaError(error, "P2002")) return jsonError("CONFLICT", "A record with these unique values already exists.", 409);
    if (isPrismaError(error, "P2003")) return jsonError("RELATED_RECORDS", "This record is still in use.", 409);
    if (isPrismaError(error, "P2025")) return jsonError("NOT_FOUND", "The requested record was not found.", 404);
    console.error("Admin operation failed", error);
    return jsonError("ADMIN_OPERATION_FAILED", "The operation could not be completed.", 500);
  }
}

function isPrismaError(error: unknown, code: string): error is { code: string } {
  return Boolean(error && typeof error === "object" && "code" in error && error.code === code);
}
