
import React from 'react';
import { Building2, Users, MapIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { MobileStack } from '@/components/layout/mobile-container';

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
    sqft: 46,
    employees: 5,
    description: 'Up to 50 m² • Perfect for startups',
    icon: <Building2 className="h-4 w-4" />
  },
  {
    id: 'medium',
    label: 'Medium Office',
    sqft: 140,
    employees: 20,
    description: '50-185 m² • Growing businesses',
    icon: <Users className="h-4 w-4" />
  },
  {
    id: 'large',
    label: 'Large Office',
    sqft: 325,
    employees: 50,
    description: '185-465 m² • Established companies',
    icon: <MapIcon className="h-4 w-4" />
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    sqft: 745,
    employees: 100,
    description: '465+ m² • Corporate headquarters',
    icon: <Building2 className="h-4 w-4" />
  }
];

export const OfficeTypeStep: React.FC<OfficeTypeStepProps> = ({ selected, onSelect }) => {
  const { isMobile } = useMobileOptimizations();

  return (
    <MobileStack spacing="lg">
      {/* Header */}
      <div className="text-center">
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
          This helps us understand your cleaning needs
        </p>
      </div>

      {/* Office Type Options */}
      <div className={cn(
        "grid gap-3",
        isMobile ? "grid-cols-1" : "grid-cols-2"
      )}>
        {officeTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type)}
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-200 text-left w-full touch-manipulation",
              "hover:shadow-lg active:scale-98",
              selected?.id === type.id
                ? "border-primary bg-primary/10 shadow-md ring-2 ring-primary/20"
                : "border-border hover:border-primary/50 bg-card"
            )}
          >
            <div className="flex items-start space-x-3">
              <div className={cn(
                "p-3 rounded-lg flex-shrink-0",
                selected?.id === type.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}>
                {type.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "font-semibold text-foreground mb-1",
                  isMobile ? "text-base" : "text-lg"
                )}>
                  {type.label}
                </h3>
                <div className={cn(
                  "text-primary font-medium mb-2",
                  isMobile ? "text-xs" : "text-sm"
                )}>
                  ~{type.employees} employees
                </div>
                <p className={cn(
                  "text-muted-foreground",
                  isMobile ? "text-xs" : "text-sm"
                )}>
                  {type.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </MobileStack>
  );
};
