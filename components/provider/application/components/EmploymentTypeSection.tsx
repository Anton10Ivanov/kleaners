
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { TooltipIndicator } from './FormSelectionButtons';

interface EmploymentTypeSectionProps {
  selectedEmploymentType: string;
  handleEmploymentTypeChange: (value: string) => void;
}

export const EmploymentTypeSection: React.FC<EmploymentTypeSectionProps> = ({ 
  selectedEmploymentType, 
  handleEmploymentTypeChange 
}) => {
  return (
    <div className="form-spacing-normal">
      <div className="flex items-center space-x-1">
        <Label htmlFor="employment-type" className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Employment Type
        </Label>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <TooltipIndicator />
              </span>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-primary text-primary-foreground border border-primary/60 p-2 text-sm max-w-xs">
              <p>Select the type of employment you are looking for</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Select 
        value={selectedEmploymentType} 
        onValueChange={handleEmploymentTypeChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select employment type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="vollzeit">Vollzeit (Full-time)</SelectItem>
          <SelectItem value="midijob">Midijob (Part-time)</SelectItem>
          <SelectItem value="minijob">Minijob (Mini job)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
