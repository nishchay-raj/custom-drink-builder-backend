import { prisma } from "../lib/prisma";
import { createTableInput } from "../zod/createTables";

export const createTable = async (data: createTableInput) => {
    return await prisma.tables.create({
        data: {
            table_number: data.table_number,
            is_available: data.is_available ?? true,
            is_occupied: data.is_occupied ?? false,
        }
    });
}

export const getTablesForUsers = async () => {
    return await prisma.tables.findMany({
        where: {
            is_available: true,
            is_occupied: false
        },
        orderBy: {table_number: "asc"}
    });
}

export const getTablesForStaff = async () => {
    return await prisma.tables.findMany({
        orderBy: {table_number: "asc"}
    });
}

export const deleteTable = async(id: string) => {
    return await prisma.tables.delete({
        where: {id}
    });
}

export const toggleAvailability = async(id: string) => {
    const table = await prisma.tables.findUnique({
        where: {id}, 
    });

    if(!table){
        throw new Error("Table not found");
    }

    return await prisma.tables.update({
        where: {id},
        data: {
            is_available: !table.is_available,
            is_occupied: false,
        },
    });
}

export const toggleOccupancy = async (id: string) => {
    const table = await prisma.tables.findUnique({
        where: {id},
    });

    if(!table){
        throw new Error("Table not found");
    }

    return await prisma.tables.update({
        where: {id},
        data: {
            is_occupied: !table.is_occupied,
        },
    });
}

export const makeIdle = async (id: string) => {
    const table = await prisma.tables.findUnique({
        where: {id},
    });

    if(!table){
        throw new Error("Table not found");
    }

    return await prisma.tables.update({
        where: {id},
        data: {
            is_occupied: false,
        },
    });
}