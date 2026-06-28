import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { SubmissionSchema, ExecutionResultSchema } from "@runbox/shared";
import { executionQueue } from "./queue";
import { getResult, setResult } from "./redis";

const t = initTRPC.create();

export const appRouter = t.router({
    submit: t.procedure
        .input(SubmissionSchema)
        .mutation(async ({ input }) => {
            const jobId = uuidv4();
            const createdAt = new Date().toISOString();

            // Store pending
            await setResult(jobId, {
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
            await executionQueue.add('execute', { jobId, submission: input, createdAt }, { jobId });
            // return jobId, status 'pending' as const
            return { jobId, status: 'pending' as const };
        }),

    result: t.procedure
        .input(z.object({ jobId: z.uuid() }))
        .query(async ({ input }) => {
            const result = await getResult(input.jobId);
            if (!result) {
                throw new TRPCError({ code: 'NOT_FOUND', message: `No job ${input.jobId}` });
            }
            return ExecutionResultSchema.parse(result);
        }),

    health: t.procedure.query(async () => {
        const [waiting, active, failed] = await Promise.all([
            executionQueue.getWaitingCount(),
            executionQueue.getActiveCount(),
            executionQueue.getFailedCount(),
        ]);
        return { status: 'ok', queue: { waiting, active, failed } };
    })
})

export type AppRouter = typeof appRouter;