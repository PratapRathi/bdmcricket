import { createCategoryRoute } from "@/features/products/components/category-route";
import { getCategoryMetadata } from "@/lib/seo/metadata";

export const generateMetadata = () => getCategoryMetadata("kit-bag");
export default createCategoryRoute("kit-bag");
