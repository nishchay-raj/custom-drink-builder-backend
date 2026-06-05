import { Request, Response } from "express";
// import * as phonepeservice from "../service/phonepeService";
import * as paymentService from "../service/paymentService";
import { createPaymentSchema } from "../zod/createPayment";
import { verifyPaymentSchema } from "../zod/createPayment";

// import { processPhonepeService } from "../service/processPhonepeService";

export const initiatePaymentController = async (req: Request, res: Response) => {
    try {
        const parsed = createPaymentSchema.parse(req.body);
        const result = await paymentService.createPaymentOrder(parsed);
        return res.status(200).json(result);
    } catch (err: any) {
        return res.status(400).json({
            message: err.message || "could not initiate payment",
        });
    }
};

export const getAllPaymentsController = async (req: Request, res: Response) => {
    try {
        const response = await paymentService.getAllPayments();
        return res.status(200).json(response);
    } catch (err: any) {
        return res.status(400).json({
            message: err.message || "Could not get all payments",
        });
    }
};

export const verifyPaymentController = async (req: Request, res: Response) => {
    try {
        const parsed = verifyPaymentSchema.parse(req.body);

        const result = await paymentService.verifyPayment(parsed);

        return res.status(200).json(result);
    } catch (err: any) {
        return res.status(400).json({
            message: err.message || "Payment verification failed",
        });
    }
};

// export const getOrderStatusController = async (req: Request, res: Response) => {
//     try {
//         const { merchantOrderId } = req.query;
//         if (!merchantOrderId) {
//             return res.status(400).json({
//                 message: "there is no merchant order id",
//             });
//         }
//         const response = await phonepeservice.getPhonePeOrderStatus(merchantOrderId as string);
//         const status = response.state as PhonePeState;
//         const orderId = response.orderId;
//         if (status === 'COMPLETED' || status === 'FAILED') {
//             await processPhonepeService(merchantOrderId as string, status);
//         }
//         return res.status(200).redirect(`https://d2scafe.shop/payment/${status}?orderId=${orderId}`);

//     } catch (err) {
//         return res.status(400).json({
//             error: err,
//             message: "error occurred while getting order status",
//         }).redirect(`https://d2scafe.shop/payment/failed`);
//     }
// }