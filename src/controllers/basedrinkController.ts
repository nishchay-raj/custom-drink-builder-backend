import { Request, Response } from "express";
import * as baseDrinkservice from "../service/baseDrinkService"
import { updateBaseDrinkSchema } from "../zod/updateBaseDrinks";
import { createBaseDrinksSchema } from "../zod/createBaseDrinks";


export const createBaseDrinks = async (req: Request, res: Response) => {
    try{
        const body = createBaseDrinksSchema.parse(req.body);
        const baseDrink = await baseDrinkservice.createBaseDrink(body);
        return res.status(201).json(baseDrink);
    }catch(err){
        return res.status(500).json({
            error: err,
            message: "Failed to create Base Drink"
        });
    }
}

export const getBaseDrinksforUsers = async (req: Request, res: Response) => {
    try{
        const baseDrinks = await baseDrinkservice.getBaseDrinksforUsers();
        return res.status(200).json(baseDrinks);
    }catch(err){
        res.status(500).json({
            error: err,
            message: "Failed to fetch Base Drinks"
        })
    }
}

export const getBaseDrinksforAdmin = async (req: Request, res: Response) => {
    try{
        const baseDrinks = await baseDrinkservice.getBaseDrinksForAdmin();
        return res.status(200).json(baseDrinks);
    }catch(err){
        res.status(500).json({
            error: err,
            message: "Failed to get Base Drinks"
        })
    }
}

export const editbaseDrinks = async (req: Request, res: Response) => {
    try{
        const { basedrinkId } = req.params;
        const body = updateBaseDrinkSchema.parse(req.body);
        const updated = await baseDrinkservice.editBaseDrink( basedrinkId as string, body);
        res.status(200).json(updated);
    }catch(err) {
        return res.status(500).json({
            error: err,
            message: "Failed to update Base Drink"
        })
    }
}

export const deletebaseDrink = async (req: Request, res: Response) => {
    try{
        const { basedrinkId } = req.params;
        const deletedbaseDrink = await baseDrinkservice.deleteBaseDrink(basedrinkId as string);
        res.status(200).json(deletedbaseDrink);
    }catch(err){
        return res.status(500).json({
            error: err,
            message: "Failed to delete Base Drink"
        })
    }
}

export const toggleAvailability = async (req: Request, res: Response) => {
    try{
        const basedrinkId = updateBaseDrinkSchema.parse(req.params);
        const toggle = await baseDrinkservice.toggleAvailability(basedrinkId as string);
        res.status(200).json(toggle);
    }catch(err){
        return res.status(500).json({
            error: err,
            message: "Failed to toggle availability"
        })
    }
}