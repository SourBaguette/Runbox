import { ExecutionResult } from '@runbox/shared';
import Redis from 'ioredis';

export const redis = new Redis({
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT ?? 6379),
    lazyConnect: true, // don't connect on construction - we call .connect() explicitly at startup
});

redis.on('error', (err) => console.error('[redis] connection error', err));

export const RESULT_TTL = 60 * 60 * 24 // 24H - results auto-expire

export async function getResult(jobId: string) {
    const raw = await redis.get(`result:${jobId}`);
    return raw ? JSON.parse(raw) : null;
}

export async function setResult(jobId: string, value: ExecutionResult) {
    await redis.set(`result:${jobId}`, JSON.stringify(value), 'EX', RESULT_TTL);
}