import z from "zod";

export const updateMenuItemAvailabilitySchema = z.object({
    is_available: z.boolean(),
});
export type UpdateMenuItemAvailability = z.infer<typeof updateMenuItemAvailabilitySchema>;
