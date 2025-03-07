
import { z } from "zod";

export enum Frequency {
  OneTime = "one_time",
  Weekly = "weekly",
  BiWeekly = "bi_weekly",
  Monthly = "monthly",
  Custom = "custom"
}

export enum BookingStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Completed = "completed",
  Cancelled = "cancelled"
}

export enum BusinessType {
  Office = "office",
  Restaurant = "restaurant",
  Retail = "retail",
  Medical = "medical",
  School = "school",
  Event = "event",
  Warehouse = "warehouse",
  Airbnb = "airbnb",
  Praxen = "praxen",
  Other = "other"
}

export enum AccessMethod {
  WillBeHome = "will_be_home",
  KeyLockbox = "key_lockbox",
  KeyUnderMat = "key_under_mat",
  DoorCode = "door_code",
  Other = "other"
}

export interface BookingFormData {
  service?: string;
  frequency?: Frequency;
  date?: Date;
  preferredTime?: string;
  hours?: number;
  bedrooms?: number;
  bathrooms?: number;
  extras?: string[];
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  floor?: string;
  accessMethod?: AccessMethod;
  accessCode?: string;
  accessInstructions?: string;
  specialInstructions?: string;
  promoCode?: string;
  totalAmount?: number;
  businessType?: BusinessType;
  businessName?: string;
  businessSize?: string;
  businessDetails?: string;
  providerOptions?: Array<{
    id: string;
    name: string;
    rating?: number;
  }>;
  selectedProviderId?: string;
}

export const bookingSchema = z.object({
  service: z.string().optional(),
  frequency: z.nativeEnum(Frequency).optional(),
  date: z.date().optional(),
  preferredTime: z.string().optional(),
  hours: z.number().min(1).optional(),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  extras: z.array(z.string()).optional(),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  address: z.string().min(1, "Address is required").optional(),
  postalCode: z.string().min(1, "Postal code is required").optional(),
  floor: z.string().optional(),
  accessMethod: z.nativeEnum(AccessMethod).optional(),
  accessCode: z.string().optional(),
  accessInstructions: z.string().optional(),
  specialInstructions: z.string().optional(),
  promoCode: z.string().optional(),
  totalAmount: z.number().optional(),
  businessType: z.nativeEnum(BusinessType).optional(),
  businessName: z.string().optional(),
  businessSize: z.string().optional(),
  businessDetails: z.string().optional(),
  providerOptions: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      rating: z.number().optional(),
    })
  ).optional(),
  selectedProviderId: z.string().optional(),
});
