
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Calendar, Clock, Sparkles, Check, Zap, Shield, Star, RefreshCw, Target, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { MobileStack } from '@/components/layout/mobile-container';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface FrequencyStepProps {
  selected?: number;
  onSelect: (frequency: number) => void;
  officeSize?: string;
  traffic?: string;
}

const frequencyLabels = {
  // Monthly options
  0.25: { label: 'Once a month', description: 'Minimal maintenance for low-traffic spaces', icon: <Calendar className="h-5 w-5" /> },
  0.5: { label: 'Every 2 weeks', description: 'Bi-weekly maintenance for light use', icon: <Calendar className="h-5 w-5" /> },
  
  // Weekly options (whole numbers only)
  1: { label: 'Once a week', description: 'Basic maintenance for small offices', icon: <Calendar className="h-5 w-5" /> },
  2: { label: 'Twice a week', description: 'Standard clean for medium offices', icon: <Target className="h-5 w-5" /> },
  3: { label: '3 times a week', description: 'Enhanced clean for busy offices', icon: <Clock className="h-5 w-5" /> },
  4: { label: '4 times a week', description: 'Almost daily cleaning', icon: <Shield className="h-5 w-5" /> },
  5: { label: '5 times a week', description: 'Daily weekday cleaning', icon: <Sparkles className="h-5 w-5" /> },
  6: { label: '6 times a week', description: 'Daily + Saturday cleaning', icon: <Crown className="h-5 w-5" /> },
  7: { label: 'Daily (7 days)', description: '7 days a week cleaning', icon: <Crown className="h-5 w-5" /> },
  
  // Intensive options (whole numbers only)
  10: { label: 'Twice daily', description: 'Morning & evening cleaning', icon: <Crown className="h-5 w-5" /> },
  14: { label: 'Twice daily (7 days)', description: '14 visits per week', icon: <Crown className="h-5 w-5" /> },
  20: { label: 'Multiple daily', description: '20+ visits per week', icon: <Crown className="h-5 w-5" /> }
};

const getRecommendedFrequency = (officeSize?: string) => {
  switch (officeSize) {
    case 'small': return 1; // Once a week
    case 'medium': return 2; // Twice a week
    case 'large': return 3; // 3 times a week
    case 'corporate': return 5; // Daily weekdays
    case 'enterprise': return 5; // Daily weekdays
    case 'retail-office': return 2; // Twice a week (customer-facing)
    case 'warehouse-office': return 1; // Once a week (industrial)
    default: return 2;
  }
};

// Calculate visits per month based on frequency
const getVisitsPerMonth = (frequency: number): number => {
  // Handle specific frequency values for accuracy
  if (frequency === 0.25) return 1; // Once a month
  if (frequency === 0.5) return 2; // Every 2 weeks
  if (frequency === 1) return 4; // Once a week
  if (frequency === 2) return 8; // Twice a week
  if (frequency === 3) return 12; // 3 times a week
  if (frequency === 4) return 16; // 4 times a week
  if (frequency === 5) return 20; // 5 times a week
  if (frequency === 6) return 24; // 6 times a week
  if (frequency === 7) return 28; // Daily (7 days)
  if (frequency === 10) return 40; // Twice daily
  if (frequency === 14) return 56; // Twice daily (7 days)
  if (frequency === 20) return 80; // Multiple daily
  
  // Fallback calculation for any other values
  return Math.round(frequency * 4.33);
};

// Get service level name based on frequency and office type
const getServiceLevel = (frequency: number, officeSize?: string): string => {
  // Smart: Minimal maintenance (monthly/bi-monthly)
  if (frequency <= 0.5) return 'Smart';
  
  // Comfort: Basic maintenance (weekly)
  if (frequency <= 1) return 'Comfort';
  
  // Premium: Enhanced maintenance (2-3x weekly)
  if (frequency <= 3) return 'Premium';
  
  // Royal: Intensive maintenance (4x+ weekly, daily, multiple daily)
  return 'Royal';
};

// Get service level description and benefits
const getServiceLevelInfo = (level: string) => {
  const serviceLevels = {
    'Smart': {
      description: 'Essential maintenance for low-traffic spaces',
      benefits: ['Basic cleaning', 'Monthly maintenance', 'Cost-effective'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    'Comfort': {
      description: 'Regular maintenance for standard offices',
      benefits: ['Weekly cleaning', 'Standard service', 'Reliable maintenance'],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    'Premium': {
      description: 'Enhanced maintenance for busy offices',
      benefits: ['2-3x weekly cleaning', 'Premium service', 'Priority support'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    'Royal': {
      description: 'Intensive maintenance for high-traffic facilities',
      benefits: ['Daily cleaning', 'Royal service', 'Dedicated team', '24/7 support'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  };
  return serviceLevels[level as keyof typeof serviceLevels] || serviceLevels['Comfort'];
};

export const FrequencyStep: React.FC<FrequencyStepProps> = ({ selected, onSelect, officeSize, traffic }) => {
  const { isMobile } = useMobileOptimizations();
  
  // Special cases for different office types
  const isSmallOffice = officeSize === 'small';
  const isMediumOffice = officeSize === 'medium';
  const isLargeOffice = officeSize === 'large';
  const isCorporateOffice = officeSize === 'corporate';
  const isEnterpriseOffice = officeSize === 'enterprise';
  const isRetailOffice = officeSize === 'retail-office';
  const isWarehouseOffice = officeSize === 'warehouse-office';
  
  const isLightTraffic = traffic === 'light';
  const isHeavyTraffic = traffic === 'heavy';
  
  let frequencyOptions: number[];
  
  // Always include basic options for all office types
  const basicOptions = [0.25, 0.5, 1]; // Once a month, Every 2 weeks, Once a week
  
  if (isSmallOffice) {
    if (isLightTraffic) {
      frequencyOptions = [...basicOptions, 2, 3];
    } else {
      frequencyOptions = [...basicOptions, 2, 3, 4];
    }
  } else if (isMediumOffice) {
    if (isLightTraffic) {
      frequencyOptions = [...basicOptions, 2, 3, 4];
    } else {
      frequencyOptions = [...basicOptions, 2, 3, 4, 5];
    }
  } else if (isLargeOffice) {
    if (isLightTraffic) {
      frequencyOptions = [...basicOptions, 2, 3, 4, 5];
    } else {
      frequencyOptions = [...basicOptions, 2, 3, 4, 5, 6];
    }
  } else if (isCorporateOffice) {
    // Corporate offices: professional standards
    frequencyOptions = [...basicOptions, 2, 3, 4, 5, 6, 7];
  } else if (isEnterpriseOffice) {
    // Enterprise: intensive cleaning
    frequencyOptions = [...basicOptions, 2, 3, 4, 5, 6, 7, 10, 14, 20];
  } else if (isRetailOffice) {
    // Retail: customer-facing, needs regular cleaning
    frequencyOptions = [...basicOptions, 2, 3, 4, 5, 6];
  } else if (isWarehouseOffice) {
    // Warehouse: industrial, less frequent but thorough
    frequencyOptions = [...basicOptions, 2, 3, 4, 5];
  } else {
    // Default comprehensive options
    frequencyOptions = [...basicOptions, 2, 3, 4, 5, 6, 7];
  }
  const recommended = getRecommendedFrequency(officeSize);
  const currentFrequency = selected || recommended;
  const frequencyInfo = frequencyLabels[currentFrequency as keyof typeof frequencyLabels];

  React.useEffect(() => {
    if (!selected) {
      onSelect(recommended);
    }
  }, [recommended, selected, onSelect]);

  return (
    <MobileStack spacing="lg">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <h2 className={cn(
          "font-bold text-foreground mb-3",
          isMobile ? "text-xl" : "text-2xl lg:text-3xl"
        )}>
          How often do you need cleaning?
        </h2>
        <p className={cn(
          "text-muted-foreground",
          isMobile ? "text-sm" : "text-base"
        )}>
          {isSmallOffice && isLightTraffic
            ? 'Perfect! We have special packages for smaller offices with light traffic'
            : isMediumOffice
            ? 'Medium offices benefit from regular cleaning - choose based on your team size and activity'
            : isLargeOffice
            ? 'Larger offices need more frequent cleaning to maintain professional standards'
            : isCorporateOffice
            ? 'Corporate offices require professional-grade cleaning schedules to maintain standards'
            : isEnterpriseOffice
            ? 'Enterprise facilities need intensive cleaning schedules for optimal maintenance'
            : isRetailOffice
            ? 'Retail spaces need regular cleaning to maintain a professional customer-facing appearance'
            : isWarehouseOffice
            ? 'Industrial offices can often use less frequent but thorough cleaning schedules'
            : 'Choose the frequency that best matches your office size and activity level'
          }
        </p>
      </motion.div>

      {/* Frequency Options */}
      <div className={cn(
        "grid gap-4",
        frequencyOptions.length <= 4
          ? "grid-cols-1 max-w-lg mx-auto" 
          : frequencyOptions.length <= 6
          ? isMobile 
            ? "grid-cols-1" 
            : "grid-cols-2 lg:grid-cols-3"
          : isMobile 
            ? "grid-cols-1" 
            : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      )}>
        {frequencyOptions.map((freq, index) => {
          const option = frequencyLabels[freq as keyof typeof frequencyLabels];
          const isSelected = currentFrequency === freq;
          const isRecommended = freq === recommended;
          
          return (
            <motion.div
              key={freq}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:shadow-lg group",
                  isSelected
                    ? "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700"
                    : "hover:border-orange-200 dark:hover:border-orange-700"
                )}
                onClick={() => onSelect(freq)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                      isSelected 
                        ? "bg-orange-500 text-white" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/20"
                    )}>
                      {option.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={cn(
                          "font-semibold text-foreground",
                          isMobile ? "text-base" : "text-lg"
                        )}>
                          {option.label}
                        </h3>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          </motion.div>
                        )}
                      </div>
                      
                      <p className={cn(
                        "text-muted-foreground mb-3",
                        isMobile ? "text-xs" : "text-sm"
                      )}>
                        {option.description}
                      </p>
                      
                      {isRecommended && (
                        <Badge 
                          variant="secondary" 
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          Recommended
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Frequency Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className={cn(
          "grid gap-4",
          isMobile ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-2 max-w-lg mx-auto"
        )}
      >
        <Card className="text-center">
          <CardContent className="p-4">
            <div className={cn(
              "font-bold mb-1",
              isMobile ? "text-lg" : "text-xl",
              getServiceLevelInfo(getServiceLevel(currentFrequency, officeSize)).color
            )}>
              {getServiceLevel(currentFrequency, officeSize)}
            </div>
            <div className={cn(
              "text-muted-foreground mb-2",
              isMobile ? "text-xs" : "text-sm"
            )}>
              Service Level
            </div>
            <div className={cn(
              "text-muted-foreground",
              isMobile ? "text-xs" : "text-xs"
            )}>
              {getServiceLevelInfo(getServiceLevel(currentFrequency, officeSize)).description}
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className={cn(
              "font-bold text-orange-600 dark:text-orange-400 mb-1",
              isMobile ? "text-lg" : "text-xl"
            )}>
              {getVisitsPerMonth(currentFrequency)}
            </div>
            <div className={cn(
              "text-muted-foreground",
              isMobile ? "text-xs" : "text-sm"
            )}>
              Visits/Month
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </MobileStack>
  );
};
