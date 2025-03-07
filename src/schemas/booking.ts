
import { z } from "zod";

export enum Service {
  Regular = "regular",
  MoveInOut = "moveInOut",
  Business = "business",
  Construction = "construction"
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

// Update ErrorSeverity enum to include all needed values
export enum ErrorSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
  // Additional values needed by other components
  INFO = "info",
  WARNING = "warning",
  ERROR = "error"
}

export interface ProviderOption {
  id: string;
  name: string;
  rating?: number;
}

export const bookingSchema = z.object({
  // Basic booking info
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
  providerOptions: z.array(z.custom<ProviderOption>()).optional(),
  specialInstructions: z.string().optional(),
  totalAmount: z.number().optional(),

  // Additional fields for MoveInOutStep
  squareMeters: z.number().optional(),
  dirtinessLevel: z.number().optional(),
  lastCleaned: z.number().optional(),
  cleaningPersonnel: z.enum(["normal", "experienced"]).optional(),
  specialConditions: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),

  // Additional fields for Calendar, FrequencyTimeSelector
  preferredTime: z.string().optional(),
  weekdayPreference: z.string().optional(),
  timePreference: z.string().optional(),
  
  // Personal information for booking
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  address: z.string().optional(),
  floor: z.string().optional(),
  entryCode: z.string().optional(),
  accessMethod: z.string().optional(),
  accessInstructions: z.string().optional(),
  promoCode: z.string().optional(),
  
  // Provider selection
  selectedProviderId: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
