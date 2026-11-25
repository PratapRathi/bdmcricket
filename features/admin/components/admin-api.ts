import { apiRequest } from "@/lib/api/client";
import type { ApiSuccess } from "@/lib/api/responses";
import { ApiRequestError } from "@/lib/api/client";

export async function adminApi<T>(url: string, options?: Parameters<typeof apiRequest>[1]) {
  const result = await apiRequest<ApiSuccess<T>>(url, options);
  return result.data;
}

export async function downloadAdminFile(url: string, filename: string) {
  const response = await fetch(url, { headers: { Accept: "text/csv" }, credentials: "same-origin" });
  if (!response.ok) {
    const result = await response.json().catch(() => null) as { error?: { message?: string; code?: string } } | null;
    throw new ApiRequestError(result?.error?.message ?? "The file could not be exported.", response.status, result?.error?.code ?? "EXPORT_FAILED");
  }
  const objectUrl = URL.createObjectURL(await response.blob());
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}

export const adminKeys = {
  overview: ["admin", "overview"] as const,
  products: ["admin", "products"] as const,
  categories: ["admin", "categories"] as const,
  content: ["admin", "content"] as const,
  enquiries: ["admin", "enquiries"] as const,
  media: ["admin", "media"] as const,
};
