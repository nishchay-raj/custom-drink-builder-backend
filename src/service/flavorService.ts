import { prisma } from "../lib/prisma";
import { createFlavorsInput } from "../zod/createFlavors";
import { updateFlavorInput } from "../zod/updateFlavor";

export const createFlavor = async (data: createFlavorsInput) => {
    return await prisma.$transaction(async (tx) => {
        const flav = await tx.flavors.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                is_available: data.is_available ?? true,
            },
        });

        if (data.basedrinksIds?.length) {
            const baseDrinks = await tx.base_drinks.findMany({
                where: { id: { in: data.basedrinksIds } }
            });

            if (baseDrinks.length !== data.basedrinksIds.length) {
                throw new Error("Invalid Base Drink IDs");
            }

            await tx.base_drink_flavors.createMany({
                data: data.basedrinksIds.map((id) => ({
                    flavor_id: flav.id,
                    base_drink_id: id,
                })),
            });
        }

        return flav;
    });
};

export const getFlavorforUser = async (basedrink_id: string) => {
    if (!basedrink_id) {
        throw new Error("Base drink must be selected first");
    }

    return await prisma.flavors.findMany({
        where: {
            is_available: true,
            base_drinks: {
                some: {
                    base_drink_id: basedrink_id
                }
            }
        },
        orderBy: { name: "asc" },
        select: {
            id: true,
            name: true,
            price: true,
        }
    });
};

export const getFlavorsForAdmin = async () => {
    return await prisma.flavors.findMany({
        orderBy: { name: "asc" },
        include: {
            base_drinks: {
                include: {
                    base_drink: true
                }
            }
        }
    });
};

export const editFlavor = async (id: string, data: updateFlavorInput) => {
    return await prisma.$transaction(async (tx) => {
        const updated = await tx.flavors.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                is_available: data.is_available,
            }
        });

        if (data.basedrinksIds !== undefined) {
            if (data.basedrinksIds.length > 0) {
                const baseDrinks = await tx.base_drinks.findMany({
                    where: { id: { in: data.basedrinksIds } }
                });

                if (baseDrinks.length !== data.basedrinksIds.length) {
                    throw new Error("Invalid Base Drink IDs");
                }
            }

            await tx.base_drink_flavors.deleteMany({
                where: { flavor_id: id }
            });

            if (data.basedrinksIds.length > 0) {
                await tx.base_drink_flavors.createMany({
                    data: data.basedrinksIds.map((bid) => ({
                        base_drink_id: bid,
                        flavor_id: id,
                    }))
                });
            }
        }

        return updated;
    });
};

export const deleteFlavor = async (id: string) => {
    return await prisma.$transaction([
        prisma.base_drink_flavors.deleteMany({
            where: { flavor_id: id }
        }),
        prisma.flavors.delete({
            where: { id }
        })
    ]);
};

export const toggleAvailability = async (id: string) => {
    const flavor = await prisma.flavors.findUnique({
        where: { id }
    });

    if (!flavor) {
        throw new Error("Flavor not found");
    }

    return await prisma.flavors.update({
        where: { id },
        data: {
            is_available: !flavor.is_available,
        }
    });
};