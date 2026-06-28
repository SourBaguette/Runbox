"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executionQueue = void 0;
const bullmq_1 = require("bullmq");
exports.executionQueue = new bullmq_1.Queue('code-execution', {
    connection: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT ?? 6379),
    },
    defaultJobOptions: {
        attempts: 2,
        backoff: { type: 'fixed', delay: 2000 }, // wait 2 seconds between retries
        removeOnComplete: { age: 60 * 60 }, // auto delete successful job records after 1 hour
        removeOnFail: { age: 60 * 60 * 24 }, // keep failed job records 24h so it can be inspected
    },
});
