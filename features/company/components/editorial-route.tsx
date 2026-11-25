import { EditorialPage } from "@/features/company/components/editorial-page";
import type { EditorialRouteSlug } from "@/lib/config/site-routes";

export function createEditorialRoute(slug: EditorialRouteSlug) {
  return function EditorialRoute() {
    return <EditorialPage slug={slug} />;
  };
}
