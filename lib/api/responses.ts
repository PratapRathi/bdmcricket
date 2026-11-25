export type ApiSuccess<T> = { data: T };
export type ApiErrorBody = { error: { code: string; message: string } };

export function jsonSuccess<T>(data: T, init?: ResponseInit) {
  return Response.json({ data } satisfies ApiSuccess<T>, init);
}

export function jsonError(code: string, message: string, status: number) {
  return Response.json({ error: { code, message } } satisfies ApiErrorBody, { status });
}
