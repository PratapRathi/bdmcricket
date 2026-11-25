import "dotenv/config";
import { HeadObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { getObjectStorageConfig } from "../lib/object-storage-config";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is required to verify media storage.");

  const config = getObjectStorageConfig();
  const database = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  const storage = new S3Client({
    endpoint: config.endpoint,
    region: config.region,
    forcePathStyle: true,
    credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
  });

  try {
    const assets = await database.mediaAsset.findMany({ select: { key: true }, orderBy: { key: "asc" } });
    const missing: string[] = [];
    const concurrency = 12;

    for (let start = 0; start < assets.length; start += concurrency) {
      const batch = assets.slice(start, start + concurrency);
      await Promise.all(batch.map(async ({ key }) => {
        try {
          await storage.send(new HeadObjectCommand({ Bucket: config.bucket, Key: key }));
        } catch {
          missing.push(key);
        }
      }));
      console.log(`Verified ${Math.min(start + concurrency, assets.length)}/${assets.length} registered media objects`);
    }

    if (missing.length) {
      console.error(`Missing ${missing.length} registered object(s):\n${missing.join("\n")}`);
      process.exitCode = 1;
      return;
    }

    console.log(`All ${assets.length} registered media objects are present in ${config.bucket}.`);
  } finally {
    storage.destroy();
    await database.$disconnect();
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unexpected media verification failure";
  console.error(`Media verification failed: ${message}`);
  process.exitCode = 1;
});
