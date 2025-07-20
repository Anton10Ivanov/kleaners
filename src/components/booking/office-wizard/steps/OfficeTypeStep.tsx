
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
    sqft: 500,
    employees: 5,
    description: 'Up to 500 sqft • Perfect for startups',
    icon: <Building2 className="h-6 w-6" />
  },
  {
    id: 'medium',
    label: 'Medium Office',
    sqft: 1500,
    employees: 20,
    description: '500-2000 sqft • Growing businesses',
    icon: <Users className="h-6 w-6" />
  },
  {
    id: 'large',
    label: 'Large Office',
    sqft: 3500,
    employees: 50,
    description: '2000-5000 sqft • Established companies',
    icon: <MapIcon className="h-6 w-6" />
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    sqft: 8000,
    employees: 100,
    description: '5000+ sqft • Corporate headquarters',
    icon: <Building2 className="h-6 w-6" />
  }
];

export const OfficeTypeStep: React.FC<OfficeTypeStepProps> = ({ selected, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          What's your office setup?
        </h2>
        <p className="text-muted-foreground">
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
            <div className="flex items-start space-x-4">
              <div className={cn(
                "p-3 rounded-lg",
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
                <p className="text-sm text-muted-foreground mb-2">
                  {type.description}
                </p>
                <div className="text-xs text-primary font-medium">
                  ~{type.employees} employees
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
