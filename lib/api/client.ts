import type { ApiErrorBody } from "@/lib/api/responses";

export class ApiRequestError extends Error {
  constructor(message: string, public readonly status: number, public readonly code: string) {
    super(message);
    this.name = "ApiRequestError";
  }
}

export async function apiGet<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const errorBody = body as ApiErrorBody | null;
    throw new ApiRequestError(
      errorBody?.error?.message ?? "The request could not be completed.",
      response.status,
      errorBody?.error?.code ?? "REQUEST_FAILED",
    );
  }
  return body as T;
}
