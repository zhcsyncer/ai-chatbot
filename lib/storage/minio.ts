import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.MINIO_REGION || 'us-east-1',
  endpoint: process.env.MINIO_ENDPOINT,
  forcePathStyle: true, // Required for MinIO
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || '',
    secretAccessKey: process.env.MINIO_SECRET_KEY || '',
  },
});

// Bucket name from environment variable
const bucketName = process.env.MINIO_BUCKET_NAME || 'chat-attachments';
const publicEndpoint = process.env.MINIO_PUBLIC_ENDPOINT || '';

/**
 * Upload a file to MinIO with the same signature as Vercel Blob's put function
 * @param pathname - The path/name for the file
 * @param body - The file content as Buffer or ArrayBuffer
 * @param options - Options object (access: 'public' | 'private')
 * @returns Promise with upload result
 */
export async function put(
  pathname: string,
  body: Buffer | ArrayBuffer,
  options?: { access?: 'public' | 'private' }
) {
  // Convert ArrayBuffer to Buffer if needed
  const buffer = body instanceof ArrayBuffer ? Buffer.from(body) : body;

  // Generate a unique key to avoid name collisions
  const key = `${Date.now()}-${pathname}`;

  // Determine content type based on file extension
  const contentType = getContentType(pathname);

  // Create command to upload object
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    // Set ACL based on access option (default to public)
    ACL: options?.access === 'private' ? 'private' : 'public-read',
  });

  // Upload to MinIO
  await s3Client.send(command);

  // Return object with same structure as Vercel Blob's put function
  return {
    url: `${publicEndpoint}/${bucketName}/${key}`,
    pathname: key,
    contentType,
    size: buffer.length,
  };
}

/**
 * Helper function to determine content type based on file extension
 */
function getContentType(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase();

  const contentTypeMap: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'txt': 'text/plain',
    'json': 'application/json',
    'mp4': 'video/mp4',
    'mp3': 'audio/mpeg',
  };

  return extension && contentTypeMap[extension]
    ? contentTypeMap[extension]
    : 'application/octet-stream';
}
