import { prisma } from "../lib/prisma";
import { feedBackType } from "../zod/feedbackSchema";

export const createFeedback = async (data: feedBackType) => {
    return await prisma.feedback.create({
        data: {
            name: data.name,
            number: data.number,
            feedback: data.feedback,
        },
    })
}

export const getFeedback = async () => {
    return await prisma.feedback.findMany({
        orderBy: { created_at: "desc"}
    })
}