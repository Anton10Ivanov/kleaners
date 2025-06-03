
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clock, Minus, Plus } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';

interface SimpleDurationInputProps {
  form: UseFormReturn<BookingFormData>;
}

const SimpleDurationInput = ({ form }: SimpleDurationInputProps) => {
  const hours = form.watch('hours') || 2;

  const handleHoursChange = (newHours: number) => {
    const adjustedHours = Math.max(2, Math.min(8, newHours)); // Min 2, Max 8
    form.setValue('hours', adjustedHours);
  };

  const incrementHours = () => {
    handleHoursChange(hours + 0.5);
  };

  const decrementHours = () => {
    handleHoursChange(hours - 0.5);
  };

  const getRecommendation = (duration: number) => {
    if (duration <= 2.5) return { text: "Quick clean", color: "text-blue-600" };
    if (duration <= 4) return { text: "Standard clean", color: "text-green-600" };
    if (duration <= 6) return { text: "Deep clean", color: "text-orange-600" };
    return { text: "Extensive clean", color: "text-purple-600" };
  };

  const recommendation = getRecommendation(hours);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Clock className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Duration
          </h4>
          <p className="text-sm text-gray-500">Select cleaning time (minimum 2 hours)</p>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Hours needed
        </Label>
        
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={decrementHours}
            disabled={hours <= 2}
            className="h-12 w-12 p-0"
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 max-w-24">
            <Input
              type="number"
              value={hours}
              onChange={(e) => handleHoursChange(Number(e.target.value))}
              className="h-12 text-center text-lg font-semibold"
              min="2"
              max="8"
              step="0.5"
            />
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={incrementHours}
            disabled={hours >= 8}
            className="h-12 w-12 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
          
          <div className="text-sm text-gray-500 ml-2">
            hours
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`text-sm font-medium ${recommendation.color}`}>
            {recommendation.text}
          </div>
          <div className="text-xs text-gray-500">
            • €{hours * 30}/session
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDurationInput;
