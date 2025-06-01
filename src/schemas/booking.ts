
import { z } from 'zod';

export enum Frequency {
  OneTime = "one-time",
  Weekly = "weekly",
  BiWeekly = "bi-weekly",
  Monthly = "monthly",
  Custom = "custom"
}

export const bookingSchema = z.object({
  // Service selection
  serviceType: z.string().min(1, "Please select a service type"),
  
  // Location
  postalCode: z.string().min(1, "Postal code is required"),
  
  // Property details
  propertySize: z.number().min(20, "Property size must be at least 20 m²").max(500, "Property size cannot exceed 500 m²").optional(),
  bedrooms: z.number().min(0).max(10).optional(),
  bathrooms: z.number().min(1).max(10).optional(),
  cleaningPace: z.enum(['standard', 'quick']).default('standard').optional(),
  
  // Booking details
  frequency: z.nativeEnum(Frequency).optional(),
  hours: z.number().min(1).max(12).optional(),
  selectedDate: z.date().optional(),
  selectedTime: z.string().optional(),
  
  // Extras
  extras: z.array(z.string()).default([]).optional(),
  
  // Business specific
  businessType: z.string().optional(),
  cleaningOptions: z.array(z.string()).default([]).optional(),
  squareMeters: z.number().optional(),
  
  // Personal information
  firstName: z.string().min(2, "First name must be at least 2 characters").optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters").optional(),
  email: z.string().email("Please enter a valid email address").optional(),
  phone: z.string().min(10, "Please enter a valid phone number").optional(),
  
  // Address
  street: z.string().min(5, "Street address is required").optional(),
  houseNumber: z.string().min(1, "House number is required").optional(),
  city: z.string().min(2, "City is required").optional(),
  
  // Additional
  specialInstructions: z.string().optional(),
  promoCode: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
