
import { z } from 'zod';

export enum Frequency {
  OneTime = "one-time",
  Weekly = "weekly",
  BiWeekly = "bi-weekly",
  Monthly = "monthly",
  Custom = "custom"
}

export enum ServiceType {
  Home = "home",
  Office = "office",
  DeepCleaning = "deep-cleaning",
  MoveInOut = "move-in-out",
  PostConstruction = "post-construction"
}

export interface ProviderOption {
  id: string;
  name: string;
  rating: number;
  price: number;
}

export const bookingSchema = z.object({
  // Service selection
  serviceType: z.string().min(1, "Please select a service type"),
  service: z.string().optional(), // Legacy field for compatibility
  
  // Location
  postalCode: z.string().min(1, "Postal code is required"),
  
  // Property details - standardized naming
  propertySize: z.number().min(20, "Property size must be at least 20 m²").max(500, "Property size cannot exceed 500 m²").optional(),
  squareMeters: z.number().optional(), // Keep for backward compatibility
  bedrooms: z.number().min(0).max(10).optional(),
  bathrooms: z.number().min(1).max(10).optional(),
  cleaningPace: z.enum(['standard', 'quick']).default('standard').optional(),
  
  // Booking details
  frequency: z.nativeEnum(Frequency).optional(),
  hours: z.number().min(1).max(12).optional(),
  selectedDate: z.date().optional(),
  date: z.date().optional(), // Legacy field for compatibility
  selectedTime: z.string().optional(),
  preferredTime: z.string().optional(), // Legacy field for compatibility
  
  // Business frequency preferences
  weekdayPreference: z.string().optional(),
  timePreference: z.string().optional(),
  
  // Date selection for business/custom schedules
  selectedDates: z.array(z.date()).default([]).optional(),
  
  // Extras and configurations
  extras: z.array(z.string()).default([]).optional(),
  windowConfig: z.object({
    count: z.number(),
    type: z.string(),
    framesIncluding: z.boolean().optional()
  }).optional(),
  ironingConfig: z.object({
    enabled: z.boolean(),
    items: z.number(),
    time: z.number().optional()
  }).optional(),
  
  // Provider selection
  providerOptions: z.array(z.object({
    id: z.string(),
    name: z.string(),
    rating: z.number(),
    price: z.number()
  })).optional(),
  selectedProviderId: z.string().optional(),
  
  // Business specific
  businessType: z.string().optional(),
  cleaningOptions: z.array(z.string()).default([]).optional(),
  specialRequirements: z.string().optional(),
  
  // Personal information
  firstName: z.string().min(2, "First name must be at least 2 characters").optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters").optional(),
  email: z.string().email("Please enter a valid email address").optional(),
  phone: z.string().min(10, "Please enter a valid phone number").optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  
  // Address fields
  address: z.string().optional(),
  street: z.string().min(5, "Street address is required").optional(),
  houseNumber: z.string().min(1, "House number is required").optional(),
  city: z.string().min(2, "City is required").optional(),
  floor: z.string().optional(),
  entryCode: z.string().optional(),
  accessMethod: z.string().optional(),
  accessInstructions: z.string().optional(),
  
  // Additional
  specialInstructions: z.string().optional(),
  promoCode: z.string().optional(),
  
  // Deep cleaning specific fields
  dirtinessLevel: z.number().min(1).max(5).optional(),
  lastCleaned: z.number().min(1).max(5).optional(),
  cleaningPersonnel: z.string().optional(),
  specialConditions: z.array(z.string()).default([]).optional(),
  additionalNotes: z.string().optional(),
});

// Create home cleaning specific schema
export const homeCleaningSchema = bookingSchema.extend({
  service: z.literal("home"),
  propertySize: z.number().min(20, "Property size must be at least 20 m²").max(500, "Property size cannot exceed 500 m²"),
  bedrooms: z.number().min(0).max(10),
  bathrooms: z.number().min(1).max(10),
  cleaningPace: z.enum(['standard', 'quick']).default('standard'),
  frequency: z.nativeEnum(Frequency),
  hours: z.number().min(1).max(12),
});

// Create business cleaning specific schema
export const businessCleaningSchema = bookingSchema.extend({
  businessType: z.string().min(1, "Business type is required"),
  cleaningOptions: z.array(z.string()).min(1, "At least one cleaning option is required"),
  squareMeters: z.number().min(10, "Square meters is required"),
  specialRequirements: z.string().optional(),
});

// Create deep cleaning specific schema
export const deepCleaningSchema = bookingSchema.extend({
  service: z.literal("deep-cleaning"),
  squareMeters: z.number().min(10, "Square meters is required"),
  bedrooms: z.number().min(0).max(10),
  bathrooms: z.number().min(1).max(10),
  dirtinessLevel: z.number().min(1).max(5),
  lastCleaned: z.number().min(1).max(5),
  cleaningPersonnel: z.string().min(1, "Please select cleaning personnel"),
  specialConditions: z.array(z.string()).default([]),
  additionalNotes: z.string().optional(),
});

// Create move-in-out cleaning specific schema
export const moveInOutSchema = bookingSchema.extend({
  service: z.literal("move-in-out"),
  squareMeters: z.number().min(10, "Square meters is required"),
  bedrooms: z.number().min(0).max(10),
  bathrooms: z.number().min(1).max(10),
  dirtinessLevel: z.number().min(1).max(5),
  lastCleaned: z.number().min(1).max(5),
  cleaningPersonnel: z.string().min(1, "Please select cleaning personnel"),
  specialConditions: z.array(z.string()).default([]),
  additionalNotes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type HomeCleaningFormData = z.infer<typeof homeCleaningSchema>;
export type BusinessCleaningFormData = z.infer<typeof businessCleaningSchema>;
export type DeepCleaningFormData = z.infer<typeof deepCleaningSchema>;
export type MoveInOutFormData = z.infer<typeof moveInOutSchema>;
export { ProviderOption };
