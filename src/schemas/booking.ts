import { z } from "zod";

export enum Service {
  Regular = "regular",
  MoveInOut = "moveInOut",
  Business = "business"
}

export enum Frequency {
  OneTime = "oneTime",
  Weekly = "weekly",
  BiWeekly = "biWeekly",
  Monthly = "monthly",
  Custom = "custom"
}

export enum BusinessType {
  Office = "office",
  Retail = "retail",
  Restaurant = "restaurant",
  Other = "other"
}

export enum CleaningOption {
  Dusting = "dusting",
  Vacuuming = "vacuuming",
  Mopping = "mopping",
  RestroomCleaning = "restroomCleaning",
  TrashRemoval = "trashRemoval"
}

export enum PropertySize {
  Small = "small",
  Medium = "medium",
  Large = "large"
}

export const bookingSchema = z.object({
  service: z.nativeEnum(Service).optional(),
  postalCode: z.string().min(5, { message: "Postal code must be at least 5 characters." }),
  date: z.date().optional(),
  frequency: z.nativeEnum(Frequency).optional(),
  hours: z.number().min(2).max(8).optional(),
  bedrooms: z.number().min(1).max(5).optional(),
  bathrooms: z.number().min(1).max(5).optional(),
  extras: z.array(z.string()).optional(),
  selectedDates: z.array(z.date()).optional(),
  timeSlots: z.record(z.string(), z.array(z.string())).optional(),

  // Business Cleaning
  businessType: z.nativeEnum(BusinessType).optional(),
  cleaningOptions: z.array(z.nativeEnum(CleaningOption)).optional(),
  propertySize: z.nativeEnum(PropertySize).optional(),
  specialRequirements: z.string().optional(),
  providerOptions: z.array(z.string()).optional(),
  specialInstructions: z.string().optional(),
  totalAmount: z.number().optional(),

  // Additional fields for MoveInOutStep
  squareMeters: z.number().optional(),
  dirtinessLevel: z.number().optional(),
  lastCleaned: z.number().optional(),
  cleaningPersonnel: z.enum(["normal", "experienced"]).optional(),
  specialConditions: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
