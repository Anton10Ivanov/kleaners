
import React from 'react';
import { Building2, Users, MapIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          What's your office setup?
        </h1>
        <p className="text-lg text-muted-foreground">
          This helps us understand your cleaning needs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {officeTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type)}
            className={cn(
              "p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md text-left w-full",
              selected?.id === type.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border hover:border-primary/30"
            )}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "p-2 rounded-lg",
                selected?.id === type.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              )}>
                {type.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {type.label}
                </h3>
                <div className="text-xs text-primary font-medium">
                  ~{type.employees} employees
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              {type.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
