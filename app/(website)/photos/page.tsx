import { createEditorialRoute } from "@/features/company/components/editorial-route";
import { getEditorialMetadata } from "@/lib/seo/metadata";

export const generateMetadata = () => getEditorialMetadata("photos");
export default createEditorialRoute("photos");
