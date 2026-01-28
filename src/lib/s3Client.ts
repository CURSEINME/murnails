import { S3Client } from '@aws-sdk/client-s3';

const REGION = process.env.REGION;
const AWS_KEY_ID = process.env.AWS_KEY_ID;
const S3_SECRET_KEY = process.env.S3_SECRET_KEY;
export const ENDPOINT = process.env.ENDPOINT;
export const BUCKET = process.env.BUCKET_NAME;

if (!REGION) {
  throw new Error('REGION environment variable is not set.');
}

if (!AWS_KEY_ID) {
  throw new Error('AWS_KEY_ID environment variable is not set.');
}

if (!S3_SECRET_KEY) {
  throw new Error('S3_SECRET_KEY environment variable is not set.');
}

if (!ENDPOINT) {
  throw new Error('ENDPOINT environment variable is not set.');
}

export const aws = new S3Client({
  credentials: { accessKeyId: AWS_KEY_ID, secretAccessKey: S3_SECRET_KEY },
  region: REGION,
  endpoint: ENDPOINT,
});
