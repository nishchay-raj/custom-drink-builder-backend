import { Request, Response } from "express";
import * as feedbackService from "../service/feedbackService";
import { feedbackSchema } from "../zod/feedbackSchema";

export const createFeedbackController = async (req: Request, res: Response) => {
    try {
        const body = feedbackSchema.parse(req.body);
        const feedbackCreated = await feedbackService.createFeedback(body);
        return res.status(201).json({
            "message": "feedback created",
            feedbackCreated,
        });
    } catch (err) {
        return res.status(500).json({
            "err": err,
            "message": "could not create feedback",
        });
    }
}

export const getFeedBackController = async (req: Request, res: Response) => {
    try {
        const feedbacks = await feedbackService.getFeedback();
        return res.status(200).json({
            "message": "feedbacks fetched",
            feedbacks,
        });
    } catch (err) {
        return res.status(500).json({
            "error": err,
            "message": "could not get the feedbacks",
        });
    }
}