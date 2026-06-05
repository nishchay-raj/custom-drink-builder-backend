import z from "zod";

export const changeOrderStatusSchema = z.object({
    status: z.enum([
        "PENDING",
        "READY",
    ]),
})

export type changeOrderStatusType = z.infer<typeof changeOrderStatusSchema>;