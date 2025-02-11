
import { z } from "zod";

export const bookingSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  postalCode: z.string().min(4, "Invalid postal code").max(5, "Invalid postal code"),
  frequency: z.string().optional(),
  hours: z.number().min(2, "Minimum 2 hours required"),
  date: z.date({
    required_error: "Please select a date",
  }),
  bedrooms: z.number().min(1, "At least 1 bedroom required"),
  bathrooms: z.number().min(1, "At least 1 bathroom required"),
  extras: z.array(z.string()).optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
