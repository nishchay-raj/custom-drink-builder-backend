import { prisma } from "../lib/prisma";
import { createOnlineOrderType } from "../zod/orderSchema";
import { updateOrderStatusInput } from "../zod/updateOrderStatus";

export const createOnlineOrder = async (data: createOnlineOrderType) => {
    return await prisma.$transaction(async (tx) => {
        if (!data.items || data.items.length === 0) {
            throw new Error("Order must contain at least one item");
        }

        if (data.table_number) {
            const table = await tx.tables.findUnique({
                where: {
                    table_number: data.table_number,
                },
            });

            if (!table) {
                throw new Error("Table not found");
            }

            if (!table.is_available) {
                throw new Error("Table unavailable");
            }
        }

        const baseDrinkIds = [...new Set(data.items.map(i => i.baseDrinkId))];
        const flavorIds = [
            ...new Set(data.items.flatMap(i => i.flavorIds ?? []))
        ];

        const baseDrinks = await tx.base_drinks.findMany({
            where: { id: { in: baseDrinkIds } }
        });

        const flavors = await tx.flavors.findMany({
            where: { id: { in: flavorIds }, is_available: true }
        });

        const validLinks = await tx.base_drink_flavors.findMany({
            where: {
                base_drink_id: { in: baseDrinkIds },
                flavor_id: { in: flavorIds }
            }
        });

        const baseDrinkMap = new Map(baseDrinks.map(b => [b.id, b]));
        const flavorMap = new Map(flavors.map(f => [f.id, f]));
        const linkSet = new Set(
            validLinks.map(l => `${l.base_drink_id}-${l.flavor_id}`)
        );

        let total = 0;

        for (const item of data.items) {
            const baseDrink = baseDrinkMap.get(item.baseDrinkId);

            if (!baseDrink || !baseDrink.is_available) {
                throw new Error("Invalid or unavailable Base Drink");
            }

            let flavorTotal = 0;

            if (item.flavorIds && item.flavorIds.length > 0) {
                for (const fid of item.flavorIds) {
                    const flavor = flavorMap.get(fid);

                    if (!flavor) {
                        throw new Error("Invalid or unavailable flavor");
                    }

                    if (!linkSet.has(`${item.baseDrinkId}-${fid}`)) {
                        throw new Error("Invalid flavor for this base drink");
                    }

                    flavorTotal += flavor.price;
                }
            }

            total += (baseDrink.price + flavorTotal) * item.quantity;
        }

        const order = await tx.orders.create({
            data: {
                payment_method: data.payment_method,
                total_amount: total,
                name: data.name,
                table_number: data.table_number,
                remarks: data.remarks,
            }
        });

        for (const item of data.items) {
            const baseDrink = baseDrinkMap.get(item.baseDrinkId)!;

            let flavorTotal = 0;
            const selectedFlavors = [];

            if (item.flavorIds && item.flavorIds.length > 0) {
                for (const fid of item.flavorIds) {
                    const flavor = flavorMap.get(fid)!;
                    flavorTotal += flavor.price;
                    selectedFlavors.push(flavor);
                }
            }

            const itemTotal =
                (baseDrink.price + flavorTotal) * item.quantity;

            const orderItem = await tx.order_items.create({
                data: {
                    order_id: order.id,
                    base_drink_id: item.baseDrinkId,
                    quantity: item.quantity,
                    base_price: baseDrink.price,
                    total_amount: itemTotal
                }
            });

            if (selectedFlavors.length > 0) {
                await tx.order_item_options.createMany({
                    data: selectedFlavors.map(f => ({
                        order_item_id: orderItem.id,
                        flavor_id: f.id,
                        price: f.price
                    }))
                });
            }
        }

        if (data.table_number) {
            await tx.tables.update({
                where: {
                    table_number: data.table_number,
                },
                data: {
                    is_occupied: true,
                },
            });
        }

        return order;
    });
};

export const getAllOrders = async () => {
    return await prisma.orders.findMany({
        orderBy: { created_at: "desc" }
    });
};

export const getOrderItems = async (orderId: string) => {
    const items = await prisma.order_items.findMany({
        where: { order_id: orderId },
        include: {
            base_drink: true,
            options: {
                include: {
                    flavor: true,
                },
            },
        },
    });

    return items.map(item => ({
        id: item.id,
        baseDrink: item.base_drink?.name,
        basePrice: item.base_price,
        quantity: item.quantity,
        totalAmount: item.total_amount,
        flavors: item.options.map(opt => ({
            name: opt.flavor?.name,
            price: opt.price,
        })),
    }));
};

export const updateOrderStatus = async (
    id: string,
    data: updateOrderStatusInput
) => {
    return await prisma.orders.update({
        where: { id },
        data: {
            status: data.status,
        }
    });
};

export const getRecentOrders = async () => {
    const orders = await prisma.orders.findMany({
        take: 5,
        orderBy: {
            created_at: "desc",
        }
    });

    return orders;
};

export const markOrderPaid = async (id: string) => {
    const order = await prisma.orders.findUnique({
        where: { id },
    });

    if (!order) {
        throw new Error("Could not find this Order");
    }

    return await prisma.orders.update({
        where: { id },
        data: {
            payment_successful: true
        }
    });
};

export const markOrderVoid = async (id: string) => {
    const order = await prisma.orders.findUnique({
        where: { id }
    });

    if (!order) {
        throw new Error("Could not find this order");
    }

    return await prisma.orders.update({
        where: { id },
        data: {
            status: "VOID"
        }
    });
};