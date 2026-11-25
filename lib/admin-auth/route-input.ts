import { z } from "zod";
import { jsonError } from "@/lib/api/responses";

export async function readJson<T>(request: Request, schema: z.ZodType<T>, errorCode: string, label: string) {
  let body: unknown;
  try { body = await request.json(); } catch { return { response: jsonError("INVALID_JSON", "A valid JSON body is required.", 400), data: null }; }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return { response: jsonError(errorCode, parsed.error.issues[0]?.message ?? `Check the ${label} fields.`, 400), data: null };
  return { response: null, data: parsed.data };
}

export function parseEntityId(value: string) {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}
