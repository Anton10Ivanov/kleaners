
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
    'office': 40, // Will be calculated dynamically for office cleaning
    'deep-cleaning': 45,
    'move-in-out': 50,
    'post-construction': 55
  };
  
  let hourlyRate = baseHourlyRates[serviceType] || 35;
  
  // Dynamic office cleaning pricing (€30-50 range)
  if (serviceType === 'office') {
    hourlyRate = calculateOfficeHourlyRate(data);
  }
  
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
    
    // Supply-specific price adjustments
    if (homeData.clientSupplies) {
      serviceAdjustment -= 2; // €2 discount for client supplies
    }
    if (!homeData.vacuumCleanerProvided) {
      serviceAdjustment += 12; // €12 charge for no vacuum
    }
    
    // Insurance discount (-5% if no insurance)
    if (homeData.insurance === false) {
      serviceAdjustment -= basePrice * 0.05;
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
  
  // Calculate service adjustments
  let serviceAdjustment = 0;
  
  if (serviceType === 'home') {
    const homeData = data as any;
    
    // Supply-specific price adjustments
    if (homeData.clientSupplies) {
      serviceAdjustment -= 2; // €2 discount for client supplies
    }
    if (!homeData.vacuumCleanerProvided) {
      serviceAdjustment += 12; // €12 charge for no vacuum
    }
    
    // Insurance discount (-5% if no insurance)
    if (homeData.insurance === false) {
      serviceAdjustment -= basePrice * 0.05;
    }
  }
  
  const finalTotal = basePrice + extrasPrice + serviceAdjustment;
  
  return {
    duration,
    cleanerCount,
    complexityScore,
    hourlyRate: Math.round(hourlyRate),
    basePrice: Math.round(basePrice),
    extrasPrice: Math.round(extrasPrice),
    serviceAdjustment: Math.round(serviceAdjustment),
    discountPercent,
    total: Math.round(finalTotal)
  };
};

// Get service level from frequency
const getServiceLevelFromFrequency = (frequency: number): string => {
  if (frequency <= 0.5) return 'Smart';
  if (frequency <= 1) return 'Comfort';
  if (frequency <= 3) return 'Premium';
  return 'Royal';
};

// Calculate dynamic hourly rate for office cleaning (€30-50 range)
export const calculateOfficeHourlyRate = (data: any): number => {
  // Base rate starts at €30
  let baseRate = 30;
  
  // Office size multiplier (based on realistic square meter to employee ratios)
  const officeSize = data.officeType?.id || data.officeSize || 'small';
  const sizeMultipliers = {
    'small': 0.0,          // €30 - small offices (40-60 m², 2-4 people)
    'medium': 0.1,         // €33 - medium offices (100-150 m², 6-10 people)
    'large': 0.2,          // €36 - large offices (200-300 m², 12-18 people)
    'corporate': 0.3,      // €39 - corporate offices (400-600 m², 20-30 people)
    'enterprise': 0.4,     // €42 - enterprise facilities (800-1200 m², 35-45 people)
    'retail-office': 0.15, // €34.5 - retail spaces (120-180 m², 4-8 people)
    'warehouse-office': 0.05 // €31.5 - warehouse offices (250-350 m², 8-15 people)
  };
  
  baseRate += (sizeMultipliers[officeSize] || 0) * 10;
  
  // Traffic level adjustment
  const traffic = data.traffic?.id || data.trafficLevel || 'moderate';
  const trafficAdjustments = {
    'minimal': -0.2,     // -€2 for minimal traffic
    'light': -0.1,       // -€1 for light traffic
    'moderate': 0,       // No adjustment for moderate traffic
    'busy': 0.1,         // +€1 for busy traffic
    'heavy': 0.2,        // +€2 for heavy traffic
    'public': 0.3,       // +€3 for public spaces
    'high-security': 0.25, // +€2.5 for high-security
    '24-7': 0.35         // +€3.5 for 24/7 operations
  };
  
  baseRate += (trafficAdjustments[traffic] || 0) * 10;
  
  // Service level-based pricing adjustments
  const frequency = data.frequency || 1;
  const serviceLevel = getServiceLevelFromFrequency(frequency);
  
  // Service level pricing multipliers
  const serviceLevelMultipliers = {
    'Smart': 1.0,     // No discount - minimal service
    'Comfort': 0.95,  // 5% discount - standard service
    'Premium': 0.90,  // 10% discount - enhanced service
    'Royal': 0.85     // 15% discount - intensive service
  };
  
  baseRate *= (serviceLevelMultipliers[serviceLevel] || 1.0);
  
  // Special requirements adjustments
  if (data.cleaningDuringWorkHours) {
    baseRate += 1.5; // +€1.5 for work hours cleaning
  }
  
  if (data.securityClearanceRequired) {
    baseRate += 1; // +€1 for security clearance
  }
  
  if (data.specialEquipmentNeeded) {
    baseRate += 2; // +€2 for special equipment
  }
  
  // Ensure rate stays within €30-50 range
  return Math.max(30, Math.min(50, Math.round(baseRate * 2) / 2));
};

// Legacy function for backward compatibility
export const getPrice = (data: any): number => {
  return calculatePrice(data);
};
