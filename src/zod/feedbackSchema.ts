import z from "zod";

export const feedbackSchema = z.object({
    name: z.string().min(1),
    number: z.int().positive(),
    feedback: z.string().min(1)
});

export type feedBackType = z.infer<typeof feedbackSchema>;