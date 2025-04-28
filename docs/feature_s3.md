# MinIO Storage Implementation

This directory contains the implementation for using MinIO as a storage backend for file uploads in the AI chatbot application. The implementation provides a drop-in replacement for Vercel Blob's `put` function, allowing for minimal changes to the existing codebase.

## Files

- `minio.ts`: Contains the MinIO S3 client implementation and the `put` function that mimics Vercel Blob's API.

## Configuration

To use the MinIO storage implementation, you need to set the following environment variables in your `.env.local` file:

```
# MinIO configuration (S3 compatible storage)
MINIO_REGION=us-east-1                       # The region for the MinIO server
MINIO_ENDPOINT=http://your-minio-server:9000 # The endpoint URL for the MinIO server
MINIO_ACCESS_KEY=your-access-key             # The access key for authentication
MINIO_SECRET_KEY=your-secret-key             # The secret key for authentication
MINIO_BUCKET_NAME=chat-attachments           # The name of the bucket to store files
MINIO_PUBLIC_ENDPOINT=http://your-minio-public-url # The public endpoint URL for accessing files
```

## MinIO Server Setup

1. Install and run MinIO server following the [official documentation](https://min.io/docs/minio/container/index.html).

2. Create a bucket for storing chat attachments:
   ```
   mc mb minio/chat-attachments
   ```

3. Set the bucket policy to allow public read access (if needed):
   ```
   mc anonymous set download minio/chat-attachments
   ```

4. Configure CORS to allow requests from your application:
   ```
   mc admin config set minio cors='{"allow_origins": ["*"], "allow_methods": ["GET", "PUT", "POST"], "allow_headers": ["*"], "expose_headers": ["ETag"], "max_age_seconds": 3600}'
   mc admin service restart minio
   ```

## Usage

The implementation provides a `put` function with the same signature as Vercel Blob's `put` function:

```typescript
import { put } from '@/lib/storage/minio';

// Upload a file
const data = await put(`${filename}`, fileBuffer, {
  access: 'public',
});

// The returned data has the same structure as Vercel Blob's put function
const { url, pathname, contentType, size } = data;
```

## Switching Between Vercel Blob and MinIO

The implementation includes a storage provider factory that makes it easy to switch between Vercel Blob and MinIO without modifying import statements in your code. The factory is implemented in `lib/storage/index.ts` and exports the appropriate `put` function based on the configured storage provider.

To switch between storage providers, simply set the `STORAGE_PROVIDER` environment variable in your `.env.local` file:

```
# Storage provider configuration (vercel-blob or minio)
STORAGE_PROVIDER=vercel-blob  # Use Vercel Blob
# or
STORAGE_PROVIDER=minio        # Use MinIO
```

Then, in your code, import the `put` function from the storage provider factory:

```typescript
import { put } from '@/lib/storage';

// The appropriate implementation will be used based on the STORAGE_PROVIDER environment variable
const data = await put(`${filename}`, fileBuffer, {
  access: 'public',
});
```

This approach allows for easier switching between storage providers without modifying your code.
