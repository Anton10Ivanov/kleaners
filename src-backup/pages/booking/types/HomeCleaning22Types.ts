export type FlowType22 = 'one-time' | 'recurring';
export type Step22 = 0 | 1 | 2 | 3 | 4 | 5;
export type Frequency22 = 'weekly' | 'biweekly' | 'monthly';
export type ClutterLevel22 = 'minimalist' | 'lived-in' | 'cluttered' | 'full';
export type Package22 = 'basic' | 'standard' | 'premium';
export type FlexibilityType22 = 'flexible' | 'preferred' | 'fixed';

export interface BookingData22 {
  flowType: FlowType22 | null;
  propertySize: number;
  clutterLevel: ClutterLevel22 | null;
  hours: number;
  frequency: Frequency22 | null;
  package: Package22 | null;
  flexibilityType: FlexibilityType22 | null;
  preferredDay: string;
  preferredTime: string;
  selectedDate: Date | null;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    accessMethod: string;
    specialInstructions: string;
  };
}

export interface ClutterLevelInfo {
  level: ClutterLevel22;
  label: string;
  description: string;
  icon: React.ReactNode;
  multiplier: number;
}

export interface PackageInfo {
  id: Package22;
  name: string;
  description: string;
  features: string[];
  priceMultiplier: number;
  icon: React.ReactNode;
  color: string;
}
