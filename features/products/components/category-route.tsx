import { CategoryPage } from "@/features/products/components/category-page";
import type { CategoryRouteSlug } from "@/lib/config/site-routes";

export function createCategoryRoute(slug: CategoryRouteSlug) {
  return function CategoryRoute() {
    return <CategoryPage slug={slug} />;
  };
}
