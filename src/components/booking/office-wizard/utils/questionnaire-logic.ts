
import { WizardAnswers } from '../index';

export interface QuoteResult {
  planName: string;
  monthlyPrice: number;
  discountedPrice?: number;
  description: string;
  frequency: string;
  includes: string[];
  savings?: number;
}

// Base pricing matrix (per visit)
const basePricing = {
  small: 120,
  medium: 220,
  large: 380,
  enterprise: 600
};

// Traffic multipliers
const trafficMultipliers = {
  low: 0.85,
  medium: 1.0,
  high: 1.25,
  public: 1.5
};

// Frequency discounts (higher frequency = better rate per visit)
const frequencyDiscounts = {
  1: 0,      // weekly = 0% discount
  2: 0.08,   // bi-weekly = 8% discount  
  3: 0.15,   // 3x/week = 15% discount
  5: 0.25,   // 5x/week = 25% discount
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
  
  // Large offices with high traffic: Premium + consultation
  if (answers.officeType.id === 'large' && (answers.traffic.id === 'high' || answers.traffic.id === 'public')) {
    return ['premium', 'consultation'];
  }
  
  // Small/Medium offices: All packages
  return ['essential', 'professional', 'premium'];
}

interface QuoteOptions {
  contract?: 'monthly' | 'sixMonth' | 'annual';
}

export function generateQuote(answers: WizardAnswers, options: QuoteOptions = {}): QuoteResult | null {
  if (!answers.officeType || !answers.traffic || !answers.frequency) {
    return null;
  }

  // Default contract to monthly if not provided
  const contract = options.contract || 'monthly';

  // Base price per visit
  const basePrice = basePricing[answers.officeType.id as keyof typeof basePricing];
  if (!basePrice) return null;

  // Apply traffic multiplier
  const trafficMultiplier = trafficMultipliers[answers.traffic.id as keyof typeof trafficMultipliers];
  const adjustedPrice = basePrice * trafficMultiplier;

  // Apply frequency discount
  const frequencyDiscount = frequencyDiscounts[answers.frequency as keyof typeof frequencyDiscounts];
  const discountedPerVisit = adjustedPrice * (1 - frequencyDiscount);

  // Calculate monthly price (frequency * 4.33 weeks per month)
  const monthlyBase = discountedPerVisit * answers.frequency * 4.33;

  // Apply contract discount
  const contractDiscount = contractDiscounts[contract as keyof typeof contractDiscounts];
  const monthlyPrice = Math.round(monthlyBase * (1 - contractDiscount));

  // Calculate savings
  const fullPriceMonthly = Math.round(basePrice * answers.frequency * 4.33);
  const savings = fullPriceMonthly - monthlyPrice;

  // Determine plan name
  const planName = getPlanName(answers.officeType.id, answers.frequency);

  // Generate description
  const description = generateDescription(answers);

  // Generate includes list
  const includes = generateIncludes(answers.officeType.id, answers.frequency);

  return {
    planName,
    monthlyPrice,
    discountedPrice: contractDiscount > 0 ? Math.round(monthlyBase) : undefined,
    description,
    frequency: getFrequencyLabel(answers.frequency),
    includes,
    savings: savings > 0 ? savings : undefined
  };
}

function getPlanName(officeSize: string, frequency: number): string {
  if (frequency <= 2) return 'Essential Clean';
  if (frequency <= 4) return 'Professional Care';
  return 'Premium Maintenance';
}

function getFrequencyLabel(frequency: number): string {
  const labels = {
    1: 'Weekly',
    2: 'Bi-weekly', 
    3: '3x per week',
    5: 'Daily weekdays'
  };
  return labels[frequency as keyof typeof labels] || `${frequency}x per week`;
}

function generateDescription(answers: WizardAnswers): string {
  const size = answers.officeType?.label || '';
  const traffic = answers.traffic?.label.toLowerCase() || '';
  const freq = answers.frequency || 0;
  
  if (freq <= 2) {
    return `Perfect for ${size.toLowerCase()} spaces with ${traffic} traffic. Includes essential cleaning and maintenance.`;
  } else if (freq <= 4) {
    return `Comprehensive cleaning for ${size.toLowerCase()} offices with ${traffic} traffic. Professional-grade service and supplies.`;
  } else {
    return `Premium daily maintenance for ${size.toLowerCase()} facilities with ${traffic} traffic. White-glove service with priority support.`;
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

  const enhancedIncludes = [
    ...baseIncludes,
    'Window cleaning (interior)',
    'Conference room deep cleaning',
    'High-touch surface disinfection',
    'Monthly deep clean add-ons'
  ];

  const premiumIncludes = [
    ...enhancedIncludes,
    'Reception area detailing',
    'Carpet deep cleaning (quarterly)',
    'Kitchen appliance cleaning',
    'Priority scheduling and support',
    'Dedicated account manager'
  ];

  if (frequency >= 5 || officeSize === 'large' || officeSize === 'enterprise') {
    return premiumIncludes;
  } else if (frequency >= 3 || officeSize === 'medium') {
    return enhancedIncludes;
  } else {
    return baseIncludes;
  }
}
