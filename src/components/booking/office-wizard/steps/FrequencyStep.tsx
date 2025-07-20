
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface FrequencyStepProps {
  selected?: number;
  onSelect: (frequency: number) => void;
  officeSize?: string;
  traffic?: string;
}

const frequencyLabels = {
  0.25: { label: 'Once a month', description: 'Minimal maintenance', icon: <Calendar className="h-4 w-4" /> },
  1: { label: 'Once a week', description: 'Basic maintenance', icon: <Calendar className="h-4 w-4" /> },
  0.5: { label: 'Twice a month', description: 'Light maintenance', icon: <Calendar className="h-4 w-4" /> },
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

export const FrequencyStep: React.FC<FrequencyStepProps> = ({ selected, onSelect, officeSize, traffic }) => {
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
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          How often do you need cleaning?
        </h1>
        <p className="text-lg text-muted-foreground">
          {isSmallLightOffice 
            ? 'Perfect! We have special packages for smaller offices with light traffic'
            : 'We recommend more frequent cleaning for larger or busier offices'
          }
        </p>
      </div>


      {/* Frequency Options */}
      <div className={`grid gap-4 ${isSmallLightOffice ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-2'}`}>
        {frequencyOptions.map((freq) => {
          const option = frequencyLabels[freq as keyof typeof frequencyLabels];
          const isSelected = currentFrequency === freq;
          const isRecommended = freq === recommended;
          
          return (
            <button
              key={freq}
              onClick={() => onSelect(freq)}
              className={`p-4 rounded-xl border-2 transition-all ${
                isSelected 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {option.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">
                    {option.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {option.description}
                  </div>
                </div>
              </div>
              {isRecommended && (
                <div className="text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Recommended
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Frequency Impact */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="text-lg font-semibold text-foreground">
            {currentFrequency <= 1 ? 'Basic' : currentFrequency <= 2 ? 'Standard' : currentFrequency <= 3 ? 'Enhanced' : 'Premium'}
          </div>
          <div className="text-xs text-muted-foreground">Service Level</div>
        </div>
        
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="text-lg font-semibold text-foreground">
            {currentFrequency === 1 ? 4 : currentFrequency === 2 ? 8 : currentFrequency === 3 ? 12 : 20}
          </div>
          <div className="text-xs text-muted-foreground">Visits/Month</div>
        </div>
      </div>
    </div>
  );
};
