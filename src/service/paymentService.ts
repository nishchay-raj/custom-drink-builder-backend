import { env } from "../config/env"
import Razorpay from "razorpay";
import crypto from "crypto";
import { prisma } from "../lib/prisma"
import { createPaymentInput, verifyPaymentInput } from "../zod/createPayment";

const razorpay = new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET
});

export const createPaymentOrder = async (data: createPaymentInput) => {
    const order = await prisma.orders.findUnique({
        where: {id: data.order_id}
    });

    if(!order){
        throw new Error("Order not found!")
    }

    if(order.payment_successful){
        throw new Error("Already paid!")
    }

    const paymentOrder = await razorpay.orders.create({
        amount: order.total_amount * 100,
        currency: "INR",
        receipt: order.id,
    });

    return paymentOrder;
}

export const verifyPayment = async (data: verifyPaymentInput) => {
    const {
        order_id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = data;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(body)
        .digest("hex");

    if(expectedSignature !== razorpay_signature){
        throw new Error("Payment verification Failed");
    }

    const order = await prisma.orders.findUnique({
        where: {id: order_id}
    });

    if(!order){
        throw new Error("Order not found!")
    }

    await prisma.payments.create({
        data: {
            order_id: order_id,
            amount: order.total_amount,
            razorpay_order_id,
            razorpay_payment_id,
            method: "ONLINE",
            status: "SUCCESS",
        }
    });

    return await prisma.orders.update({
        where: {id: order_id},
        data: {
            payment_successful: true,
            status: "PAID"
        }
    })
}

export const getAllPayments = async () => {
    const payments = await prisma.payments.findMany({
        orderBy:{
            created_at:"desc"
        },
        include: {
            order: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    });
    return payments;
}