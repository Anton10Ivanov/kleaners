/**
 * Booking Flow Types - Based on PRD Requirements
 * Product Requirements Document: Booking Flow for Cleaning Company Webapp
 */

// Base booking data structure shared across all services
export interface BaseBookingData {
  customerName: string;
  address: string;
  contactInfo: string;
  // Additional shared fields can be added here
}

// Cleaning frequency enum as defined in PRD
export enum CleaningFrequency {
  ONE_TIME = 'ONE_TIME',
  REGULAR = 'REGULAR'
}

// One-time cleaning data structure
export interface OneTimeCleaningData extends BaseBookingData {
  propertySize: string; // From predefined size ranges
  bathroomCount: number; // Integer only
  hasPets: boolean;
}

// Regular cleaning data structure
export interface RegularCleaningData extends BaseBookingData {
  propertySize: string;
  bathroomCount: number;
  hasPets: boolean;
  package: RegularityPackage;
}

// Regularity package enum with discount structure
export enum RegularityPackage {
  WEEKLY = 'WEEKLY',      // 5% discount
  BIWEEKLY = 'BIWEEKLY',  // 2% discount
  MONTHLY = 'MONTHLY'     // No additional discount
}

// Office cleaning data structure
export interface OfficeCleaningData extends BaseBookingData {
  officeType: string;
  workstations: number;
  commonAreas: number;
  // Additional office-specific fields
}

// Booking schedule interface
export interface BookingSchedule {
  date: Date;
  timeSlot: string;
  // Additional scheduling fields
}

// Estimate calculation result
export interface Estimate {
  estimatedHours: number;
  recommendedHours: number;
  totalPrice: number;
  baseRate: number;
  discount?: number;
  finalRate?: number;
}

// Property size ranges for dropdown selection
export interface PropertySizeRange {
  id: string;
  label: string;
  minSize: number;
  maxSize: number;
  estimatedHours: number;
}

// Service type selection
export enum ServiceType {
  HOME_CLEANING = 'home-cleaning',
  OFFICE_CLEANING = 'office-cleaning'
}

// Pricing configuration
export interface PricingConfig {
  oneTimeHourlyRate: number; // $50
  regularHourlyRate: number; // $45 (90% of one-time)
  packageDiscounts: {
    [RegularityPackage.WEEKLY]: number;    // 5%
    [RegularityPackage.BIWEEKLY]: number;  // 2%
    [RegularityPackage.MONTHLY]: number;   // 0%
  };
}

// Form step configuration
export interface FormStep {
  id: number;
  title: string;
  description: string;
  component: string;
  isCompleted: boolean;
  isActive: boolean;
}

// Booking flow state
export interface BookingFlowState {
  currentStep: number;
  serviceType: ServiceType | null;
  cleaningFrequency: CleaningFrequency | null;
  formData: Partial<BaseBookingData>;
  estimate: Estimate | null;
  schedule: BookingSchedule | null;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

// API response types
export interface BookingSubmissionResponse {
  success: boolean;
  bookingId?: string;
  error?: string;
  redirectUrl?: string;
}

// Validation error type
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Service configuration for different cleaning types
export interface ServiceConfiguration {
  serviceType: ServiceType;
  frequency: CleaningFrequency;
  pricing: PricingConfig;
  availablePackages?: RegularityPackage[];
  requiredFields: string[];
  optionalFields: string[];
}

// Time slot availability
export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
  isRecommended?: boolean;
}

// Calendar availability
export interface CalendarAvailability {
  date: string;
  availableSlots: TimeSlot[];
  isFullyBooked: boolean;
  isHoliday?: boolean;
}

// Package recommendation
export interface PackageRecommendation {
  package: RegularityPackage;
  discount: number;
  monthlySavings: number;
  isRecommended: boolean;
  reason: string;
}

// Form validation rules
export interface ValidationRules {
  required: string[];
  minLength: Record<string, number>;
  maxLength: Record<string, number>;
  patterns: Record<string, RegExp>;
  custom: Record<string, (value: any) => boolean>;
}

// Office cleaning specific types
export interface OfficeCleaningFormData {
  officeType: string;
  workstations: number;
  commonAreas: number;
  customerName: string;
  address: string;
  contactInfo: string;
}

// Enhanced booking flow state
export interface EnhancedBookingFlowState extends BookingFlowState {
  officeData?: OfficeCleaningFormData;
  frequency?: CleaningFrequency;
  selectedPackage?: RegularityPackage;
  customHours?: number;
  isCustomHoursSelected?: boolean;
}

// Booking confirmation data
export interface BookingConfirmation {
  bookingId: string;
  serviceType: ServiceType;
  frequency: CleaningFrequency;
  schedule: BookingSchedule;
  estimate: Estimate;
  totalPrice: number;
  customerInfo: BaseBookingData;
  package?: RegularityPackage;
}

// Payment processing types
export interface PaymentData {
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  serviceDescription: string;
  bookingId: string;
}

// Stripe checkout session
export interface StripeCheckoutSession {
  id: string;
  url: string;
  amount: number;
  currency: string;
  status: 'open' | 'complete' | 'expired';
}

// Booking status tracking
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Notification types
export interface BookingNotification {
  id: string;
  type: 'confirmation' | 'reminder' | 'update' | 'cancellation';
  title: string;
  message: string;
  bookingId: string;
  timestamp: Date;
  isRead: boolean;
}

// All types are already exported above as individual exports
