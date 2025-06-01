
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

export const bookingSchema = z.object({
  service: z.nativeEnum(ServiceType),
  postalCode: z.string().min(1, "Postal code is required"),
  frequency: z.nativeEnum(Frequency),
  hours: z.number().min(2).max(12),
  bedrooms: z.number().min(1).max(10),
  bathrooms: z.number().min(1).max(10),
  date: z.date().optional(),
  preferredTime: z.string().optional(),
  extras: z.array(z.string()).default([]),
  windowConfig: z.object({
    count: z.number(),
    framesIncluding: z.boolean()
  }).optional(),
  ironingConfig: z.object({
    time: z.number()
  }).optional(),
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
  
  // Special instructions
  specialInstructions: z.string().optional(),
  
  // Promo code
  promoCode: z.string().optional(),
  
  // Move In/Out and Deep Cleaning fields
  squareMeters: z.number().optional(),
  dirtinessLevel: z.number().optional(),
  lastCleaned: z.number().optional(),
  cleaningPersonnel: z.enum(['normal', 'experienced']).optional(),
  specialConditions: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
  
  // Business cleaning fields
  businessType: z.string().optional(),
  propertySize: z.number().optional(),
  specialRequirements: z.string().optional(),
  cleaningOptions: z.array(z.string()).optional(),
  
  // Business scheduling fields
  weekdayPreference: z.string().optional(),
  timePreference: z.string().optional(),
  selectedDates: z.array(z.date()).optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
