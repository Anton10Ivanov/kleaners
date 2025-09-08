
import { WizardAnswers } from '../index';
import { calculateOfficeHourlyRate } from '@/utils/pricing';

export interface QuoteResult {
  planName: string;
  monthlyPrice: number;
  discountedPrice?: number;
  description: string;
  frequency: string;
  includes: string[];
  savings?: number;
}

// Base duration estimates (hours per visit) by office type
// Based on realistic square meter to employee ratios
const baseDurations = {
  'small': 1.5,          // 40-60 m², 2-4 people
  'medium': 2.5,         // 100-150 m², 6-10 people
  'large': 3.5,          // 200-300 m², 12-18 people
  'corporate': 5,        // 400-600 m², 20-30 people
  'enterprise': 7,       // 800-1200 m², 35-45 people
  'retail-office': 2,    // 120-180 m², 4-8 people
  'warehouse-office': 3  // 250-350 m², 8-15 people
};

// Traffic duration multipliers
const trafficMultipliers = {
  minimal: 0.8,      // 20% less time for minimal traffic
  light: 0.9,        // 10% less time for light traffic
  moderate: 1.0,     // Standard time for moderate traffic
  busy: 1.1,         // 10% more time for busy traffic
  heavy: 1.2,        // 20% more time for heavy traffic
  public: 1.4,       // 40% more time for public spaces
  'high-security': 1.3, // 30% more time for high-security
  '24-7': 1.5        // 50% more time for 24/7 operations
};

// Service level-based discounts (aligned with service tiers)
const serviceLevelDiscounts = {
  'Smart': 0,     // No discount - minimal service
  'Comfort': 0.05, // 5% discount - standard service
  'Premium': 0.10, // 10% discount - enhanced service
  'Royal': 0.15    // 15% discount - intensive service
};

// Get service level from frequency
const getServiceLevelFromFrequency = (frequency: number): string => {
  if (frequency <= 0.5) return 'Smart';
  if (frequency <= 1) return 'Comfort';
  if (frequency <= 3) return 'Premium';
  return 'Royal';
};

// Contract discounts
const contractDiscounts = {
  monthly: 0,
  sixMonth: 0.12,
  annual: 0.20
};

export function needsConsultation(answers: WizardAnswers): boolean {
  if (!answers.officeType || !answers.traffic) return false;
  
  return (
    answers.officeType.id === 'enterprise' ||
    (answers.officeType.id === 'large' && (answers.traffic.id === 'high' || answers.traffic.id === 'public'))
  );
}

export function getAvailablePackages(answers: WizardAnswers): string[] {
  if (!answers.officeType || !answers.traffic) return [];
  
  // Enterprise always needs consultation
  if (answers.officeType.id === 'enterprise') return ['consultation'];
  
  // For all other cases, return the dynamic package IDs
  return ['lower', 'selected', 'higher'];
}

interface QuoteOptions {
  contract?: 'monthly' | 'sixMonth' | 'annual';
}

export function generateQuote(answers: WizardAnswers, options: QuoteOptions = {}): QuoteResult | null {
  if (!answers.officeType || !answers.traffic) {
    return null;
  }

  // Default contract to monthly if not provided
  const contract = options.contract || 'monthly';

  // Get frequency from answers or use default
  const frequency = answers.frequency || 1;

  // Calculate hourly rate using dynamic pricing
  const hourlyRate = calculateOfficeHourlyRate({
    officeType: answers.officeType,
    traffic: answers.traffic,
    frequency: frequency
  });

  // Calculate duration per visit
  const baseDuration = baseDurations[answers.officeType.id as keyof typeof baseDurations] || 2;
  const trafficMultiplier = trafficMultipliers[answers.traffic.id as keyof typeof trafficMultipliers];
  const durationPerVisit = baseDuration * trafficMultiplier;

  // Calculate price per visit
  const pricePerVisit = hourlyRate * durationPerVisit;

  // Apply service level discount based on frequency
  const serviceLevel = getServiceLevelFromFrequency(frequency);
  const serviceLevelDiscount = serviceLevelDiscounts[serviceLevel as keyof typeof serviceLevelDiscounts] || 0;
  const discountedPerVisit = pricePerVisit * (1 - serviceLevelDiscount);

  // Calculate visits per month based on frequency
  const getVisitsPerMonth = (freq: number): number => {
    if (freq === 0.25) return 1;        // Once a month
    if (freq === 0.5) return 2;         // Twice a month
    if (freq <= 1) return Math.round(freq * 4.33);  // Weekly or less
    return Math.round(freq * 4.33);     // Multiple times per week
  };

  const visitsPerMonth = getVisitsPerMonth(frequency);
  const monthlyBase = discountedPerVisit * visitsPerMonth;

  // Apply contract discount
  const contractDiscount = contractDiscounts[contract as keyof typeof contractDiscounts];
  const monthlyPrice = Math.round(monthlyBase * (1 - contractDiscount));

  // Calculate savings (compared to no frequency discount)
  const fullPriceMonthly = Math.round(pricePerVisit * visitsPerMonth);
  const savings = fullPriceMonthly - monthlyPrice;

  // Determine plan name
  const planName = getPlanName(answers.officeType.id, frequency);

  // Generate description
  const description = generateDescription({ ...answers, frequency });

  // Generate includes list
  const includes = generateIncludes(answers.officeType.id, frequency);

  return {
    planName,
    monthlyPrice,
    discountedPrice: contractDiscount > 0 ? Math.round(monthlyBase) : undefined,
    description,
    frequency: getFrequencyLabel(frequency),
    includes,
    savings: savings > 0 ? savings : undefined
  };
}

function getPlanName(officeSize: string, frequency: number): string {
  if (frequency <= 0.5) return 'Smart Clean';
  if (frequency <= 1) return 'Comfort Care';
  if (frequency <= 3) return 'Premium Service';
  return 'Royal Maintenance';
}

function getFrequencyLabel(frequency: number): string {
  const labels = {
    0.25: 'Monthly',
    0.5: 'Bi-monthly',
    1: 'Weekly',
    2: 'Bi-weekly', 
    3: '3x per week',
    5: 'Daily weekdays'
  };
  return labels[frequency as keyof typeof labels] || `${frequency}x per week`;
}

function generateDescription(answers: WizardAnswers & { frequency?: number }): string {
  const size = answers.officeType?.label || '';
  const traffic = answers.traffic?.label.toLowerCase() || '';
  const freq = answers.frequency || 0;
  
  if (freq <= 0.5) {
    return `Perfect for ${size.toLowerCase()} spaces with ${traffic} traffic. Includes essential cleaning and maintenance.`;
  } else if (freq <= 1) {
    return `Comprehensive cleaning for ${size.toLowerCase()} offices with ${traffic} traffic. Professional-grade service and supplies.`;
  } else if (freq <= 3) {
    return `Enhanced cleaning for ${size.toLowerCase()} facilities with ${traffic} traffic. Premium service with priority support.`;
  } else {
    return `Royal daily maintenance for ${size.toLowerCase()} facilities with ${traffic} traffic. White-glove service with dedicated support.`;
  }
}

function generateIncludes(officeSize: string, frequency: number): string[] {
  const baseIncludes = [
    'Trash removal and recycling',
    'Desk and surface cleaning',
    'Restroom sanitization',
    'Kitchen/break room cleaning',
    'Vacuuming and floor care'
  ];

  const comfortIncludes = [
    ...baseIncludes,
    'Window cleaning (interior)',
    'Conference room deep cleaning',
    'High-touch surface disinfection'
  ];

  const premiumIncludes = [
    ...comfortIncludes,
    'Reception area detailing',
    'Monthly deep clean add-ons',
    'Kitchen appliance cleaning',
    'Priority scheduling'
  ];

  const royalIncludes = [
    ...premiumIncludes,
    'Carpet deep cleaning (quarterly)',
    'Dedicated account manager',
    'White-glove service standards',
    '24/7 priority support'
  ];

  if (frequency >= 5 || officeSize === 'large' || officeSize === 'enterprise') {
    return royalIncludes;
  } else if (frequency >= 3 || officeSize === 'medium') {
    return premiumIncludes;
  } else if (frequency >= 1) {
    return comfortIncludes;
  } else {
    return baseIncludes;
  }
}
