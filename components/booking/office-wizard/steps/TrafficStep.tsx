
import React from 'react';
import { Users, TrendingUp, Building, Globe, Check, Clock, Shield, Zap, Star, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { MobileStack } from '@/components/layout/mobile-container';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TrafficLevel {
  id: string;
  label: string;
  multiplier: number;
  description: string;
  visitors: string;
  icon: React.ReactNode;
}

interface TrafficStepProps {
  selected?: TrafficLevel;
  onSelect: (traffic: TrafficLevel) => void;
  officeType?: string;
}

const trafficLevels: TrafficLevel[] = [
  {
    id: 'minimal',
    label: 'Minimal Traffic',
    multiplier: 0.8,
    description: 'Private office, very few visitors',
    visitors: '< 10 daily visitors',
    icon: <Shield className="h-5 w-5" />
  },
  {
    id: 'light',
    label: 'Light Traffic',
    multiplier: 0.9,
    description: 'Mostly employees, occasional visitors',
    visitors: '10-25 daily visitors',
    icon: <Users className="h-5 w-5" />
  },
  {
    id: 'moderate',
    label: 'Moderate Traffic',
    multiplier: 1.0,
    description: 'Regular client meetings and visitors',
    visitors: '25-50 daily visitors',
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    id: 'busy',
    label: 'Busy Office',
    multiplier: 1.2,
    description: 'High activity with frequent visitors',
    visitors: '50-100 daily visitors',
    icon: <Activity className="h-5 w-5" />
  },
  {
    id: 'heavy',
    label: 'Heavy Traffic',
    multiplier: 1.4,
    description: 'Very busy office with constant activity',
    visitors: '100-200 daily visitors',
    icon: <Building className="h-5 w-5" />
  },
  {
    id: 'public',
    label: 'Public-Facing',
    multiplier: 1.6,
    description: 'Retail, showroom, or reception area',
    visitors: '200+ daily visitors',
    icon: <Globe className="h-5 w-5" />
  },
  {
    id: 'high-security',
    label: 'High-Security',
    multiplier: 1.3,
    description: 'Restricted access, controlled environment',
    visitors: 'Controlled access',
    icon: <Shield className="h-5 w-5" />
  },
  {
    id: '24-7',
    label: '24/7 Operations',
    multiplier: 1.5,
    description: 'Round-the-clock operations',
    visitors: 'Continuous activity',
    icon: <Clock className="h-5 w-5" />
  }
];

export const TrafficStep: React.FC<TrafficStepProps> = ({ selected, onSelect, officeType }) => {
  const { isMobile } = useMobileOptimizations();

  // Filter traffic options based on office type
  const getRelevantTrafficOptions = (officeType?: string): TrafficLevel[] => {
    if (!officeType) {
      // If no office type is selected, show all options
      return trafficLevels;
    }

    switch (officeType) {
      case 'small':
        // Small offices: minimal to moderate traffic
        return trafficLevels.filter(level => 
          ['minimal', 'light', 'moderate', 'busy'].includes(level.id)
        );
      case 'medium':
        // Medium offices: light to heavy traffic
        return trafficLevels.filter(level => 
          ['light', 'moderate', 'busy', 'heavy'].includes(level.id)
        );
      case 'large':
        // Large offices: moderate to heavy traffic
        return trafficLevels.filter(level => 
          ['moderate', 'busy', 'heavy', 'public'].includes(level.id)
        );
      case 'corporate':
        // Corporate offices: busy to public-facing
        return trafficLevels.filter(level => 
          ['busy', 'heavy', 'public', 'high-security'].includes(level.id)
        );
      case 'enterprise':
        // Enterprise: heavy to 24/7 operations
        return trafficLevels.filter(level => 
          ['heavy', 'public', 'high-security', '24-7'].includes(level.id)
        );
      case 'retail-office':
        // Retail offices: public-facing focus
        return trafficLevels.filter(level => 
          ['busy', 'heavy', 'public', '24-7'].includes(level.id)
        );
      case 'warehouse-office':
        // Warehouse offices: minimal to busy
        return trafficLevels.filter(level => 
          ['minimal', 'light', 'moderate', 'busy', '24-7'].includes(level.id)
        );
      default:
        return trafficLevels;
    }
  };

  const relevantOptions = getRelevantTrafficOptions(officeType);

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
          isMobile ? "text-xl" : "text-2xl"
        )}>
          How busy is your office?
        </h2>
        <p className={cn(
          "text-muted-foreground",
          isMobile ? "text-sm" : "text-base"
        )}>
          Higher traffic areas need more frequent cleaning and specialized attention
        </p>
      </motion.div>

      {/* Traffic Level Options */}
      <div className={cn(
        "grid gap-4",
        isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
      )}>
        {relevantOptions.map((level, index) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Card
              className={cn(
                "cursor-pointer transition-all duration-300 hover:shadow-lg group",
                selected?.id === level.id
                  ? "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700"
                  : "hover:border-orange-200 dark:hover:border-orange-700"
              )}
              onClick={() => onSelect(level)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                    selected?.id === level.id 
                      ? "bg-orange-500 text-white" 
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/20"
                  )}>
                    {level.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={cn(
                        "font-semibold text-foreground",
                        isMobile ? "text-base" : "text-lg"
                      )}>
                        {level.label}
                      </h3>
                      {selected?.id === level.id && (
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
                    
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "mb-3",
                        selected?.id === level.id 
                          ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" 
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      )}
                    >
                      {level.visitors}
                    </Badge>
                    
                    <p className={cn(
                      "text-muted-foreground",
                      isMobile ? "text-xs" : "text-sm"
                    )}>
                      {level.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </MobileStack>
  );
};
