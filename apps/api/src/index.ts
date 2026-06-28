import express from "express";
import cors from 'cors';
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./router";
import { redis } from './redis';

const app = express();
app.use(cors());
app.use(express.json())

// Mount the whole tRPC router under /trpc
// Every procedure becomes an endpoint
app.use('/trpc', createExpressMiddleware({ router: appRouter }));

const PORT = process.env.PORT ?? 3000;

async function start() {
    // open the redis connection, because we use lazy connect
    await redis.connect();
    console.log('[api] connected to Redis');
    app.listen(PORT, () => console.log(`[api] listening on: ${PORT}`));
}

start().catch(console.error);