
import { z } from "zod";
import { 
  ServiceType,
  Frequency as FrequencyEnum, 
  BusinessType as BusinessTypeEnum, 
  CleaningOption as CleaningOptionEnum, 
  PropertySize as PropertySizeEnum, 
  ErrorSeverity as ErrorSeverityEnum 
} from "@/types/enums";

// Re-export the enums for use throughout the application
export { 
  ServiceType,
  FrequencyEnum as Frequency, 
  BusinessTypeEnum as BusinessType, 
  CleaningOptionEnum as CleaningOption, 
  PropertySizeEnum as PropertySize, 
  ErrorSeverityEnum as ErrorSeverity 
};

export interface ProviderOption {
  id: string;
  name: string;
  rating?: number;
}

// Convert enum values to strings for zod validation
const serviceValues = Object.values(ServiceType).map(v => v.toString());

export const bookingSchema = z.object({
  // Basic booking info
  service: z.enum(serviceValues as [string, ...string[]]).optional(),
  postalCode: z.string().min(5, { message: "Postal code must be at least 5 characters." }),
  date: z.date().optional(),
  frequency: z.nativeEnum(FrequencyEnum).optional(),
  hours: z.number().min(2).max(8).optional(),
  bedrooms: z.number().min(1).max(5).optional(),
  bathrooms: z.number().min(1).max(5).optional(),
  extras: z.array(z.string()).optional(),
  selectedDates: z.array(z.date()).optional(),
  timeSlots: z.record(z.string(), z.array(z.string())).optional(),

  // Business Cleaning
  businessType: z.nativeEnum(BusinessTypeEnum).optional(),
  cleaningOptions: z.array(z.nativeEnum(CleaningOptionEnum)).optional(),
  propertySize: z.nativeEnum(PropertySizeEnum).optional(),
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

// Add new schemas for better typing of booking filters and status updates
export const bookingFilterSchema = z.object({
  status: z.string().optional(),
  searchTerm: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  providerId: z.string().optional(),
});

export type BookingFilterParams = z.infer<typeof bookingFilterSchema>;

export const bookingStatusUpdateSchema = z.object({
  id: z.string(),
  status: z.string(),
  providerId: z.string().optional(),
  notes: z.string().optional(),
});

export type BookingStatusUpdate = z.infer<typeof bookingStatusUpdateSchema>;
