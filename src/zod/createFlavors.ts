import z from "zod";

export const createFlavorSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().int().positive(),
    is_available: z.boolean(),

    basedrinksIds: z.array(z.string().uuid()).optional(),
})

export type createFlavorsInput = z.infer<typeof createFlavorSchema>