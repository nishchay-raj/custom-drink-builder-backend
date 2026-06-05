import { Request, Response } from "express";
import * as tableService from "../service/tableService";
import { createTableSchema } from "../zod/createTables";

export const createTable = async (req: Request, res: Response) => {
    try {
        const body = createTableSchema.parse(req.body);
        const table = await tableService.createTable(body);
        return res.status(201).json(table);
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "Failed to create table"
        });
    }
}

export const getTablesForUsers = async (req: Request, res: Response) => {
    try {
        const tables = await tableService.getTablesForUsers();
        return res.status(200).json(tables);
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "Failed to get tables"
        });
    }
}

export const getTablesForStaff = async (req: Request, res: Response) => {
    try {
        const tables = await tableService.getTablesForStaff();
        return res.status(200).json(tables);
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "Failed to get tables"
        });
    }
}

export const deleteTable = async (req: Request, res: Response) => {
    try {
        const { tableId } = req.params;
        const deletedTable = await tableService.deleteTable(tableId as string);
        return res.status(200).json(deletedTable);
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "Failed to delete table"
        });
    }
}

export const toggleAvailability = async (req: Request, res: Response) => {
    try {
        const { tableId } = req.params;
        const toggle = await tableService.toggleAvailability(tableId as string);
        return res.status(200).json(toggle);
    }catch(err){
        return res.status(500).json({
            error: err,
            message: "Failed to toggle availability"
        });
    }
}

export const toggleOccupancy = async(req: Request, res: Response) => {
    try{
        const { tableId } = req.params;
        const toggle = await tableService.toggleOccupancy(tableId as string);
        return res.status(200).json(toggle);
    }catch(err){
        return res.status(500).json({
            error: err,
            message: "Failed to toggle occupancy"
        });
    }
}

export const makeIdle = async(req: Request, res: Response) => {
    try{
        const { tableId } = req.params;
        const idle = await tableService.makeIdle(tableId as string);
        return res.status(200).json(idle);
    }catch(err){
        return res.status(500).json({
            error: err,
            message: "Failed to make table idle"
        });
    }
}