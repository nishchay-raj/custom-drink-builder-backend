import { z } from "zod";

export const createPaymentSchema = z.object({
    order_id: z.string().uuid(),
});
export type createPaymentInput = z.infer<typeof createPaymentSchema>;

export const verifyPaymentSchema = z.object({
    order_id: z.string().uuid(),
    razorpay_order_id: z.string(),
    razorpay_payment_id: z.string(),
    razorpay_signature: z.string()
});
export type verifyPaymentInput = z.infer<typeof verifyPaymentSchema>;