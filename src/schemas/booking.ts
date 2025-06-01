
import { z } from "zod";

export enum ServiceType {
  Home = "home",
  DeepCleaning = "deep-cleaning", 
  MoveInOut = "move-in-out",
  Office = "office"
}

export enum Frequency {
  OneTime = "onetime",
  Weekly = "weekly", 
  BiWeekly = "biweekly",
  Monthly = "monthly",
  Custom = "custom"
}

export interface ProviderOption {
  id: string;
  name: string;
  rating?: number;
}

export interface WindowConfig {
  count: number;
  framesIncluding: boolean;
}

export interface IroningConfig {
  time: number;
}

// Base booking schema with common fields
const baseBookingSchema = z.object({
  service: z.nativeEnum(ServiceType),
  postalCode: z.string().min(1, "Postal code is required"),
  date: z.date().optional(),
  preferredTime: z.string().optional(),
  totalAmount: z.number().optional(),
  providerOptions: z.array(z.object({
    id: z.string(),
    name: z.string(),
    rating: z.number().optional()
  })).optional(),
  selectedProviderId: z.string().optional(),
  
  // Address fields
  address: z.string().optional(),
  floor: z.string().optional(),
  entryCode: z.string().optional(),
  accessMethod: z.string().optional(),
  accessInstructions: z.string().optional(),
  
  // Personal information
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  
  // Authentication fields
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  
  // Special instructions
  specialInstructions: z.string().optional(),
  
  // Promo code
  promoCode: z.string().optional(),
  
  // Business cleaning specific fields
  cleaningOptions: z.array(z.string()).optional(),
  weekdayPreference: z.string().optional(),
  timePreference: z.string().optional(),
  selectedDates: z.array(z.date()).optional(),
});

// Home cleaning specific schema
export const homeCleaningSchema = baseBookingSchema.extend({
  frequency: z.nativeEnum(Frequency),
  hours: z.number().min(2).max(12),
  bedrooms: z.number().min(1).max(10),
  bathrooms: z.number().min(1).max(10),
  extras: z.array(z.string()).default([]),
  windowConfig: z.object({
    count: z.number(),
    framesIncluding: z.boolean()
  }).optional(),
  ironingConfig: z.object({
    time: z.number()
  }).optional(),
});

// Deep cleaning specific schema
export const deepCleaningSchema = baseBookingSchema.extend({
  squareMeters: z.number().min(10).max(1000),
  bedrooms: z.number().min(1).max(10),
  bathrooms: z.number().min(1).max(10),
  dirtinessLevel: z.number().min(1).max(5),
  lastCleaned: z.number().min(0).max(12),
  cleaningPersonnel: z.enum(['normal', 'experienced']),
  specialConditions: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
});

// Move in/out specific schema
export const moveInOutSchema = baseBookingSchema.extend({
  squareMeters: z.number().min(10).max(1000),
  bedrooms: z.number().min(1).max(10),
  bathrooms: z.number().min(1).max(10),
  dirtinessLevel: z.number().min(1).max(5),
  lastCleaned: z.number().min(0).max(12),
  cleaningPersonnel: z.enum(['normal', 'experienced']),
  specialConditions: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
});

// Business/office cleaning specific schema
export const businessCleaningSchema = baseBookingSchema.extend({
  frequency: z.nativeEnum(Frequency),
  businessType: z.string(),
  propertySize: z.number().min(10).max(10000),
  specialRequirements: z.string().optional(),
  cleaningOptions: z.array(z.string()).default([]),
  weekdayPreference: z.string().optional(),
  timePreference: z.string().optional(),
  selectedDates: z.array(z.date()).optional(),
});

// Legacy combined schema for backward compatibility
export const bookingSchema = baseBookingSchema.extend({
  frequency: z.nativeEnum(Frequency).optional(),
  hours: z.number().min(2).max(12).optional(),
  bedrooms: z.number().min(1).max(10).optional(),
  bathrooms: z.number().min(1).max(10).optional(),
  extras: z.array(z.string()).default([]),
  windowConfig: z.object({
    count: z.number(),
    framesIncluding: z.boolean()
  }).optional(),
  ironingConfig: z.object({
    time: z.number()
  }).optional(),
  squareMeters: z.number().optional(),
  dirtinessLevel: z.number().optional(),
  lastCleaned: z.number().optional(),
  cleaningPersonnel: z.enum(['normal', 'experienced']).optional(),
  specialConditions: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
  businessType: z.string().optional(),
  propertySize: z.number().optional(),
  specialRequirements: z.string().optional(),
  cleaningOptions: z.array(z.string()).optional(),
  weekdayPreference: z.string().optional(),
  timePreference: z.string().optional(),
  selectedDates: z.array(z.date()).optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type HomeCleaningFormData = z.infer<typeof homeCleaningSchema>;
export type DeepCleaningFormData = z.infer<typeof deepCleaningSchema>;
export type MoveInOutFormData = z.infer<typeof moveInOutSchema>;
export type BusinessCleaningFormData = z.infer<typeof businessCleaningSchema>;
