import { createCategoryRoute } from "@/features/products/components/category-route";
import { getCategoryMetadata } from "@/lib/seo/metadata";

export const generateMetadata = () => getCategoryMetadata("protective-gear");
export default createCategoryRoute("protective-gear");
