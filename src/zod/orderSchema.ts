import z from "zod";

export const createOrderSchema = z.object({
    items: z.array(
        z.object({
            baseDrinkId: z.string().uuid().nullable().optional(),
            addonId: z.string().uuid().nullable().optional(),
            quantity: z.number().int().positive(),
            flavorIds: z.array(z.string().uuid()).optional(),
        }).refine(
            (item) => Boolean(item.baseDrinkId) !== Boolean(item.addonId),
            { message: "Each item must have exactly one of baseDrinkId or addonId" }
        )
    ),
    payment_method: z.enum(["ONLINE", "CASH"]),
    name: z.string().min(1),
    remarks: z.string().max(500).optional(),
    table_number: z.int().nullable().optional(),
});
export type createOnlineOrderType = z.infer<typeof createOrderSchema>;


export const updateOrderPayment = z.object({
    orderId: z.string().uuid(),
});
export type updatedOrderPaymentType = z.infer<typeof updateOrderPayment>;


export const getOrderItems = z.object({
    orderId: z.string().uuid(),
})
export type getorderItemsType = z.infer<typeof getOrderItems>;