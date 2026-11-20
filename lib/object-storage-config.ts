export function getObjectStorageConfig() {
  const bucket = process.env.S3_BUCKET_NAME ?? process.env.AWS_S3_BUCKET ?? process.env.AWS_BUCKET_NAME;
  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  const missing = [
    ["S3_BUCKET_NAME", bucket],
    ["AWS_ENDPOINT_URL_S3", endpoint],
    ["AWS_REGION", region],
    ["AWS_ACCESS_KEY_ID", accessKeyId],
    ["AWS_SECRET_ACCESS_KEY", secretAccessKey],
  ].filter(([, value]) => !value).map(([name]) => name);
  if (missing.length) throw new Error(`Object storage configuration is incomplete. Set: ${missing.join(", ")}.`);

  return { bucket: bucket!, endpoint: endpoint!, region: region!, accessKeyId: accessKeyId!, secretAccessKey: secretAccessKey! };
}
