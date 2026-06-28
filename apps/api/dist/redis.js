"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESULT_TTL = exports.redis = void 0;
exports.getResult = getResult;
exports.setResult = setResult;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = new ioredis_1.default({
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT ?? 6379),
    lazyConnect: true, // don't connect on construction - we call .connect() explicitly at startup
});
exports.redis.on('error', (err) => console.error('[redis] connection error', err));
exports.RESULT_TTL = 60 * 60 * 24; // 24H - results auto-expire
async function getResult(jobId) {
    const raw = await exports.redis.get(`result:${jobId}`);
    return raw ? JSON.parse(raw) : null;
}
async function setResult(jobId, value) {
    await exports.redis.set(`result:${jobId}`, JSON.stringify(value), 'EX', exports.RESULT_TTL);
}
