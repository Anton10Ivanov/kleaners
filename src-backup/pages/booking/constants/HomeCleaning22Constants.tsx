import React from 'react';
import { 
  Home, 
  Building, 
  Sparkles, 
  Heart, 
  Zap, 
  Star, 
  CheckCircle, 
  Clock, 
  Calendar,
  Key,
  Euro
} from 'lucide-react';
import { ClutterLevelInfo, PackageInfo } from '../types/HomeCleaning22Types';

export const CLUTTER_LEVELS: ClutterLevelInfo[] = [
  {
    level: 'minimalist',
    label: 'Minimalist',
    description: 'Very clean, minimal items',
    icon: <Home className="h-6 w-6" />,
    multiplier: 0.8
  },
  {
    level: 'lived-in',
    label: 'Lived-in',
    description: 'Normal daily use',
    icon: <Building className="h-6 w-6" />,
    multiplier: 1.0
  },
  {
    level: 'cluttered',
    label: 'Cluttered',
    description: 'Many items, needs organization',
    icon: <Sparkles className="h-6 w-6" />,
    multiplier: 1.3
  },
  {
    level: 'full',
    label: 'Full',
    description: 'Heavily furnished, lots of items',
    icon: <Heart className="h-6 w-6" />,
    multiplier: 1.6
  }
];

export const PACKAGES: PackageInfo[] = [
  {
    id: 'basic',
    name: 'Basic Clean',
    description: 'Essential cleaning services',
    features: ['Dusting', 'Vacuuming', 'Bathroom cleaning', 'Kitchen cleaning'],
    priceMultiplier: 1.0,
    icon: <CheckCircle className="h-6 w-6" />,
    color: 'blue'
  },
  {
    id: 'standard',
    name: 'Standard Clean',
    description: 'Comprehensive cleaning with extras',
    features: ['All Basic features', 'Appliance cleaning', 'Window cleaning', 'Organizing'],
    priceMultiplier: 1.2,
    icon: <Star className="h-6 w-6" />,
    color: 'green'
  },
  {
    id: 'premium',
    name: 'Premium Clean',
    description: 'Deep cleaning with premium services',
    features: ['All Standard features', 'Deep sanitization', 'Furniture cleaning', 'Premium products'],
    priceMultiplier: 1.5,
    icon: <Zap className="h-6 w-6" />,
    color: 'purple'
  }
];

export const FREQUENCY_OPTIONS = [
  { value: 'weekly', label: 'Weekly', description: 'Every week', icon: <Calendar className="h-5 w-5" /> },
  { value: 'biweekly', label: 'Bi-weekly', description: 'Every 2 weeks', icon: <Clock className="h-5 w-5" /> },
  { value: 'monthly', label: 'Monthly', description: 'Once a month', icon: <Calendar className="h-5 w-5" /> }
];

export const FLEXIBILITY_OPTIONS = [
  { 
    value: 'flexible', 
    label: 'Flexible', 
    description: 'Any day/time that works for you',
    discount: '5% discount',
    icon: <Key className="h-5 w-5" />
  },
  { 
    value: 'preferred', 
    label: 'Preferred', 
    description: 'Preferred day/time, some flexibility',
    discount: '2% discount',
    icon: <Clock className="h-5 w-5" />
  },
  { 
    value: 'fixed', 
    label: 'Fixed', 
    description: 'Specific day/time required',
    discount: 'No discount',
    icon: <Calendar className="h-5 w-5" />
  }
];
