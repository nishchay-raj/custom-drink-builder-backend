// controllers/dashboardController.ts
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        // ✅ Revenue = sum of ALL orders currently marked as paid/ready
        // Since your DB already only shows paid orders in UI,
        // we sum directly from orders table
        const revenueAgg = await prisma.orders.aggregate({
            _sum: {
                total_amount: true,
            },
            where: {
                payment_successful: true, // 👈 THIS matches your DB
            },
        });

        const totalRevenue = revenueAgg._sum.total_amount ?? 0;

        // ✅ Orders count
        const ordersCount = await prisma.orders.count({
            where: {
                payment_successful: true,
            },
        });

        // ✅ Customers count (distinct phone or email)
        // const customersCount = (
        //     await prisma.orders.findMany({
        //         where: { payment_successful: true },
        //         distinct: ["number"],
        //         select: { number: true },
        //     })
        // ).length;

        // ✅ Average order value
        // const avgOrderValue =
        //     ordersCount > 0
        //         ? Math.round(totalRevenue / ordersCount)
        //         : 0;

        res.json({
            totalRevenue,     // ₹ value already (NOT paise)
            ordersCount,
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        res.status(500).json({
            message: "Failed to fetch dashboard stats",
        });
    }
};
