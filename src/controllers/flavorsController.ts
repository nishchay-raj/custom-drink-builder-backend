import { Request, Response } from "express";
import * as flavorservice from "../service/flavorService"
import { updateFlavorSchema } from "../zod/updateFlavor";
import { createFlavorSchema } from "../zod/createFlavors";

export const createFlavors = async (req: Request, res: Response) => {
    try {
        const body = createFlavorSchema.parse(req.body);
        const flavors = await flavorservice.createFlavor(body);
        return res.status(201).json(flavors);
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "Failed to create Flavor"
        })
    }
}

export const getflavorsforUsers = async (req: Request, res: Response) => {
    try {
        const { baseDrinkId } = req.params;
        const flavors = await flavorservice.getFlavorforUser(baseDrinkId as string);
        return res.status(200).json(flavors);
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "Failed to get Flavors"
        })
    }
}

export const getFlavorsforAdmin = async (req: Request, res: Response) => {
    try {
        const flavors = await flavorservice.getFlavorsForAdmin();
        return res.status(200).json(flavors);
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "Failed to get Flavors"
        })
    }
}

export const editFlavors = async (req: Request, res: Response) => {
    try {
        const { flavorId } = req.params;

        const parsed = updateFlavorSchema.safeParse(req.body);

        if (!parsed.success) {
            return res
                .status(400)
                .json(parsed.error.flatten());
        }

        const body = parsed.data;

        const updated =
            await flavorservice.editFlavor(
                flavorId as string,
                body
            );

        return res.status(200).json(updated);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            error: err,
            message: "Failed to update Flavor",
        });
    }
};

export const deleteFlavor = async (req: Request, res: Response) => {
    try {
        const { flavorId } = req.params;
        const deletedflavor = await flavorservice.deleteFlavor(flavorId as string);
        return res.status(200).json(deletedflavor);
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "Failed to delete Flavor"
        })
    }
}

export const toggleAvailability = async (req: Request, res: Response) => {
    try {
        const flavorId = updateFlavorSchema.parse(req.params);
        const toggle = await flavorservice.toggleAvailability(flavorId as string);
        res.status(200).json(toggle);
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "Failed to toggle availability",
        })
    }
}