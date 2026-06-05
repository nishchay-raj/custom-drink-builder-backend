import { z } from "zod";

export const updateAddonSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().max(500).optional(),
    price: z.number().int().positive().optional(),
    is_available: z.boolean().optional(),
}).strict().refine(
    (data) => Object.values(data).some(v => v !== undefined),
    {message: "At least one field must be provided."}
)

export type updateAddonInput = z.infer<typeof updateAddonSchema>;