
import { z } from "zod";

export const bookingSchema = z.object({
  service: z.enum(["regular", "deep", "moving"]),
  postalCode: z.string().min(1, "Postal code is required"),
  frequency: z.enum(["onetime", "weekly", "biweekly"]).optional(),
  hours: z.number().min(2, "Minimum 2 hours required").optional(),
  date: z.date().optional(),
  bedrooms: z.number().min(1, "At least 1 bedroom required").optional(),
  bathrooms: z.number().min(1, "At least 1 bathroom required").optional(),
  extras: z.array(z.string()).default([]),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
