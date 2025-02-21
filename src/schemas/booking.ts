
import { z } from "zod";

export const bookingSchema = z.object({
  service: z.enum(["regular", "moveinout", "business"]),
  postalCode: z.string().min(1, "Postal code is required"),
  frequency: z.enum(["onetime", "weekly", "biweekly", "monthly"]).optional(),
  hours: z.number().min(2, "Minimum 2 hours required").optional(),
  date: z.date().optional(),
  bedrooms: z.number().min(1, "At least 1 bedroom required").optional(),
  bathrooms: z.number().min(1, "At least 1 bathroom required").optional(),
  extras: z.array(z.string()).default([]),
  additionalNotes: z.string().optional(),
  
  // Business cleaning specific fields
  businessType: z.enum(["office", "retail", "restaurant", "medical", "school", "warehouse", "airbnb", "event", "praxen", "other"]).optional(),
  propertySize: z.number().min(1, "Property size is required").optional(),
  specialRequirements: z.string().optional(),
  cleaningOptions: z.array(z.string()).default([]),
  
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  
  address: z.string().min(1, "Address is required"),
  floor: z.string().optional(),
  entryCode: z.string().optional(),
  accessMethod: z.enum(["home", "concierge", "key"]),
  accessInstructions: z.string().optional(),
  
  specialInstructions: z.string().optional(),
  promoCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type BookingFormData = z.infer<typeof bookingSchema>;
