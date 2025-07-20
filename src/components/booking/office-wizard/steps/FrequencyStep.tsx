
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface FrequencyStepProps {
  selected?: number;
  onSelect: (frequency: number) => void;
  officeSize?: string;
}

const frequencyLabels = {
  1: { label: 'Once a week', description: 'Basic maintenance', icon: <Calendar className="h-4 w-4" /> },
  2: { label: 'Twice a week', description: 'Standard clean', icon: <Calendar className="h-4 w-4" /> },
  3: { label: '3 times a week', description: 'Enhanced clean', icon: <Clock className="h-4 w-4" /> },
  4: { label: '4 times a week', description: 'Premium care', icon: <Clock className="h-4 w-4" /> },
  5: { label: '5 times a week', description: 'Daily weekday', icon: <Sparkles className="h-4 w-4" /> },
  6: { label: '6 times a week', description: 'Near-daily care', icon: <Sparkles className="h-4 w-4" /> },
  7: { label: 'Daily cleaning', description: 'Maximum care', icon: <Sparkles className="h-4 w-4" /> }
};

const getRecommendedFrequency = (officeSize?: string) => {
  switch (officeSize) {
    case 'small': return 2;
    case 'medium': return 3;
    case 'large': return 4;
    case 'enterprise': return 5;
    default: return 2;
  }
};

export const FrequencyStep: React.FC<FrequencyStepProps> = ({ selected, onSelect, officeSize }) => {
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
        <h2 className="text-xl font-semibold text-foreground mb-2">
          How often do you need cleaning?
        </h2>
        <p className="text-muted-foreground">
          We recommend more frequent cleaning for larger or busier offices
        </p>
      </div>

      {/* Current Selection Display */}
      <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <div className="p-2 bg-primary rounded-lg text-primary-foreground">
            {frequencyInfo.icon}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">
              {frequencyInfo.label}
            </h3>
            <p className="text-sm text-muted-foreground">
              {frequencyInfo.description}
            </p>
          </div>
        </div>
        
        {currentFrequency === recommended && (
          <div className="text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Recommended for your office size
            </span>
          </div>
        )}
      </div>

      {/* Frequency Slider */}
      <div className="space-y-4">
        <div className="px-4">
          <Slider
            value={[currentFrequency]}
            onValueChange={(value) => onSelect(value[0])}
            max={7}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
        
        {/* Slider Labels */}
        <div className="flex justify-between text-xs text-muted-foreground px-4">
          <span>Once/week</span>
          <span>Daily</span>
        </div>
      </div>

      {/* Frequency Impact */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="text-lg font-semibold text-foreground">
            {currentFrequency <= 2 ? 'Basic' : currentFrequency <= 4 ? 'Enhanced' : 'Premium'}
          </div>
          <div className="text-xs text-muted-foreground">Service Level</div>
        </div>
        
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="text-lg font-semibold text-foreground">
            {Math.round((7 - currentFrequency) * 10 + 15)}%
          </div>
          <div className="text-xs text-muted-foreground">Cost Savings</div>
        </div>
        
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="text-lg font-semibold text-foreground">
            {currentFrequency * 4}
          </div>
          <div className="text-xs text-muted-foreground">Visits/Month</div>
        </div>
      </div>
    </div>
  );
};
