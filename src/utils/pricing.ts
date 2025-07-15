
import { BookingFormData, FrequencyEnum } from "@/schemas/bookingSchemas";
import { calculateDuration, calculateCleanerCount, calculateComplexityScore } from "./bookingCalculations";

// Enhanced pricing calculation system
export const calculatePrice = (data: any): number => {
  const { serviceType } = data;
  
  // Calculate base components
  const duration = calculateDuration(data);
  const cleanerCount = calculateCleanerCount(data);
  const complexityScore = calculateComplexityScore(data);
  
  // Base hourly rates by service type
  const baseHourlyRates = {
    'home': 35,
    'office': 40,
    'deep-cleaning': 45,
    'move-in-out': 50,
    'post-construction': 55
  };
  
  let hourlyRate = baseHourlyRates[serviceType] || 35;
  
  // Apply frequency discounts for home cleaning
  if (serviceType === 'home' && (data as any).frequency) {
    const frequency = (data as any).frequency;
    if (frequency === 'weekly') {
      hourlyRate *= 0.77; // 23% discount
    } else if (frequency === 'bi-weekly') {
      hourlyRate *= 0.86; // 14% discount
    } else if (frequency === 'monthly') {
      hourlyRate *= 0.91; // 9% discount
    }
  }
  
  // Apply complexity multiplier
  const complexityMultiplier = 1 + (complexityScore - 1) * 0.1;
  hourlyRate *= complexityMultiplier;
  
  // Calculate base price
  const basePrice = duration * hourlyRate * cleanerCount;
  
  // Add extras cost
  const extrasPrice = calculateExtrasPrice(data.extras || []);
  
  // Service-specific adjustments
  let serviceAdjustment = 0;
  
  if (serviceType === 'home') {
    const homeData = data as any;
    if (homeData.suppliesProvided) {
      serviceAdjustment -= basePrice * 0.05; // 5% discount for providing supplies
    }
  } else if (serviceType === 'office') {
    const officeData = data as any;
    if (officeData.cleaningDuringWorkHours) {
      serviceAdjustment += basePrice * 0.15; // 15% surcharge for work hours
    }
    if (officeData.securityClearanceRequired) {
      serviceAdjustment += basePrice * 0.1; // 10% surcharge for security clearance
    }
  } else if (serviceType === 'deep-cleaning') {
    const deepData = data as any;
    if (deepData.includeWallsAndCeilings) {
      serviceAdjustment += basePrice * 0.25; // 25% surcharge for walls/ceilings
    }
    if (deepData.moldOrPestPresence) {
      serviceAdjustment += basePrice * 0.2; // 20% surcharge for mold/pest
    }
  } else if (serviceType === 'move-in-out') {
    const moveData = data as any;
    if (moveData.trashRemovalNeeded) {
      serviceAdjustment += 50; // Flat fee for trash removal
    }
    if (moveData.disinfectionRequired) {
      serviceAdjustment += basePrice * 0.15; // 15% surcharge for disinfection
    }
  } else if (serviceType === 'post-construction') {
    const postData = data as any;
    if (postData.hazardousMaterials) {
      serviceAdjustment += basePrice * 0.3; // 30% surcharge for hazardous materials
    }
    if (postData.specialEquipmentNeeded) {
      serviceAdjustment += basePrice * 0.2; // 20% surcharge for special equipment
    }
  }
  
  return Math.round(basePrice + extrasPrice + serviceAdjustment);
};

// Calculate price for extras
const calculateExtrasPrice = (extras: any[]): number => {
  if (!Array.isArray(extras)) return 0;
  
  return extras.reduce((total, extra) => {
    return total + (extra.finalPrice || 0);
  }, 0);
};

// Get price breakdown for display
export const getPriceBreakdown = (data: any) => {
  const { serviceType } = data;
  const duration = calculateDuration(data);
  const cleanerCount = calculateCleanerCount(data);
  const complexityScore = calculateComplexityScore(data);
  
  const baseHourlyRates = {
    'home': 35,
    'office': 40,
    'deep-cleaning': 45,
    'move-in-out': 50,
    'post-construction': 55
  };
  
  let hourlyRate = baseHourlyRates[serviceType] || 35;
  let discountPercent = 0;
  
  // Apply frequency discounts
  if (serviceType === 'home' && (data as any).frequency) {
    const frequency = (data as any).frequency;
    if (frequency === 'weekly') {
      discountPercent = 23;
      hourlyRate *= 0.77;
    } else if (frequency === 'bi-weekly') {
      discountPercent = 14;
      hourlyRate *= 0.86;
    } else if (frequency === 'monthly') {
      discountPercent = 9;
      hourlyRate *= 0.91;
    }
  }
  
  const complexityMultiplier = 1 + (complexityScore - 1) * 0.1;
  hourlyRate *= complexityMultiplier;
  
  const basePrice = duration * hourlyRate * cleanerCount;
  const extrasPrice = calculateExtrasPrice(data.extras || []);
  
  return {
    duration,
    cleanerCount,
    complexityScore,
    hourlyRate: Math.round(hourlyRate),
    basePrice: Math.round(basePrice),
    extrasPrice: Math.round(extrasPrice),
    discountPercent,
    total: Math.round(basePrice + extrasPrice)
  };
};

// Legacy function for backward compatibility
export const getPrice = (data: any): number => {
  return calculatePrice(data);
};
