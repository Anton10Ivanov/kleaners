
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
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Label htmlFor="employment-type" className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Employment Type <span className="text-red-500">*</span>
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <TooltipIndicator />
            </TooltipTrigger>
            <TooltipContent className="bg-primary text-primary-foreground border border-primary/60">
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
