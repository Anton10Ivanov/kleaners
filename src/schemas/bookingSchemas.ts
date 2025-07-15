// Phase 2: Enhanced Booking Schemas
import { z } from "zod";
import type { Database } from "@/types/database";

// ---------- ENUMS ----------
export const FrequencyEnum = z.enum(["one-time", "weekly", "bi-weekly", "monthly", "custom"]);
export const ServiceTypeEnum = z.enum([
  "home",
  "office", 
  "deep-cleaning",
  "move-in-out",
  "post-construction"
]);
export const CleaningPaceEnum = z.enum(["standard", "quick"]);

// ---------- SHARED FIELDS ----------
const sharedFields = {
  serviceType: ServiceTypeEnum,
  postalCode: z.string().length(5, "Postal code must be exactly 5 characters"),
  cleaningPace: CleaningPaceEnum.optional(),
  selectedDate: z.coerce.date(),
  selectedTime: z.string().min(2, "Please select a time"),
  address: z.string().min(5, "Street address must be at least 5 characters").max(100, "Street address cannot exceed 100 characters"),
  city: z.string().min(2, "City name must be at least 2 characters").max(50, "City name cannot exceed 50 characters").regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, "City name can only contain letters, spaces, and hyphens"),
  floor: z.string().max(20, "Floor description cannot exceed 20 characters").optional(),
  entryCode: z.string().max(20, "Entry code cannot exceed 20 characters").optional(),
  accessMethod: z.string().min(1, "Please select an access method"),
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name cannot exceed 50 characters").regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, "First name can only contain letters, spaces, and hyphens"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name cannot exceed 50 characters").regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, "Last name can only contain letters, spaces, and hyphens"),
  email: z.string().email("Please enter a valid email address").min(5, "Email must be at least 5 characters").max(100, "Email cannot exceed 100 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20, "Phone number cannot exceed 20 characters").regex(/^[\+]?[0-9\s\-\(\)]+$/, "Please enter a valid phone number"),
  promoCode: z.string().optional(),
  specialInstructions: z.string().max(500, "Special instructions cannot exceed 500 characters").optional(),
  windowConfig: z.object({
    count: z.number().min(0),
    type: z.enum(["pro", "regular"]),
    framesIncluded: z.boolean(),
  }).optional(),
  // Enhanced extras system
  extras: z.array(z.object({
    id: z.string(),
    selectedOptions: z.record(z.any()).optional(),
    customData: z.record(z.any()).optional(),
    finalPrice: z.number(),
    estimatedTime: z.number()
  })).default([]).optional(),
};

// ---------- SHARED FIELDSETS ----------
const addressFields = z.object({
  postalCode: sharedFields.postalCode,
  address: sharedFields.address,
  city: sharedFields.city,
  floor: sharedFields.floor,
  entryCode: sharedFields.entryCode,
  accessMethod: sharedFields.accessMethod,
});

const contactFields = z.object({
  firstName: sharedFields.firstName,
  lastName: sharedFields.lastName,
  email: sharedFields.email,
  phone: sharedFields.phone,
});

// ---------- HOME SCHEMA ----------
export const HomeCleaningSchema = z.object({
  ...sharedFields,
  serviceType: z.literal("home"),
  propertySize: z.number().min(20, "Property size must be at least 20 m²").max(500, "Property size cannot exceed 500 m²"),
  bedrooms: z.number().min(0, "Bedrooms cannot be negative").max(10, "Maximum 10 bedrooms allowed"),
  bathrooms: z.number().min(1, "At least 1 bathroom is required").max(10, "Maximum 10 bathrooms allowed"),
  frequency: FrequencyEnum,
  hours: z.number().min(1, "Minimum 1 hour required").max(12, "Maximum 12 hours allowed"),
  dirtinessLevel: z.number().min(1, "Please select dirtiness level").max(5),
  pets: z.string().optional(),
  lastCleaned: z.string().optional(),
  suppliesProvided: z.boolean().default(false),
}).merge(addressFields).merge(contactFields)
.superRefine((data, ctx) => {
  // Business logic validation
  if (data.propertySize && data.bedrooms && data.bathrooms) {
    const estimatedMinSize = (data.bedrooms * 15) + (data.bathrooms * 8) + 30;
    if (data.propertySize < estimatedMinSize) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Property size seems too small for ${data.bedrooms} bedrooms and ${data.bathrooms} bathrooms. Expected at least ${estimatedMinSize}m²`,
        path: ["propertySize"]
      });
    }
  }
  
  // Validate pets consideration for service
  if (data.pets === 'both' || data.pets === 'dogs') {
    if (data.dirtinessLevel && data.dirtinessLevel <= 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Properties with dogs typically require higher dirtiness level assessment",
        path: ["dirtinessLevel"]
      });
    }
  }
  
  // Validate frequency vs property size
  if (data.frequency === 'weekly' && data.propertySize && data.propertySize > 200) {
    if (data.dirtinessLevel && data.dirtinessLevel <= 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Large properties with weekly cleaning and low dirtiness might be over-serviced. Consider bi-weekly.",
        path: ["frequency"]
      });
    }
  }
});

// ---------- OFFICE SCHEMA ----------
export const OfficeCleaningSchema = z.object({
  ...sharedFields,
  serviceType: z.literal("office"),
  squareMeters: z.number().min(10, "Square meters must be at least 10"),
  numEmployees: z.number().min(1, "At least 1 employee required"),
  avgVisitorsPerWeek: z.number().min(0, "Visitors per week cannot be negative"),
  cleaningDuringWorkHours: z.boolean().default(false),
  securityClearanceRequired: z.boolean().default(false),
  pets: z.string().optional(),
  lastCleaned: z.string().optional(),
}).merge(addressFields).merge(contactFields);

// ---------- DEEP CLEANING SCHEMA ----------
export const DeepCleaningSchema = z.object({
  ...sharedFields,
  serviceType: z.literal("deep-cleaning"),
  squareMeters: z.number().min(10, "Square meters must be at least 10"),
  bedrooms: z.number().min(0, "Bedrooms cannot be negative").max(10, "Maximum 10 bedrooms allowed"),
  bathrooms: z.number().min(1, "At least 1 bathroom is required").max(10, "Maximum 10 bathrooms allowed"),
  dirtinessLevel: z.number().min(1, "Please select dirtiness level").max(5),
  lastCleaned: z.string().optional(),
  includeWallsAndCeilings: z.boolean().default(false),
  moldOrPestPresence: z.boolean().optional(),
  specialSurfacesToHandle: z.string().optional(),
  targetAreas: z.array(z.enum(["bathroom", "kitchen", "living-room", "whole-place"])).min(1, "Please select at least one target area"),
  pets: z.string().optional(),
  cleaningGoal: z.enum(["thorough", "maintenance", "restoration"], { required_error: "Please select a cleaning goal" }),
}).merge(addressFields).merge(contactFields);

// ---------- MOVE IN/OUT SCHEMA ----------
export const MoveInOutSchema = z.object({
  ...sharedFields,
  serviceType: z.literal("move-in-out"),
  squareMeters: z.number().min(10, "Square meters must be at least 10"),
  bedrooms: z.number().min(0, "Bedrooms cannot be negative").max(10, "Maximum 10 bedrooms allowed"),
  bathrooms: z.number().min(1, "At least 1 bathroom is required").max(10, "Maximum 10 bathrooms allowed"),
  isFurnished: z.boolean().default(false),
  trashRemovalNeeded: z.boolean().default(false),
  preInspectionRequired: z.boolean().default(false),
  parkingAvailable: z.boolean().default(false),
  dirtinessLevel: z.number().min(1, "Please select dirtiness level").max(5),
  cleaningGoal: z.enum(["deposit", "owner", "clean-start"], { required_error: "Please select a cleaning goal" }),
  disinfectionRequired: z.boolean().default(false),
  pets: z.string().optional(),
  lastCleaned: z.string().optional(),
}).merge(addressFields).merge(contactFields);

// ---------- POST CONSTRUCTION SCHEMA ----------
export const PostConstructionSchema = z.object({
  ...sharedFields,
  serviceType: z.literal("post-construction"),
  squareMeters: z.number().min(10, "Square meters must be at least 10"),
  constructionType: z.enum(["renovation", "new-build", "demolition"], { required_error: "Please select construction type" }),
  dustLevel: z.number().min(1, "Please select dust level").max(5),
  hazardousMaterials: z.boolean().default(false),
  specialEquipmentNeeded: z.boolean().default(false),
  accessRestrictions: z.string().optional(),
  completionDeadline: z.coerce.date().optional(),
  pets: z.string().optional(),
  lastCleaned: z.string().optional(),
}).merge(addressFields).merge(contactFields);

// ---------- EXPORT SCHEMA MAP ----------
export const bookingSchemas = {
  home: HomeCleaningSchema,
  office: OfficeCleaningSchema,
  "deep-cleaning": DeepCleaningSchema,
  "move-in-out": MoveInOutSchema,
  "post-construction": PostConstructionSchema,
} as const;

// ---------- SUPABASE TYPE LINKING ----------
export type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];
export type NewBooking = Database["public"]["Tables"]["bookings"]["Insert"];

// ---------- TYPE INFERENCES ----------
export type HomeBookingForm = z.infer<typeof HomeCleaningSchema>;
export type OfficeBookingForm = z.infer<typeof OfficeCleaningSchema>;
export type DeepCleaningBookingForm = z.infer<typeof DeepCleaningSchema>;
export type MoveInOutBookingForm = z.infer<typeof MoveInOutSchema>;
export type PostConstructionBookingForm = z.infer<typeof PostConstructionSchema>;

// ---------- UTILITY TYPES ----------
export type ServiceType = keyof typeof bookingSchemas;
export type BookingFormData = HomeBookingForm | OfficeBookingForm | DeepCleaningBookingForm | MoveInOutBookingForm | PostConstructionBookingForm;

// ---------- SCHEMA SELECTOR ----------
export function getBookingSchema(serviceType: ServiceType) {
  return bookingSchemas[serviceType];
}

// ---------- VALIDATION HELPER ----------
export function validateBookingData(serviceType: ServiceType, data: unknown) {
  const schema = getBookingSchema(serviceType);
  return schema.safeParse(data);
}