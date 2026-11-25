import "dotenv/config";
import { createReadStream } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { PrismaClient } from "../generated/prisma/client";
import { seedSiteData } from "../prisma/seed-data";
import { getObjectStorageConfig } from "../lib/object-storage-config";

const mediaExtensions: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
};

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : entry.isFile() && mediaExtensions[path.extname(entry.name).toLowerCase()] ? [fullPath] : [];
  }));
  return nested.flat();
}

async function uploadAssets(client: S3Client, bucket: string, assetPaths: string[], sourceDirectory: string) {
  let completed = 0;
  const concurrency = 8;
  for (let start = 0; start < assetPaths.length; start += concurrency) {
    const group = assetPaths.slice(start, start + concurrency);
    await Promise.all(group.map(async (filePath) => {
      const relativePath = path.relative(sourceDirectory, filePath).split(path.sep).join("/");
      const key = `site/${relativePath}`;
      const file = await stat(filePath);
      await client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: createReadStream(filePath),
        ContentLength: file.size,
        ContentType: mediaExtensions[path.extname(filePath).toLowerCase()],
        CacheControl: "public, max-age=3600, s-maxage=86400",
      }));
      completed += 1;
    }));
    console.log(`Uploaded ${completed}/${assetPaths.length} media files`);
  }
}

async function main() {
  const config = getObjectStorageConfig();
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is required to import the site data.");

  const database = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  const storage = new S3Client({
    endpoint: config.endpoint,
    region: config.region,
    forcePathStyle: true,
    credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
  });

  try {
    await database.$queryRaw`SELECT 1`;
    // The deployed application has no local media. This one-time importer reads
    // the retained original site clone (or MEDIA_IMPORT_DIRECTORY) instead.
    const sourceDirectory = process.env.MEDIA_IMPORT_DIRECTORY
      ? path.resolve(process.env.MEDIA_IMPORT_DIRECTORY)
      : path.resolve(process.cwd(), "../bdmcricket");
    const assetDirectory = path.join(sourceDirectory, "assets");
    const assetPaths = await walk(assetDirectory);
    console.log(`Found ${assetPaths.length} image assets to migrate.`);
    await uploadAssets(storage, config.bucket, assetPaths, sourceDirectory);

    const assetRecords = await Promise.all(assetPaths.map(async (filePath) => {
      const relativePath = path.relative(sourceDirectory, filePath).split(path.sep).join("/");
      const file = await stat(filePath);
      return {
        key: `site/${relativePath}`,
        sourcePath: `/${relativePath}`,
        contentType: mediaExtensions[path.extname(filePath).toLowerCase()],
        byteSize: BigInt(file.size),
        uploadedAt: new Date(),
      };
    }));
    for (let start = 0; start < assetRecords.length; start += 500) {
      await database.mediaAsset.createMany({ data: assetRecords.slice(start, start + 500), skipDuplicates: true });
    }

    await seedSiteData(database);
    console.log("Site content imported into PostgreSQL and media objects uploaded to S3-compatible storage.");
  } finally {
    storage.destroy();
    await database.$disconnect();
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unexpected import error";
  console.error(`Site data migration failed: ${message}`);
  process.exitCode = 1;
});
