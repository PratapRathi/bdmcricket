import { GetObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { getObjectStorageConfig, getS3Client } from "@/lib/object-storage";

export async function GET(_request: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const { key: keyParts } = await params;
  const key = keyParts.join("/");
  const asset = await prisma.mediaAsset.findUnique({ where: { key }, select: { key: true, contentType: true } });
  if (!asset) return new Response("Not found", { status: 404 });

  try {
    const { bucket } = getObjectStorageConfig();
    const object = await getS3Client().send(new GetObjectCommand({ Bucket: bucket, Key: asset.key }));
    if (!object.Body) return new Response("Not found", { status: 404 });
    const headers = new Headers({
      "Content-Type": asset.contentType,
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff",
    });
    if (object.ContentLength !== undefined) headers.set("Content-Length", String(object.ContentLength));
    if (object.ETag) headers.set("ETag", object.ETag);
    return new Response(object.Body.transformToWebStream(), { headers });
  } catch {
    return new Response("Asset storage is temporarily unavailable", { status: 503 });
  }
}
