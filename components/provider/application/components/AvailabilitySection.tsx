
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { TooltipIndicator } from './FormSelectionButtons';

interface AvailabilitySectionProps {
  availability: string[];
  toggleAvailability: (value: string) => void;
}

export const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({ 
  availability, 
  toggleAvailability 
}) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  return (
    <div className="form-spacing-normal">
      <div className="flex items-center space-x-1">
        <Label className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Availability
        </Label>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <TooltipIndicator />
              </span>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-primary text-primary-foreground border border-primary/60 p-2 text-sm max-w-xs">
              <p>Select all days when you would be available to work</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
        {days.map((day) => (
          <div 
            key={day} 
            className={`flex items-center space-x-2 card-spacing-sm rounded-lg border transition-colors cursor-pointer
              ${availability.includes(day) 
                ? 'bg-theme-green border-primary dark:bg-theme-green dark:border-primary' 
                : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => toggleAvailability(day)}
          >
            <Checkbox 
              id={`day-${day}`} 
              checked={availability.includes(day)}
              onCheckedChange={() => toggleAvailability(day)}
              className="h-5 w-5"
            />
            <Label 
              htmlFor={`day-${day}`} 
              className="text-sm font-medium cursor-pointer flex-grow"
            >
              {day}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
