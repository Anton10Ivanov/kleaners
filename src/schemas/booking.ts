
import { z } from 'zod';

export enum Frequency {
  OneTime = 'one_time',
  Weekly = 'weekly',
  Biweekly = 'biweekly',
  Monthly = 'monthly',
  Custom = 'custom',
}

export const providerOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  rating: z.number().optional(),
});

export type ProviderOption = z.infer<typeof providerOptionSchema>;

export const bookingSchema = z.object({
  service: z.string().optional(),
  date: z.date().optional(),
  preferredTime: z.string().optional(),
  frequency: z.nativeEnum(Frequency).default(Frequency.OneTime),
  hours: z.number().min(1).default(2),
  bedrooms: z.number().min(0).default(1),
  bathrooms: z.number().min(0).default(1),
  extras: z.array(z.string()).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  
  // Special instructions
  specialRequirements: z.string().optional(),
  specialInstructions: z.string().optional(),
  
  // Business booking specific fields
  businessType: z.string().optional(),
  propertySize: z.string().optional(),
  selectedDays: z.array(z.string()).optional(),
  timeSlots: z.record(z.string(), z.string()).optional(),
  cleaningOptions: z.array(z.string()).optional(),
  contactForSchedule: z.boolean().optional(),
  provideKey: z.boolean().optional(),
  
  // Deep cleaning specific fields
  propertyCondition: z.string().optional(),
  animalPresence: z.boolean().optional(),
  hasHardwoodFloors: z.boolean().optional(),
  hasCarpets: z.boolean().optional(),
  smokingEnvironment: z.boolean().optional(),
  numberOfLevels: z.number().optional(),
  personalItems: z.string().optional(),
  jobPriority: z.string().optional(),
  specificChallenges: z.string().optional(),
  
  // Move in/out specific fields
  moveType: z.string().optional(),
  currentCondition: z.string().optional(),
  floorCount: z.number().optional(),
  furnishingStatus: z.string().optional(),
  paintRequired: z.boolean().optional(),
  carpetCleaning: z.boolean().optional(),
  windowCleaning: z.boolean().optional(),
  additionalNotes: z.string().optional(),

  // Selected providers
  providerOptions: z.array(providerOptionSchema).optional(),
  selectedProviderId: z.string().optional(),

  // Multiple dates (for recurring bookings)
  selectedDates: z.array(z.date()).optional(),
  
  // Access details
  entryCode: z.string().optional(),
  floor: z.string().optional(),
  accessMethod: z.string().optional(),
  accessInstructions: z.string().optional(),
  
  // Authentication
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  
  // Promotions
  promoCode: z.string().optional(),
  
  // Pricing
  totalAmount: z.number().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
