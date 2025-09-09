/**
 * Booking Calculation Utilities - Based on PRD Requirements
 * Implements the business logic for pricing, estimates, and package calculations
 */

import { 
  OneTimeCleaningData, 
  RegularCleaningData,
  OfficeCleaningData,
  Estimate, 
  RegularityPackage, 
  PricingConfig,
  PropertySizeRange,
  PackageRecommendation,
  TimeSlot,
  CleaningFrequency
} from '@/types/bookingFlow';

// Pricing configuration as defined in PRD
export const PRICING_CONFIG: PricingConfig = {
  oneTimeHourlyRate: 50, // $50 per hour for one-time cleaning
  regularHourlyRate: 45, // $45 per hour for regular cleaning (90% of one-time)
  packageDiscounts: {
    [RegularityPackage.WEEKLY]: 0.05,    // 5% discount
    [RegularityPackage.BIWEEKLY]: 0.02,  // 2% discount
    [RegularityPackage.MONTHLY]: 0.00    // No discount
  }
};

// Property size ranges for dropdown selection
export const PROPERTY_SIZE_RANGES: PropertySizeRange[] = [
  { id: 'small', label: 'Small (20-50 m²)', minSize: 20, maxSize: 50, estimatedHours: 2 },
  { id: 'medium-small', label: 'Medium-Small (51-80 m²)', minSize: 51, maxSize: 80, estimatedHours: 3 },
  { id: 'medium', label: 'Medium (81-120 m²)', minSize: 81, maxSize: 120, estimatedHours: 4 },
  { id: 'large', label: 'Large (121-180 m²)', minSize: 121, maxSize: 180, estimatedHours: 6 },
  { id: 'extra-large', label: 'Extra Large (181-250 m²)', minSize: 181, maxSize: 250, estimatedHours: 8 },
  { id: 'custom', label: 'Custom (250+ m²)', minSize: 250, maxSize: 1000, estimatedHours: 10 }
];

/**
 * Calculate one-time cleaning estimate
 * Implements the business logic from PRD Step 2a
 */
export const calculateOneTimeEstimate = (data: OneTimeCleaningData): Estimate => {
  const { propertySize, bathroomCount, hasPets } = data;
  
  // Find the property size range
  const sizeRange = PROPERTY_SIZE_RANGES.find(range => {
    const size = parseInt(propertySize);
    return size >= range.minSize && size <= range.maxSize;
  }) || PROPERTY_SIZE_RANGES[PROPERTY_SIZE_RANGES.length - 1]; // Default to custom
  
  // Base hours from property size
  let estimatedHours = sizeRange?.estimatedHours || 2;
  
  // Add time for bathrooms (0.5 hours per bathroom)
  estimatedHours += bathroomCount * 0.5;
  
  // Add time for pets (0.5 hours if pets present)
  if (hasPets) {
    estimatedHours += 0.5;
  }
  
  // Calculate recommended hours (add 0.5-1 hour buffer)
  const recommendedHours = Math.ceil(estimatedHours + 0.5);
  
  // Calculate pricing
  const baseRate = PRICING_CONFIG.oneTimeHourlyRate;
  const totalPrice = recommendedHours * baseRate;
  
  return {
    estimatedHours: Math.round(estimatedHours * 2) / 2, // Round to nearest 0.5
    recommendedHours,
    totalPrice,
    baseRate,
    finalRate: baseRate
  };
};

/**
 * Calculate regular cleaning package pricing
 * Implements the business logic from PRD Step 2b
 */
export const calculateRegularPricing = (packageType: RegularityPackage): PackageRecommendation => {
  const baseRate = PRICING_CONFIG.regularHourlyRate;
  const discount = PRICING_CONFIG.packageDiscounts[packageType];
  const finalRate = baseRate * (1 - discount);
  
  // Calculate monthly savings (assuming 4 weeks per month)
  const monthlySavings = (PRICING_CONFIG.oneTimeHourlyRate - finalRate) * 4;
  
  // Determine if this is the recommended package
  const isRecommended = packageType === RegularityPackage.WEEKLY; // Weekly is recommended
  
  // Generate reason for recommendation
  let reason = '';
  switch (packageType) {
    case RegularityPackage.WEEKLY:
      reason = 'Best value with 5% discount and consistent cleaning';
      break;
    case RegularityPackage.BIWEEKLY:
      reason = 'Good balance of savings and convenience';
      break;
    case RegularityPackage.MONTHLY:
      reason = 'Flexible scheduling with regular cleaning benefits';
      break;
  }
  
  return {
    package: packageType,
    discount: discount * 100, // Convert to percentage
    monthlySavings,
    isRecommended,
    reason
  };
};

/**
 * Calculate regular cleaning estimate
 * Implements the business logic from PRD Step 1b
 */
export const calculateRegularEstimate = (data: RegularCleaningData): Estimate => {
  const { propertySize, bathroomCount, hasPets, package: packageType } = data;
  
  // Use the same calculation as one-time but with regular pricing
  const oneTimeData: OneTimeCleaningData = {
    propertySize,
    bathroomCount,
    hasPets,
    customerName: data.customerName,
    address: data.address,
    contactInfo: data.contactInfo
  };
  
  const baseEstimate = calculateOneTimeEstimate(oneTimeData);
  
  // Apply package discount
  const finalRate = PRICING_CONFIG.regularHourlyRate * (1 - PRICING_CONFIG.packageDiscounts[packageType]);
  const totalPrice = baseEstimate.recommendedHours * finalRate;
  
  return {
    ...baseEstimate,
    totalPrice,
    baseRate: PRICING_CONFIG.regularHourlyRate,
    discount: PRICING_CONFIG.packageDiscounts[packageType] * 100,
    finalRate
  };
};

/**
 * Calculate office cleaning estimate
 * Implements office-specific business logic
 */
export const calculateOfficeEstimate = (data: OfficeCleaningData): Estimate => {
  const { officeType, workstations, commonAreas } = data;
  
  // Base hours calculation for office cleaning
  let estimatedHours = 2; // Minimum 2 hours
  
  // Add time based on workstations (0.25 hours per workstation)
  estimatedHours += workstations * 0.25;
  
  // Add time for common areas (0.5 hours per common area)
  estimatedHours += commonAreas * 0.5;
  
  // Office type multiplier
  const officeMultipliers = {
    'small-office': 1.0,
    'medium-office': 1.2,
    'large-office': 1.5,
    'warehouse': 1.8,
    'retail': 1.3,
    'medical': 1.6,
    'restaurant': 1.4
  };
  
  const multiplier = officeMultipliers[officeType as keyof typeof officeMultipliers] || 1.0;
  estimatedHours *= multiplier;
  
  // Calculate recommended hours (add 0.5-1 hour buffer)
  const recommendedHours = Math.ceil(estimatedHours + 0.5);
  
  // Office cleaning uses higher base rate
  const baseRate = 60; // $60 per hour for office cleaning
  const totalPrice = recommendedHours * baseRate;
  
  return {
    estimatedHours: Math.round(estimatedHours * 2) / 2, // Round to nearest 0.5
    recommendedHours,
    totalPrice,
    baseRate,
    finalRate: baseRate
  };
};

/**
 * Format price for display
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(price);
};

/**
 * Format price in EUR for display
 */
export const formatPriceEUR = (price: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(price);
};

/**
 * Calculate time slot availability
 */
export const getAvailableTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 8; // 8 AM
  const endHour = 18; // 6 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    const timeString = `${hour.toString().padStart(2, '0')}:00`;
    const isRecommended = hour >= 9 && hour <= 15; // 9 AM to 3 PM are recommended
    
    slots.push({
      id: `${date.toISOString().split('T')[0]}-${timeString}`,
      time: timeString,
      isAvailable: true, // In real implementation, check against bookings
      isRecommended
    });
  }
  
  return slots;
};

/**
 * Validate property size against bathroom count
 */
export const validatePropertySize = (size: number, bathrooms: number): boolean => {
  const minSizePerBathroom = 8; // Minimum 8 m² per bathroom
  const maxSize = 1000; // Maximum 1000 m²
  
  const estimatedMinSize = (bathrooms * minSizePerBathroom) + 20;
  
  return size >= estimatedMinSize && size <= maxSize;
};

/**
 * Get property size range by size value
 */
export const getPropertySizeRange = (size: number): PropertySizeRange | null => {
  return PROPERTY_SIZE_RANGES.find(range => 
    size >= range.minSize && size <= range.maxSize
  ) || null;
};

/**
 * Calculate cleaning frequency discount
 */
export const calculateFrequencyDiscount = (frequency: CleaningFrequency): number => {
  switch (frequency) {
    case CleaningFrequency.ONE_TIME:
      return 0;
    case CleaningFrequency.REGULAR:
      return 0.1; // 10% discount for regular cleaning
    default:
      return 0;
  }
};

/**
 * Calculate total booking price with all discounts
 */
export const calculateTotalPrice = (
  basePrice: number,
  frequency: CleaningFrequency,
  packageType?: RegularityPackage
): number => {
  let totalPrice = basePrice;
  
  // Apply frequency discount
  const frequencyDiscount = calculateFrequencyDiscount(frequency);
  totalPrice *= (1 - frequencyDiscount);
  
  // Apply package discount if regular cleaning
  if (frequency === CleaningFrequency.REGULAR && packageType) {
    const packageDiscount = PRICING_CONFIG.packageDiscounts[packageType];
    totalPrice *= (1 - packageDiscount);
  }
  
  return Math.round(totalPrice * 100) / 100; // Round to 2 decimal places
};