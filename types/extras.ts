import { ServiceType } from '@/schemas/booking';

export interface ExtraConfig {
  id: string;
  type: string;
  title: string;
  description: string;
  basePrice: number;
  timeEstimate: number; // in minutes
  compatibleServices: ServiceType[];
  requiresPopup?: boolean;
  options?: ExtraOption[];
  category: 'cleaning' | 'windows' | 'appliances' | 'surfaces' | 'special';
  priority: number; // for sorting
}

export interface ExtraOption {
  id: string;
  label: string;
  priceModifier: number; // multiplier or additional cost
  timeModifier: number; // additional minutes
  description?: string;
}

export interface SelectedExtra {
  id: string;
  selectedOptions?: Record<string, any>;
  customData?: Record<string, any>;
  finalPrice: number;
  estimatedTime: number;
}

// Comprehensive extras configuration
export const EXTRAS_CONFIG: Record<string, ExtraConfig> = {
  // Window Cleaning
  windows: {
    id: 'windows',
    type: 'windows',
    title: 'Window Cleaning',
    description: 'Professional window cleaning service',
    basePrice: 3.50,
    timeEstimate: 5,
    compatibleServices: [ServiceType.Home, ServiceType.Office, ServiceType.DeepCleaning, ServiceType.MoveInOut],
    requiresPopup: true,
    category: 'windows',
    priority: 1,
    options: [
      {
        id: 'frames',
        label: 'Include Frames',
        priceModifier: 0.5,
        timeModifier: 2,
        description: 'Clean window frames and sills'
      },
      {
        id: 'professional',
        label: 'Professional Grade',
        priceModifier: 1.5,
        timeModifier: 3,
        description: 'Streak-free professional cleaning'
      },
      {
        id: 'exterior',
        label: 'Exterior Cleaning',
        priceModifier: 2.0,
        timeModifier: 8,
        description: 'Clean outside surfaces (ground floor only)'
      }
    ]
  },

  // Appliance Cleaning
  oven: {
    id: 'oven',
    type: 'appliances',
    title: 'Oven Deep Clean',
    description: 'Thorough oven interior and exterior cleaning',
    basePrice: 25.00,
    timeEstimate: 45,
    compatibleServices: [ServiceType.Home, ServiceType.DeepCleaning, ServiceType.MoveInOut],
    requiresPopup: true,
    category: 'appliances',
    priority: 2,
    options: [
      {
        id: 'interior_only',
        label: 'Interior Only',
        priceModifier: 0.7,
        timeModifier: -15,
        description: 'Clean only inside the oven'
      },
      {
        id: 'full_service',
        label: 'Complete Service',
        priceModifier: 1.0,
        timeModifier: 0,
        description: 'Interior, exterior, and racks'
      },
      {
        id: 'eco_products',
        label: 'Eco-Friendly Products',
        priceModifier: 1.2,
        timeModifier: 5,
        description: 'Use only eco-friendly cleaning products'
      }
    ]
  },

  refrigerator: {
    id: 'refrigerator',
    type: 'appliances',
    title: 'Refrigerator Cleaning',
    description: 'Complete refrigerator interior and exterior cleaning',
    basePrice: 20.00,
    timeEstimate: 30,
    compatibleServices: [ServiceType.Home, ServiceType.DeepCleaning, ServiceType.MoveInOut],
    requiresPopup: true,
    category: 'appliances',
    priority: 3,
    options: [
      {
        id: 'interior_only',
        label: 'Interior Only',
        priceModifier: 0.6,
        timeModifier: -10,
        description: 'Clean shelves, drawers, and interior surfaces'
      },
      {
        id: 'full_service',
        label: 'Complete Service',
        priceModifier: 1.0,
        timeModifier: 0,
        description: 'Interior, exterior, and coils'
      },
      {
        id: 'disinfection',
        label: 'Disinfection',
        priceModifier: 1.3,
        timeModifier: 10,
        description: 'Deep disinfection of all surfaces'
      }
    ]
  },

  // Laundry Services
  ironing: {
    id: 'ironing',
    type: 'laundry',
    title: 'Ironing Service',
    description: 'Professional ironing and pressing service',
    basePrice: 2.50,
    timeEstimate: 3,
    compatibleServices: [ServiceType.Home, ServiceType.Office],
    requiresPopup: true,
    category: 'cleaning',
    priority: 4,
    options: [
      {
        id: 'per_item',
        label: 'Per Item',
        priceModifier: 1.0,
        timeModifier: 0,
        description: 'Standard ironing per piece'
      },
      {
        id: 'delicate',
        label: 'Delicate Items',
        priceModifier: 1.5,
        timeModifier: 2,
        description: 'Special care for delicate fabrics'
      },
      {
        id: 'express',
        label: 'Express Service',
        priceModifier: 2.0,
        timeModifier: -1,
        description: 'Priority ironing service'
      }
    ]
  },

  // Special Services
  carpet_cleaning: {
    id: 'carpet_cleaning',
    type: 'surfaces',
    title: 'Carpet Deep Cleaning',
    description: 'Professional carpet cleaning and stain removal',
    basePrice: 8.00,
    timeEstimate: 20,
    compatibleServices: [ServiceType.Home, ServiceType.Office, ServiceType.DeepCleaning],
    requiresPopup: true,
    category: 'surfaces',
    priority: 5,
    options: [
      {
        id: 'per_sqm',
        label: 'Per Square Meter',
        priceModifier: 1.0,
        timeModifier: 0,
        description: 'Standard carpet cleaning'
      },
      {
        id: 'stain_removal',
        label: 'Stain Removal',
        priceModifier: 1.4,
        timeModifier: 10,
        description: 'Intensive stain treatment'
      },
      {
        id: 'scotch_guard',
        label: 'Scotch Guard Protection',
        priceModifier: 1.8,
        timeModifier: 15,
        description: 'Protective coating application'
      }
    ]
  },

  // Construction-specific
  dust_removal: {
    id: 'dust_removal',
    type: 'construction',
    title: 'Construction Dust Removal',
    description: 'Specialized dust and debris removal',
    basePrice: 15.00,
    timeEstimate: 30,
    compatibleServices: [ServiceType.PostConstruction, ServiceType.DeepCleaning],
    category: 'special',
    priority: 6
  },

  // Office-specific
  disinfection: {
    id: 'disinfection',
    type: 'sanitization',
    title: 'Professional Disinfection',
    description: 'Hospital-grade disinfection service',
    basePrice: 12.00,
    timeEstimate: 20,
    compatibleServices: [ServiceType.Office, ServiceType.DeepCleaning, ServiceType.MoveInOut],
    requiresPopup: true,
    category: 'special',
    priority: 7,
    options: [
      {
        id: 'standard',
        label: 'Standard Disinfection',
        priceModifier: 1.0,
        timeModifier: 0,
        description: 'Standard disinfection protocol'
      },
      {
        id: 'hospital_grade',
        label: 'Hospital Grade',
        priceModifier: 1.5,
        timeModifier: 10,
        description: 'Medical-grade disinfection'
      },
      {
        id: 'covid_protocol',
        label: 'COVID-19 Protocol',
        priceModifier: 1.3,
        timeModifier: 15,
        description: 'Specialized COVID-19 disinfection'
      }
    ]
  },

  // Basic cleaning additions
  balcony: {
    id: 'balcony',
    type: 'outdoor',
    title: 'Balcony Cleaning',
    description: 'Balcony and terrace cleaning service',
    basePrice: 15.00,
    timeEstimate: 25,
    compatibleServices: [ServiceType.Home, ServiceType.DeepCleaning, ServiceType.MoveInOut],
    category: 'cleaning',
    priority: 8
  },

  garage: {
    id: 'garage',
    type: 'outdoor',
    title: 'Garage Cleaning',
    description: 'Garage and storage area cleaning',
    basePrice: 20.00,
    timeEstimate: 35,
    compatibleServices: [ServiceType.Home, ServiceType.DeepCleaning, ServiceType.PostConstruction],
    category: 'cleaning',
    priority: 9
  }
};

// Helper functions
export const getExtrasForService = (serviceType: ServiceType): ExtraConfig[] => {
  return Object.values(EXTRAS_CONFIG).filter(extra => 
    extra.compatibleServices.includes(serviceType)
  ).sort((a, b) => a.priority - b.priority);
};

export const getExtrasByCategory = (serviceType: ServiceType): Record<string, ExtraConfig[]> => {
  const extras = getExtrasForService(serviceType);
  return extras.reduce((acc, extra) => {
    if (!acc[extra.category]) {
      acc[extra.category] = [];
    }
    acc[extra.category].push(extra);
    return acc;
  }, {} as Record<string, ExtraConfig[]>);
};

export const calculateExtraPrice = (extra: ExtraConfig, selectedOptions?: Record<string, any>): number => {
  let price = extra.basePrice;
  
  if (extra.options && selectedOptions) {
    extra.options.forEach(option => {
      if (selectedOptions[option.id]) {
        price += option.priceModifier;
      }
    });
  }
  
  return price;
};

export const calculateExtraTime = (extra: ExtraConfig, selectedOptions?: Record<string, any>): number => {
  let time = extra.timeEstimate;
  
  if (extra.options && selectedOptions) {
    extra.options.forEach(option => {
      if (selectedOptions[option.id]) {
        time += option.timeModifier;
      }
    });
  }
  
  return time;
};