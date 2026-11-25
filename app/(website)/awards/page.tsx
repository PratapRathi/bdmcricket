import { createEditorialRoute } from "@/features/company/components/editorial-route";
import { getEditorialMetadata } from "@/lib/seo/metadata";

export const generateMetadata = () => getEditorialMetadata("awards");
export default createEditorialRoute("awards");
