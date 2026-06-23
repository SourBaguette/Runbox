import { z } from 'zod';

export const Language = z.enum([
    'python', 'javascript', 'typescript', 'cpp', 'java', 'rust',
])

export type Language = z.infer<typeof Language>

export const SubmissionSchema = 0;
export const JobStatus = 0;
export const ExecutionResultSchema = 0;
export const JobDataSchema = 0;