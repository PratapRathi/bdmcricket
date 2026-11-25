import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { mediaAltTextSchema } from "@/features/admin/validation/schemas";
import { recordAdminAction } from "@/lib/admin-auth/audit";
import { getObjectStorageConfig, getS3Client } from "@/lib/object-storage";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/media/[id]">) {
  return withAdmin(request, async (admin) => {
    let body: unknown;
    try { body = await request.json(); } catch { return jsonError("INVALID_JSON", "A valid JSON body is required.", 400); }
    const parsed = mediaAltTextSchema.safeParse(body);
    if (!parsed.success) return jsonError("INVALID_ALT_TEXT", "Alt text must be 500 characters or fewer.", 400);
    const { id } = await params;
    const asset = await prisma.mediaAsset.update({ where: { id }, data: parsed.data, select: { id: true, key: true, altText: true } });
    await recordAdminAction({ actorId: admin.id, action: "UPDATE", entityType: "MediaAsset", entityId: asset.key, summary: `Updated alt text for ${asset.key}.` });
    return jsonSuccess(asset);
  });
}

export async function DELETE(request: Request, { params }: RouteContext<"/api/admin/media/[id]">) {
  return withAdmin(request, async (admin) => {
    const { id } = await params;
    const asset = await prisma.mediaAsset.findUnique({ where: { id }, select: { key: true } });
    if (!asset) return jsonError("NOT_FOUND", "The media item was not found.", 404);
    const [mainProducts, galleryImages, awards, companyProfile] = await Promise.all([
      prisma.product.count({ where: { mainImageKey: asset.key } }),
      prisma.productImage.count({ where: { assetKey: asset.key } }),
      prisma.award.count({ where: { imageKey: asset.key } }),
      prisma.companyProfile.count({ where: { OR: [{ logoKey: asset.key }, { storyImageKey: asset.key }, { videoThumbnailKey: asset.key }] } }),
    ]);
    if (mainProducts + galleryImages + awards + companyProfile > 0) return jsonError("MEDIA_IN_USE", "This image is used by site content. Remove those references before deleting it.", 409);

    const config = getObjectStorageConfig();
    await getS3Client().send(new DeleteObjectCommand({ Bucket: config.bucket, Key: asset.key }));
    await prisma.mediaAsset.delete({ where: { id } });
    await recordAdminAction({ actorId: admin.id, action: "DELETE", entityType: "MediaAsset", entityId: asset.key, summary: `Deleted unused image ${asset.key}.` });
    return jsonSuccess({ id });
  });
}
