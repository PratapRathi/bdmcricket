import type { ApiErrorBody } from "@/lib/api/responses";

export class ApiRequestError extends Error {
  constructor(message: string, public readonly status: number, public readonly code: string) {
    super(message);
    this.name = "ApiRequestError";
  }
}

type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  json?: unknown;
  body?: BodyInit;
  signal?: AbortSignal;
};

export async function apiRequest<T>(url: string, options: ApiRequestOptions = {}): Promise<T> {
  const headers = new Headers({ Accept: "application/json" });
  let requestBody = options.body;
  if (options.json !== undefined) {
    headers.set("Content-Type", "application/json");
    requestBody = JSON.stringify(options.json);
  }
  const response = await fetch(url, { method: options.method ?? "GET", headers, body: requestBody, signal: options.signal });
  const responseBody: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const errorBody = responseBody as ApiErrorBody | null;
    throw new ApiRequestError(
      errorBody?.error?.message ?? "The request could not be completed.",
      response.status,
      errorBody?.error?.code ?? "REQUEST_FAILED",
    );
  }
  return responseBody as T;
}

export async function apiGet<T>(url: string): Promise<T> {
  return apiRequest<T>(url);
}
