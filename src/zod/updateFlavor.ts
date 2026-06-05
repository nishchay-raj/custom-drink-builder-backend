import { z } from "zod";

export const updateFlavorSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().max(500).optional(),
    price: z.number().int().positive().optional(),
    is_available: z.boolean().optional(),

    basedrinksIds: z.array(z.string().uuid()).optional(),
}).strict().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
})

export type updateFlavorInput = z.infer<typeof updateFlavorSchema>