/**
 * Component Validation Schemas
 * Validation schemas for individual booking flow components
 */

import { z } from 'zod';
import { CleaningFrequency, RegularityPackage, ServiceType } from '@/types/bookingFlow';

// Service Selection Validation
export const ServiceSelectionSchema = z.object({
  serviceType: z.enum(['HOME_CLEANING', 'OFFICE_CLEANING'] as const, {
    required_error: 'Please select a service type'
  })
});

// Frequency Selection Validation
export const FrequencySelectionSchema = z.object({
  frequency: z.enum(['ONE_TIME', 'REGULAR'] as const, {
    required_error: 'Please select a cleaning frequency'
  })
});

// Property Details Validation (Home Cleaning)
export const PropertyDetailsSchema = z.object({
  propertySize: z.string().min(1, 'Please select a property size'),
  bathroomCount: z.number()
    .min(1, 'At least 1 bathroom is required')
    .max(5, 'Maximum 5 bathrooms allowed'),
  hasPets: z.boolean().default(false)
});

// Office Details Validation
export const OfficeDetailsSchema = z.object({
  officeType: z.string().min(1, 'Please select an office type'),
  workstations: z.number()
    .min(1, 'At least 1 workstation is required')
    .max(100, 'Maximum 100 workstations allowed'),
  commonAreas: z.number()
    .min(0, 'Common areas cannot be negative')
    .max(20, 'Maximum 20 common areas allowed')
});

// Customer Information Validation
export const CustomerInfoSchema = z.object({
  customerName: z.string()
    .min(2, 'Customer name must be at least 2 characters')
    .max(100, 'Customer name cannot exceed 100 characters'),
  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address cannot exceed 200 characters'),
  contactInfo: z.string()
    .min(10, 'Contact info must be at least 10 characters')
    .max(100, 'Contact info cannot exceed 100 characters')
});

// Package Selection Validation
export const PackageSelectionSchema = z.object({
  package: z.enum(['WEEKLY', 'BIWEEKLY', 'MONTHLY'] as const, {
    required_error: 'Please select a package'
  })
});

// Custom Hours Validation
export const CustomHoursSchema = z.object({
  customHours: z.number()
    .min(0.5, 'Minimum 0.5 hours required')
    .max(12, 'Maximum 12 hours allowed')
    .multipleOf(0.5, 'Hours must be in 0.5 hour increments'),
  isCustomHoursSelected: z.boolean().default(true)
});

// Schedule Selection Validation
export const ScheduleSelectionSchema = z.object({
  date: z.date({
    required_error: 'Please select a date',
    invalid_type_error: 'Please select a valid date'
  }),
  timeSlot: z.string().min(1, 'Please select a time slot')
});

// Estimate Confirmation Validation
export const EstimateConfirmationSchema = z.object({
  estimatedHours: z.number().min(0.5).max(12),
  recommendedHours: z.number().min(0.5).max(12),
  totalPrice: z.number().min(0),
  baseRate: z.number().min(0),
  discount: z.number().min(0).max(100).optional(),
  finalRate: z.number().min(0).optional()
});

// Complete Booking Flow Validation
export const CompleteBookingFlowSchema = z.object({
  serviceType: z.enum(['HOME_CLEANING', 'OFFICE_CLEANING'] as const),
  frequency: z.enum(['ONE_TIME', 'REGULAR'] as const),
  propertyDetails: PropertyDetailsSchema.optional(),
  officeDetails: OfficeDetailsSchema.optional(),
  customerInfo: CustomerInfoSchema,
  package: z.enum(['WEEKLY', 'BIWEEKLY', 'MONTHLY'] as const).optional(),
  customHours: CustomHoursSchema.optional(),
  schedule: ScheduleSelectionSchema,
  estimate: EstimateConfirmationSchema
}).refine((data) => {
  // Ensure property details are provided for home cleaning
  if (data.serviceType === 'HOME_CLEANING' && !data.propertyDetails) {
    return false;
  }
  // Ensure office details are provided for office cleaning
  if (data.serviceType === 'OFFICE_CLEANING' && !data.officeDetails) {
    return false;
  }
  // Ensure package is provided for regular cleaning
  if (data.frequency === 'REGULAR' && !data.package) {
    return false;
  }
  return true;
}, {
  message: 'Required fields are missing for the selected service type and frequency',
  path: ['serviceType']
});

// Form Step Validation
export const FormStepSchema = z.object({
  stepId: z.number().min(0).max(10),
  stepName: z.string().min(1),
  isCompleted: z.boolean().default(false),
  isActive: z.boolean().default(false),
  validationErrors: z.record(z.string()).default({})
});

// Booking State Validation
export const BookingStateSchema = z.object({
  currentStep: z.number().min(0).max(10),
  serviceType: z.enum(['HOME_CLEANING', 'OFFICE_CLEANING'] as const).nullable(),
  frequency: z.enum(['ONE_TIME', 'REGULAR'] as const).nullable(),
  formData: z.record(z.any()).optional(),
  estimate: EstimateConfirmationSchema.nullable(),
  schedule: ScheduleSelectionSchema.nullable(),
  isSubmitting: z.boolean().default(false),
  errors: z.record(z.string()).default({})
});

// Validation Helper Functions
export const validateServiceSelection = (data: unknown) => {
  return ServiceSelectionSchema.safeParse(data);
};

export const validateFrequencySelection = (data: unknown) => {
  return FrequencySelectionSchema.safeParse(data);
};

export const validatePropertyDetails = (data: unknown) => {
  return PropertyDetailsSchema.safeParse(data);
};

export const validateOfficeDetails = (data: unknown) => {
  return OfficeDetailsSchema.safeParse(data);
};

export const validateCustomerInfo = (data: unknown) => {
  return CustomerInfoSchema.safeParse(data);
};

export const validatePackageSelection = (data: unknown) => {
  return PackageSelectionSchema.safeParse(data);
};

export const validateCustomHours = (data: unknown) => {
  return CustomHoursSchema.safeParse(data);
};

export const validateScheduleSelection = (data: unknown) => {
  return ScheduleSelectionSchema.safeParse(data);
};

export const validateCompleteBookingFlow = (data: unknown) => {
  return CompleteBookingFlowSchema.safeParse(data);
};

// Type exports
export type ServiceSelectionData = z.infer<typeof ServiceSelectionSchema>;
export type FrequencySelectionData = z.infer<typeof FrequencySelectionSchema>;
export type PropertyDetailsData = z.infer<typeof PropertyDetailsSchema>;
export type OfficeDetailsData = z.infer<typeof OfficeDetailsSchema>;
export type CustomerInfoData = z.infer<typeof CustomerInfoSchema>;
export type PackageSelectionData = z.infer<typeof PackageSelectionSchema>;
export type CustomHoursData = z.infer<typeof CustomHoursSchema>;
export type ScheduleSelectionData = z.infer<typeof ScheduleSelectionSchema>;
export type CompleteBookingFlowData = z.infer<typeof CompleteBookingFlowSchema>;
export type FormStepData = z.infer<typeof FormStepSchema>;
export type BookingStateData = z.infer<typeof BookingStateSchema>;
