import { S3Client } from '@aws-sdk/client-s3';

export const REGION = process.env.REGION;
export const AWS_KEY_ID = process.env.AWS_KEY_ID;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
export const ENDPOINT = process.env.ENDPOINT;
export const BUCKET = process.env.BUCKET_NAME;

if (!REGION) {
  throw new Error('REGION environment variable is not set.');
}

if (!AWS_KEY_ID) {
  throw new Error('AWS_KEY_ID environment variable is not set.');
}

if (!AWS_SECRET_KEY) {
  throw new Error('AWS_SECRET_KEY environment variable is not set.');
}

if (!ENDPOINT) {
  throw new Error('ENDPOINT environment variable is not set.');
}

export const aws = new S3Client({
  credentials: { accessKeyId: AWS_KEY_ID, secretAccessKey: AWS_SECRET_KEY },
  region: REGION,
  endpoint: ENDPOINT,
});
