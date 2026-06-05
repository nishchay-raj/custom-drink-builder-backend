import { prisma } from "../lib/prisma";
import { createAddonsInput } from "../zod/createAddons";
import { updateAddonInput } from "../zod/updateAddons";

export const createAddon = async (data: createAddonsInput) => {
    return await prisma.addons.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                is_available: data.is_available ?? true,
            }
        });
}

export const getAddonsForUsers = async () => {
    return await prisma.addons.findMany({
        where: {
            is_available: true,
        },
        orderBy: {name: "asc"},
    });
}

export const getAddonsForAdmin = async () => {
    return await prisma.addons.findMany({
        orderBy: {name: "asc"},
    });
}

export const editAddons = async (id: string, data: updateAddonInput) => {
    return await prisma.addons.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                is_available: data.is_available,
            },
        })
}

export const deleteAddon = async (id: string) => {
    return await prisma.addons.delete({
        where: { id }
    });
}

export const toggleAvailability = async (id: string) => {
    const addon = await prisma.addons.findUnique({
        where: {id}
    });

    if(!addon){
        throw new Error("Addon not found");
    }

    return await prisma.addons.update({
        where: {id},
        data: {
            is_available: !addon.is_available,
        },
    });
}