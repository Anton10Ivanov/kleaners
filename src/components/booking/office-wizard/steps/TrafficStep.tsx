
import React from 'react';
import { Users, TrendingUp, Building, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { MobileStack } from '@/components/layout/mobile-container';

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
    id: 'light',
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
  const { isMobile } = useMobileOptimizations();

  return (
    <MobileStack spacing="lg">
      {/* Header */}
      <div className="text-center">
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
          Higher traffic areas need more frequent cleaning
        </p>
      </div>

      {/* Traffic Level Options */}
      <div className={cn(
        "grid gap-3",
        isMobile ? "grid-cols-1" : "grid-cols-2"
      )}>
        {trafficLevels.map((level) => (
          <button
            key={level.id}
            onClick={() => onSelect(level)}
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-200 text-left w-full touch-manipulation",
              "hover:shadow-lg active:scale-98",
              selected?.id === level.id
                ? "border-primary bg-primary/10 shadow-md ring-2 ring-primary/20"
                : "border-border hover:border-primary/50 bg-card"
            )}
          >
            <div className="flex items-start space-x-3">
              <div className={cn(
                "p-3 rounded-lg flex-shrink-0",
                selected?.id === level.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}>
                {level.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "font-semibold text-foreground mb-1",
                  isMobile ? "text-base" : "text-lg"
                )}>
                  {level.label}
                </h3>
                <div className={cn(
                  "text-primary font-medium mb-2",
                  isMobile ? "text-xs" : "text-sm"
                )}>
                  {level.visitors}
                </div>
                <p className={cn(
                  "text-muted-foreground",
                  isMobile ? "text-xs" : "text-sm"
                )}>
                  {level.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </MobileStack>
  );
};
