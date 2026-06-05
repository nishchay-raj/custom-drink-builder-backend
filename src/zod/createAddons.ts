import z from "zod";

export const createAddonSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().int().positive(),
    is_available: z.boolean().default(true),
})
export type createAddonsInput = z.infer<typeof createAddonSchema>;