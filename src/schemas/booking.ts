
import { z } from "zod";

export enum Frequency {
  Onetime = "onetime",
  Weekly = "weekly",
  Biweekly = "biweekly",
  Custom = "custom"
}

export const bookingSchema = z.object({
  service: z.enum(["regular", "business", "moveInOut"]),
  postalCode: z.string().min(1, "Postal code is required"),
  frequency: z.nativeEnum(Frequency),
  hours: z.number().min(1),
  bedrooms: z.number().min(1),
  bathrooms: z.number().min(1),
  extras: z.array(z.string()),
  date: z.date().optional(),
  businessType: z.string().optional(),
  propertySize: z.string().optional(),
  specialRequirements: z.string().optional(),
  selectedDays: z.array(z.string()).optional(),
  timeSlots: z.record(z.string()).optional(),
  provideKey: z.boolean().optional(),
  contactForSchedule: z.boolean().optional()
});

export type BookingFormData = z.infer<typeof bookingSchema>;
