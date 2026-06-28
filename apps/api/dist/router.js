"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const uuid_1 = require("uuid");
const shared_1 = require("@runbox/shared");
const queue_1 = require("./queue");
const redis_1 = require("./redis");
const t = server_1.initTRPC.create();
exports.appRouter = t.router({
    submit: t.procedure
        .input(shared_1.SubmissionSchema)
        .mutation(async ({ input }) => {
        const jobId = (0, uuid_1.v4)();
        const createdAt = new Date().toISOString();
        // Store pending
        await (0, redis_1.setResult)(jobId, {
            jobId,
            language: input.language,
            status: 'pending',
            stdout: '',
            stderr: '',
            exitCode: -1,
            executionTimeMs: 0,
            createdAt,
        });
        // Enqueue
        await queue_1.executionQueue.add('execute', { jobId, submission: input, createdAt }, { jobId });
        // return jobId, status 'pending' as const
        return { jobId, status: 'pending' };
    }),
    result: t.procedure
        .input(zod_1.z.object({ jobId: zod_1.z.uuid() }))
        .query(async ({ input }) => {
        const result = await (0, redis_1.getResult)(input.jobId);
        if (!result) {
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: `No job ${input.jobId}` });
        }
        return shared_1.ExecutionResultSchema.parse(result);
    }),
    health: t.procedure.query(async () => {
        const [waiting, active, failed] = await Promise.all([
            queue_1.executionQueue.getWaitingCount(),
            queue_1.executionQueue.getActiveCount(),
            queue_1.executionQueue.getFailedCount(),
        ]);
        return { status: 'ok', queue: { waiting, active, failed } };
    })
});
