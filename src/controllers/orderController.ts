import { Request, Response } from "express";
import * as orderService from "../service/orderService";
import { updateOrderStatusSchema } from "../zod/updateOrderStatus";
// import * as phonepeService from "../service/phonepeService";

export const createOnlineOrderController = async (req: Request, res: Response) => {
    try {

        const order = await orderService.createOnlineOrder(req.body)

        // const payment = await phonepeService.initiatePayment(order.id)

        return res.status(200).json({
            message: "Order Created",

            orderId: order.id,

            // razorpayOrderId: payment.orderId,
            // amount: payment.amount,
            // currency: payment.currency,

            key: process.env.RAZORPAY_KEY_ID
        })

    } catch (err) {

        return res.status(400).json({
            error: err,
            message: "Could not create the order",
        })

    }
}


export const getAllOrdersController = async (req: Request, res: Response) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(400).json({
            error: err,
            message: "could not get all the orders",
        });
    }
}

export const getOrderItemsController = async (req: Request, res: Response) => {
    try {
        const { orderid } = req.params;
        const items = await orderService.getOrderItems(orderid as string);
        return res.status(200).json(items);
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "Failed to get order details"
        })
    }
}

// export const createOfflineOrderController = async (req: Request, res: Response) => {
//     try {
//         const order = await orderService.createOfflineOrder(req.body);
//         return res.status(200).json(order);
//     } catch (err) {
//         return res.status(400).json({
//             error: err,
//             message: "could not create the offline order",
//         })
//     }
// }

export const markOrderPaidController = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ message: "Order Id is required" });
        const paidOrder = await orderService.markOrderPaid(req.body);
        return res.status(200).json(paidOrder);
    } catch (err) {
        return res.status(400).json({
            error: err,
            message: "could not mark the order as paid",
        });
    }
}

export const markOrderVoidController = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ message: "Order ID is required" });
        const voidOrder = await orderService.markOrderVoid(req.body);
        return res.status(200).json(voidOrder);
    } catch (err) {
        return res.status(400).json({
            error: err,
            message: "could not mark the order as void",
        });
    }
}

// export const getOrderByIdController = async (req: Request, res: Response) => {
//     try {
//         const orderId = req.params.id;
//         if (!orderId) {
//             return res.status(400).json({
//                 message: "No order id specified",
//             });
//         }
//         const order = await orderService.getOrderById(orderId as string);
//         return res.status(200).json(order);
//     } catch (err) {
//         return res.status(400).json({
//             error: err,
//             message: "Could not get the order by order id",
//         });
//     }
// }

export const changeOrderStatusController = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const body = updateOrderStatusSchema.parse(req.body);
        const updatedOrder = await orderService.updateOrderStatus(orderId as string, body);
        return res.status(200).json(updatedOrder);
    } catch (err) {
        return res.status(400).json({
            error: err,
            message: "order status could not be changed",
        });
    }
}

export const getRecentFiveOrderController = async (req: Request, res: Response) => {
    try {
        const orders = await orderService.getRecentOrders();
        return res.status(200).json(orders);
    } catch {
        return res.status(400).json({
            message: "Failed to fetch orders",
        });
    }
}