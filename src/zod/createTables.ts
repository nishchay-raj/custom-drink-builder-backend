import z from "zod";

export const createTableSchema = z.object({
    table_number: z.int().positive(),
    is_occupied: z.boolean().default(false),
    is_available: z.boolean().default(true),
})
export type createTableInput = z.infer<typeof createTableSchema>;