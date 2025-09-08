import { ClutterLevel22, Frequency22, FlexibilityType22, Package22 } from '../types/HomeCleaning22Types';

// Calculate recommended hours based on property size and clutter level
export const calculateRecommendedHours22 = (propertySize: number, clutterLevel: ClutterLevel22): number => {
  const baseHours = Math.ceil(propertySize / 50); // Base: 1 hour per 50 sqm
  const clutterMultipliers = {
    'minimalist': 0.8,
    'lived-in': 1.0,
    'cluttered': 1.3,
    'full': 1.6
  };
  
  return Math.ceil(baseHours * clutterMultipliers[clutterLevel]);
};

// Calculate price based on hours, frequency, and flexibility
export const calculatePrice22 = (
  hours: number, 
  frequency: Frequency22 | null, 
  flexibilityType: FlexibilityType22 | null
): number => {
  const baseRate = 50; // €50/hour
  let price = hours * baseRate;
  
  if (frequency) {
    price *= 0.9; // 10% recurring discount
    
    if (flexibilityType === 'flexible') {
      price *= 0.95; // Additional 5% for flexibility (15% total)
    }
  }
  
  return Math.round(price);
};

// Calculate monthly total for recurring plans
export const calculateMonthlyTotal22 = (pricePerClean: number, frequency: Frequency22): number => {
  const cleansPerMonth = {
    weekly: 4,
    biweekly: 2,
    monthly: 1
  };
  
  return pricePerClean * cleansPerMonth[frequency];
};

// Get package price multiplier
export const getPackageMultiplier = (packageType: Package22): number => {
  const multipliers = {
    basic: 1.0,
    standard: 1.2,
    premium: 1.5
  };
  
  return multipliers[packageType];
};

// Calculate final price with package multiplier
export const calculateFinalPrice = (
  basePrice: number,
  packageType: Package22 | null
): number => {
  if (!packageType) return basePrice;
  
  const multiplier = getPackageMultiplier(packageType);
  return Math.round(basePrice * multiplier);
};
