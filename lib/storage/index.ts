import { put as vercelBlobPut } from '@vercel/blob';
import { put as minioPut } from './minio';

export const put = (process.env.STORAGE_PROVIDER || 'vercel-blob') === 'minio' ? minioPut : vercelBlobPut;
