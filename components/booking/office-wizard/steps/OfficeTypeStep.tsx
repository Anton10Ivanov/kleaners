
import React from 'react';
import { Building2, Users, MapIcon, Check, Building, Factory, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { MobileStack } from '@/components/layout/mobile-container';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OfficeType {
  id: string;
  label: string;
  sqft: number;
  employees: number;
  description: string;
  icon: React.ReactNode;
}

interface OfficeTypeStepProps {
  selected?: OfficeType;
  onSelect: (officeType: OfficeType) => void;
}

const officeTypes: OfficeType[] = [
  {
    id: 'small',
    label: 'Small Office',
    sqft: 50,
    employees: 3,
    description: '40-60 m² • 2-4 people • Startups & freelancers',
    icon: <Building2 className="h-5 w-5" />
  },
  {
    id: 'medium',
    label: 'Medium Office',
    sqft: 120,
    employees: 8,
    description: '100-150 m² • 6-10 people • Growing businesses',
    icon: <Users className="h-5 w-5" />
  },
  {
    id: 'large',
    label: 'Large Office',
    sqft: 250,
    employees: 15,
    description: '200-300 m² • 12-18 people • Established companies',
    icon: <MapIcon className="h-5 w-5" />
  },
  {
    id: 'corporate',
    label: 'Corporate Office',
    sqft: 500,
    employees: 25,
    description: '400-600 m² • 20-30 people • Corporate headquarters',
    icon: <Building className="h-5 w-5" />
  },
  {
    id: 'enterprise',
    label: 'Enterprise Complex',
    sqft: 1000,
    employees: 40,
    description: '800-1200 m² • 35-45 people • Large enterprise facilities',
    icon: <Factory className="h-5 w-5" />
  },
  {
    id: 'retail-office',
    label: 'Retail/Showroom',
    sqft: 150,
    employees: 6,
    description: '120-180 m² • 4-8 people • Customer-facing spaces',
    icon: <Store className="h-5 w-5" />
  },
  {
    id: 'warehouse-office',
    label: 'Warehouse Office',
    sqft: 300,
    employees: 12,
    description: '250-350 m² • 8-15 people • Industrial office spaces',
    icon: <Factory className="h-5 w-5" />
  }
];

export const OfficeTypeStep: React.FC<OfficeTypeStepProps> = ({ selected, onSelect }) => {
  const { isMobile } = useMobileOptimizations();

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
          What's your office setup?
        </h2>
        <p className={cn(
          "text-muted-foreground",
          isMobile ? "text-sm" : "text-base"
        )}>
          This helps us understand your cleaning needs and provide accurate pricing
        </p>
      </motion.div>

      {/* Office Type Options */}
      <div className={cn(
        "grid gap-4",
        isMobile 
          ? "grid-cols-1" 
          : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      )}>
        {officeTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Card
              className={cn(
                "cursor-pointer transition-all duration-300 hover:shadow-lg group",
                selected?.id === type.id
                  ? "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700"
                  : "hover:border-orange-200 dark:hover:border-orange-700"
              )}
              onClick={() => onSelect(type)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                    selected?.id === type.id 
                      ? "bg-orange-500 text-white" 
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/20"
                  )}>
                    {type.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={cn(
                        "font-semibold text-foreground",
                        isMobile ? "text-base" : "text-lg"
                      )}>
                        {type.label}
                      </h3>
                      {selected?.id === type.id && (
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
                        selected?.id === type.id 
                          ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" 
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      )}
                    >
                      ~{type.employees} employees
                    </Badge>
                    
                    <p className={cn(
                      "text-muted-foreground",
                      isMobile ? "text-xs" : "text-sm"
                    )}>
                      {type.description}
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
