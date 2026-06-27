import { z } from 'zod';

export const Language = z.enum([
    'python', 'javascript', 'typescript', 'cpp', 'java', 'rust',
]);
export type Language = z.infer<typeof Language>;

export const SubmissionSchema = z.object({
    language: Language,
    code: z.string().min(1).max(50_000),
    stdin: z.string().max(10_000).optional(),
});
export type Submission = z.infer<typeof SubmissionSchema>;

export const JobStatus = z.enum([
    'pending',       // in queue, not yet picked up
    'running',       // worker is executing it
    'completed',     // exit code 0
    'failed',        // internal error (not the user's code)
    'timeout',       // exceeded the time limit
    'compile_error', // compilation failed (C++, Java, Rust, TS)
    'runtime_error', // exited non-zero
]);
export type JobStatus = z.infer<typeof JobStatus>;

export const ExecutionResultSchema = z.object({
    jobId: z.uuid(),
    language: Language,
    status: JobStatus,
    stdout: z.string(),
    stderr: z.string(),
    exitCode: z.number(),
    executionTimeMs: z.number(),
    createdAt: z.iso.datetime(),
    startedAt: z.iso.datetime().optional(),
    completedAt: z.iso.datetime().optional(),
});
export type ExecutionResult = z.infer<typeof ExecutionResultSchema>

export const JobDataSchema = z.object({
    jobId: z.uuid(),
    submission: SubmissionSchema,
    createdAt: z.iso.datetime(),
});
export type JobData = z.infer<typeof JobDataSchema>;