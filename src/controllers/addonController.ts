import e, { Request, Response } from "express";
import * as addonservice from "../service/addonsService";
import { updateAddonSchema } from "../zod/updateAddons";
import { createAddonSchema } from "../zod/createAddons";

export const createAddons = async (req: Request, res: Response) => {
    try {
        const body = createAddonSchema.parse(req.body);
        const addon = await addonservice.createAddon(body);
        return res.status(201).json(addon);
        
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "Failed to create Add-on item"
        });
    }
}

export const getAddonsForUsers = async (req: Request, res: Response) => {
    try{
        const addons = await addonservice.getAddonsForUsers();
        return res.status(200).json(addons);
    } catch(err){
        return res.status(500).json({
            error: err,
            message: "Failed to load Add-on items"
        });
    }
}

export const getAddonsForAdmin = async (req: Request, res: Response) => {
    try{
        const addons = await addonservice.getAddonsForAdmin();
        return res.status(200).json(addons);
    } catch(err){
        return res.status(500).json({
            error: err,
            message: "Failed to load Add-on items"
        });
    }
}

export const editAddon = async (req: Request, res: Response) => {
    try{
        const { addonId } = req.params;
        const body = updateAddonSchema.parse(req.body);
        const updated = await addonservice.editAddons( addonId as string, body);
        return res.status(200).json(updated);
    } catch (err){
        return res.status(500).json({
            error: err,
            message: "Failed to update Add-on item"
        });
    }
}

export const deleteAddon = async (req: Request, res: Response) => {
    try{
        const { addonId } = req.params;
        const deletedAddon = await addonservice.deleteAddon( addonId as string);
        return res.status(200).json(deletedAddon);
    } catch (err){
        return res.status(500).json({
            error: err,
            message: "Failed to delete Add-on item"
        });
    }
}

export const toggleAvailability = async (req: Request, res: Response) => {
    try{
        const { addonId } = req.params;
        const toggle = await addonservice.toggleAvailability(addonId as string);
        return res.status(200).json(toggle);
    } catch(err){
        return res.status(500).json({
            error: err,
            message: "Failed to toggle availability"
        })
    }
}