import { z } from 'zod';
export declare const Language: z.ZodEnum<{
    python: "python";
    javascript: "javascript";
    typescript: "typescript";
    cpp: "cpp";
    java: "java";
    rust: "rust";
}>;
export type Language = z.infer<typeof Language>;
export declare const SubmissionSchema: z.ZodObject<{
    language: z.ZodEnum<{
        python: "python";
        javascript: "javascript";
        typescript: "typescript";
        cpp: "cpp";
        java: "java";
        rust: "rust";
    }>;
    code: z.ZodString;
    stdin: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SubmissionSchema = z.infer<typeof SubmissionSchema>;
export declare const JobStatus: z.ZodEnum<{
    pending: "pending";
    running: "running";
    completed: "completed";
    failed: "failed";
    timeout: "timeout";
    compile_error: "compile_error";
    runtime_error: "runtime_error";
}>;
export type JobStatus = z.infer<typeof JobStatus>;
export declare const ExecutionResultSchema: z.ZodObject<{
    jobId: z.ZodUUID;
    language: z.ZodEnum<{
        python: "python";
        javascript: "javascript";
        typescript: "typescript";
        cpp: "cpp";
        java: "java";
        rust: "rust";
    }>;
    status: z.ZodEnum<{
        pending: "pending";
        running: "running";
        completed: "completed";
        failed: "failed";
        timeout: "timeout";
        compile_error: "compile_error";
        runtime_error: "runtime_error";
    }>;
    stdout: z.ZodString;
    stderr: z.ZodString;
    exitCode: z.ZodNumber;
    executionTimeMs: z.ZodNumber;
    createdAt: z.ZodISODateTime;
    startedAt: z.ZodOptional<z.ZodISODateTime>;
    completedAt: z.ZodOptional<z.ZodISODateTime>;
}, z.core.$strip>;
export type ExecutionResult = z.infer<typeof ExecutionResultSchema>;
export declare const JobDataSchema: z.ZodObject<{
    jobId: z.ZodUUID;
    submission: z.ZodObject<{
        language: z.ZodEnum<{
            python: "python";
            javascript: "javascript";
            typescript: "typescript";
            cpp: "cpp";
            java: "java";
            rust: "rust";
        }>;
        code: z.ZodString;
        stdin: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
export type JobData = z.infer<typeof JobDataSchema>;
