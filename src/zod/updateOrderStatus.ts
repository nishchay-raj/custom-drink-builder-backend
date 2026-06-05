import { z } from "zod";

export const updateOrderStatusSchema = z.object({
    status: z.enum(["PENDING", "READY", "COMPLETED"]),
}).strict()

export type updateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>