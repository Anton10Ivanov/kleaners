
import React from 'react';
import { Users, TrendingUp, Building, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

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
}

const trafficLevels: TrafficLevel[] = [
  {
    id: 'low',
    label: 'Light Traffic',
    multiplier: 0.85,
    description: 'Mostly employees, few visitors',
    visitors: '< 20 daily visitors',
    icon: <Users className="h-4 w-4" />
  },
  {
    id: 'medium',
    label: 'Moderate Traffic',
    multiplier: 1.0,
    description: 'Regular client meetings',
    visitors: '20-50 daily visitors',
    icon: <TrendingUp className="h-4 w-4" />
  },
  {
    id: 'high',
    label: 'Heavy Traffic',
    multiplier: 1.25,
    description: 'Busy office with frequent visitors',
    visitors: '50+ daily visitors',
    icon: <Building className="h-4 w-4" />
  },
  {
    id: 'public',
    label: 'Public-Facing',
    multiplier: 1.5,
    description: 'Retail, reception, or showroom',
    visitors: '100+ daily visitors',
    icon: <Globe className="h-4 w-4" />
  }
];

export const TrafficStep: React.FC<TrafficStepProps> = ({ selected, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          How busy is your office?
        </h2>
        <p className="text-muted-foreground">
          Higher traffic areas need more frequent cleaning
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trafficLevels.map((level) => (
          <button
            key={level.id}
            onClick={() => onSelect(level)}
            className={cn(
              "p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md text-left w-full",
              selected?.id === level.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border hover:border-primary/30"
            )}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "p-2 rounded-lg",
                selected?.id === level.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              )}>
                {level.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {level.label}
                </h3>
                <div className="text-xs text-primary font-medium">
                  {level.visitors}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              {level.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
