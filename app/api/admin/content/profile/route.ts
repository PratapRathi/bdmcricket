import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { readJson } from "@/lib/admin-auth/route-input";
import { profileAdminSchema } from "@/features/admin/validation/schemas";
import { updateCompanyProfile } from "@/features/admin/services/admin-content-service";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  return withAdmin(request, async (admin) => {
    const parsed = await readJson(request, profileAdminSchema, "INVALID_PROFILE", "company profile");
    if (parsed.response) return parsed.response;
    const mediaKeys = [...new Set([parsed.data.logoKey, parsed.data.storyImageKey, parsed.data.videoThumbnailKey])];
    const mediaCount = await prisma.mediaAsset.count({ where: { key: { in: mediaKeys } } });
    if (mediaCount !== mediaKeys.length) return jsonError("UNKNOWN_MEDIA", "Choose uploaded images from the media library.", 400);
    return jsonSuccess(await updateCompanyProfile(admin, parsed.data));
  });
}
