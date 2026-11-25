import { categoryRouteSlugs } from "@/lib/config/site-routes";

/** Keep the six existing public category URLs; new admin-created categories use an explicit nested route. */
export function getCategoryHref(slug: string) {
  return categoryRouteSlugs.includes(slug as (typeof categoryRouteSlugs)[number])
    ? `/${slug}`
    : `/products/categories/${encodeURIComponent(slug)}`;
}
