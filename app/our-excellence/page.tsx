import { createEditorialRoute } from "@/features/company/components/editorial-route";
import { getEditorialMetadata } from "@/lib/seo/metadata";

export const generateMetadata = () => getEditorialMetadata("our-excellence");
export default createEditorialRoute("our-excellence");
