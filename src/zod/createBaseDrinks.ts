import z from "zod";

export const createBaseDrinksSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().int().positive(),
    is_available: z.boolean().default(true),

    flavorIds: z.array(z.string().uuid()).optional(),
})
export type createBaseDrinksInput = z.infer<typeof createBaseDrinksSchema>;