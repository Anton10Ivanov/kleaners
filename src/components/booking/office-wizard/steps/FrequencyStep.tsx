
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { MobileStack } from '@/components/layout/mobile-container';
import { Badge } from '@/components/ui/badge';

interface FrequencyStepProps {
  selected?: number;
  onSelect: (frequency: number) => void;
  officeSize?: string;
  traffic?: string;
}

const frequencyLabels = {
  0.25: { label: 'Once a month', description: 'Minimal maintenance', icon: <Calendar className="h-4 w-4" /> },
  0.5: { label: 'Twice a month', description: 'Light maintenance', icon: <Calendar className="h-4 w-4" /> },
  1: { label: 'Once a week', description: 'Basic maintenance', icon: <Calendar className="h-4 w-4" /> },
  2: { label: 'Twice a week', description: 'Standard clean', icon: <Calendar className="h-4 w-4" /> },
  3: { label: '3 times a week', description: 'Enhanced clean', icon: <Clock className="h-4 w-4" /> },
  5: { label: 'Daily weekdays +', description: '5+ times weekly, up to 25 visits/month', icon: <Sparkles className="h-4 w-4" /> }
};

const getRecommendedFrequency = (officeSize?: string) => {
  switch (officeSize) {
    case 'small': return 1;
    case 'medium': return 2;
    case 'large': return 3;
    case 'enterprise': return 5;
    default: return 2;
  }
};

// Calculate visits per month based on frequency
const getVisitsPerMonth = (frequency: number): number => {
  if (frequency === 0.25) return 1;
  if (frequency === 0.5) return 2;
  if (frequency === 1) return 4;
  if (frequency === 2) return 8;
  if (frequency === 3) return 12;
  if (frequency === 5) return 20;
  return Math.round(frequency * 4.33);
};

// Get service level name based on frequency
const getServiceLevel = (frequency: number): string => {
  if (frequency <= 0.5) return 'Smart';
  if (frequency <= 1) return 'Comfort';
  if (frequency <= 3) return 'Premium';
  return 'Royal';
};

export const FrequencyStep: React.FC<FrequencyStepProps> = ({ selected, onSelect, officeSize, traffic }) => {
  const { isMobile } = useMobileOptimizations();
  
  // Special case for small office + light traffic
  const isSmallLightOffice = officeSize === 'small' && traffic === 'light';
  const frequencyOptions = isSmallLightOffice ? [0.25, 0.5, 1] : [1, 2, 3, 5];
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
      <div className="text-center">
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
          {isSmallLightOffice 
            ? 'Perfect! We have special packages for smaller offices with light traffic'
            : 'We recommend more frequent cleaning for larger or busier offices'
          }
        </p>
      </div>

      {/* Frequency Options */}
      <div className={cn(
        "grid gap-3",
        isSmallLightOffice 
          ? "grid-cols-1 max-w-md mx-auto" 
          : isMobile 
            ? "grid-cols-1" 
            : "grid-cols-2"
      )}>
        {frequencyOptions.map((freq) => {
          const option = frequencyLabels[freq as keyof typeof frequencyLabels];
          const isSelected = currentFrequency === freq;
          const isRecommended = freq === recommended;
          
          return (
            <button
              key={freq}
              onClick={() => onSelect(freq)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200 text-left w-full touch-manipulation",
                "hover:shadow-lg active:scale-98",
                isSelected 
                  ? "border-primary bg-primary/10 shadow-md ring-2 ring-primary/20" 
                  : "border-border hover:border-primary/50 bg-card"
              )}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className={cn(
                  "p-3 rounded-lg flex-shrink-0",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "font-semibold text-foreground mb-1",
                    isMobile ? "text-base" : "text-lg"
                  )}>
                    {option.label}
                  </div>
                  <div className={cn(
                    "text-muted-foreground",
                    isMobile ? "text-xs" : "text-sm"
                  )}>
                    {option.description}
                  </div>
                </div>
              </div>
              {isRecommended && (
                <div className="flex justify-center">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Recommended
                  </Badge>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Frequency Impact */}
      <div className={cn(
        "grid gap-3",
        isMobile ? "grid-cols-2" : "grid-cols-2 max-w-md mx-auto"
      )}>
        <div className="p-4 rounded-lg bg-muted/50 border text-center">
          <div className={cn(
            "font-bold text-primary mb-1",
            isMobile ? "text-lg" : "text-xl"
          )}>
            {getServiceLevel(currentFrequency)}
          </div>
          <div className={cn(
            "text-muted-foreground",
            isMobile ? "text-xs" : "text-sm"
          )}>
            Service Level
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-muted/50 border text-center">
          <div className={cn(
            "font-bold text-primary mb-1",
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
        </div>
      </div>
    </MobileStack>
  );
};
