import { createCategoryRoute } from "@/features/products/components/category-route";
import { getCategoryMetadata } from "@/lib/seo/metadata";

export const generateMetadata = () => getCategoryMetadata("balls");
export default createCategoryRoute("balls");
