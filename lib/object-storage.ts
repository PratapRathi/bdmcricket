import "server-only";
import { S3Client } from "@aws-sdk/client-s3";
import { getObjectStorageConfig } from "@/lib/object-storage-config";

export { getObjectStorageConfig };

let client: S3Client | undefined;

export function getS3Client() {
  if (client) return client;
  const config = getObjectStorageConfig();
  client = new S3Client({
    endpoint: config.endpoint,
    region: config.region,
    forcePathStyle: true,
    credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
  });
  return client;
}
