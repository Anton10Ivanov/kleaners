
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

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
    <div className="space-y-3">
      <Label className="text-base font-semibold text-gray-800 dark:text-gray-100">
        Availability <span className="text-red-500">*</span>
      </Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
        {days.map((day) => (
          <div 
            key={day} 
            className={`flex items-center space-x-2 p-4 rounded-lg border transition-colors cursor-pointer
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
      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
        Select all days when you would be available to work
      </p>
    </div>
  );
};
