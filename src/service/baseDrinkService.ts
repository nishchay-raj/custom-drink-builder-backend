import { prisma } from "../lib/prisma";
import { createBaseDrinksInput } from "../zod/createBaseDrinks"
import { updateBaseDrinkInput } from "../zod/updateBaseDrinks";

export const createBaseDrink = async (data: createBaseDrinksInput) => {
    return await prisma.$transaction(async (tx) => {
        const base = await tx.base_drinks.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                is_available: data.is_available ?? true,
            },
        })

        if (data.flavorIds && data.flavorIds.length > 0){
            await tx.base_drink_flavors.createMany({
                data: data.flavorIds.map((fid) => ({
                    base_drink_id: base.id,
                    flavor_id: fid,
                })),
            })
        }

        return base
    })
}

export const getBaseDrinksforUsers = async () => {
    return await prisma.base_drinks.findMany({
        where: {
            is_available: true,
        },
        orderBy: {name: "asc"},
        include: {
            flavors: {
                include:{
                    flavor: true
                }
            }
        }
    });
}

export const getBaseDrinksForAdmin = async () => {
    return await prisma.base_drinks.findMany({
        orderBy: {name: "asc"},
    })
}

export const editBaseDrink = async (id: string, data: updateBaseDrinkInput) => {
    return await prisma.$transaction(async (tx) => {
        const updated = await tx.base_drinks.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                is_available: data.is_available,
            },
        })

        if(data.flavorIds !== undefined){
            const flavors = await tx.flavors.findMany({
                where: { id: { in: data.flavorIds }}
            })

            if(flavors.length !== data.flavorIds.length){
                throw new Error("Invalid flavor IDs")
            }

            await tx.base_drink_flavors.deleteMany({
                where: {base_drink_id: id}
            })

            await tx.base_drink_flavors.createMany({
                data: data.flavorIds.map((fid) => ({
                    base_drink_id: id,
                    flavor_id: fid,
                })),
            })
        }
        return updated
    })
}

export const deleteBaseDrink = async (id: string) => {
    return await prisma.$transaction([
        prisma.base_drink_flavors.deleteMany({
            where: {
                base_drink_id: id
            }
        }),
        prisma.base_drinks.delete({
            where: {id}
        })
    ])
}

export const toggleAvailability = async (id: string) => {
    const drink = await prisma.base_drinks.findUnique({
        where: {id}
    });

    if(!drink){
        throw new Error("Base drink not found");
    }

    return await prisma.base_drinks.update({
        where: {id},
        data: {
            is_available: !drink.is_available,
        },
    });
}