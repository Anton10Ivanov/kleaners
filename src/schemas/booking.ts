import { z } from "zod";

export enum Frequency {
  Onetime = "onetime",
  Weekly = "weekly",
  Biweekly = "biweekly",
  Custom = "custom"
}

export const bookingSchema = z.object({
  // Basic booking info
  service: z.enum(["regular", "business", "moveInOut", "construction"]),
  postalCode: z.string().min(1, "Postal code is required"),
  frequency: z.nativeEnum(Frequency),
  hours: z.number().min(1),
  bedrooms: z.number().min(1),
  bathrooms: z.number().min(1),
  extras: z.array(z.string()),
  date: z.date().optional(),
  
  // Business specific
  businessType: z.string().optional(),
  propertySize: z.string().optional(),
  specialRequirements: z.string().optional(),
  selectedDays: z.array(z.string()).optional(),
  timeSlots: z.record(z.string()).optional(),
  cleaningOptions: z.array(z.string()).optional(),

  // Access information
  address: z.string().optional(),
  floor: z.string().optional(),
  entryCode: z.string().optional(),
  accessMethod: z.string().optional(),
  accessInstructions: z.string().optional(),
  provideKey: z.boolean().optional(),
  contactForSchedule: z.boolean().optional(),
  
  // Time preferences
  preferredTime: z.string().optional(),

  // Personal information
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  
  // Additional
  promoCode: z.string().optional(),
  specialInstructions: z.string().optional()
});

export type BookingFormData = z.infer<typeof bookingSchema>;

// Type for the time slots
export interface TimeSlot {
  label: string;
  value: string;
  description?: string;
}
