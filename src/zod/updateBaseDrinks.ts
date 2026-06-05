import { z } from "zod";

export const updateBaseDrinkSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().max(500).optional(),
    price: z.number().int().positive().optional(),
    is_available: z.boolean().optional(),

    flavorIds: z.array(z.string().uuid()).optional(),
}).strict().refine(
    (data) => Object.values(data).some(v => v !== undefined),
    { message: "At least one field must be provided." }
)

export type updateBaseDrinkInput = z.infer<typeof updateBaseDrinkSchema>