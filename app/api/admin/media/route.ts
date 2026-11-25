import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonError, jsonSuccess } from "@/lib/api/responses";
import { mediaAltTextSchema } from "@/features/admin/validation/schemas";
import { getObjectStorageConfig, getS3Client } from "@/lib/object-storage";
import { mediaUrl } from "@/lib/media-url";
import { prisma } from "@/lib/prisma";

const allowedTypes = new Map([["image/jpeg", ".jpg"], ["image/png", ".png"], ["image/webp", ".webp"], ["image/gif", ".gif"]]);
const maxBytes = 8 * 1024 * 1024;

export async function GET(request: Request) {
  return withAdmin(request, async () => {
    const [assets, profile] = await Promise.all([
      prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" }, take: 500, include: { _count: { select: { mainForProducts: true, productImages: true, awards: true } } } }),
      prisma.companyProfile.findUnique({ where: { id: "main" }, select: { logoKey: true, storyImageKey: true, videoThumbnailKey: true } }),
    ]);
    const profileKeys = new Set([profile?.logoKey, profile?.storyImageKey, profile?.videoThumbnailKey].filter((key): key is string => Boolean(key)));
    return jsonSuccess(assets.map(({ byteSize, ...asset }) => ({ ...asset, byteSize: byteSize.toString(), url: mediaUrl(asset.key), profileReferences: profileKeys.has(asset.key) ? 1 : 0 })));
  });
}

export async function POST(request: Request) {
  return withAdmin(request, async (admin) => {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > maxBytes + 64 * 1024) return jsonError("FILE_TOO_LARGE", "Images must be smaller than 8 MB.", 413);
    let form: FormData;
    try { form = await request.formData(); } catch { return jsonError("INVALID_UPLOAD", "A file upload is required.", 400); }
    const file = form.get("file");
    const altText = form.get("altText");
    if (!(file instanceof File)) return jsonError("INVALID_UPLOAD", "Choose an image file.", 400);
    const extension = allowedTypes.get(file.type);
    if (!extension || extname(file.name).toLowerCase() !== extension && !(extension === ".jpg" && extname(file.name).toLowerCase() === ".jpeg")) {
      return jsonError("UNSUPPORTED_FILE", "Upload a JPEG, PNG, WebP, or GIF image.", 415);
    }
    if (!file.size || file.size > maxBytes) return jsonError("FILE_TOO_LARGE", "Images must be smaller than 8 MB.", 413);
    const parsedAlt = mediaAltTextSchema.safeParse({ altText: typeof altText === "string" ? altText : "" });
    if (!parsedAlt.success) return jsonError("INVALID_ALT_TEXT", "Alt text must be 500 characters or fewer.", 400);

    const now = new Date();
    const key = `admin/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${randomUUID()}${extension}`;
    const config = getObjectStorageConfig();
    await getS3Client().send(new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentLength: file.size,
      ContentType: file.type,
      CacheControl: "public, max-age=3600, s-maxage=86400",
    }));
    let asset;
    try {
      asset = await prisma.$transaction(async (tx) => {
        const created = await tx.mediaAsset.create({ data: { key, contentType: file.type, byteSize: BigInt(file.size), altText: parsedAlt.data.altText, uploadedAt: now } });
        await tx.adminAuditLog.create({ data: { actorId: admin.id, action: "UPLOAD", entityType: "MediaAsset", entityId: created.key, summary: `Uploaded image ${created.key}.` } });
        return created;
      });
    } catch (error) {
      await getS3Client().send(new DeleteObjectCommand({ Bucket: config.bucket, Key: key })).catch((cleanupError: unknown) => console.error("Unable to remove unregistered uploaded image", cleanupError));
      throw error;
    }
    return jsonSuccess({ id: asset.id, key: asset.key, url: mediaUrl(asset.key), contentType: asset.contentType, byteSize: file.size, altText: asset.altText }, { status: 201 });
  });
}
