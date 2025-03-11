
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { TooltipIndicator } from './FormSelectionButtons';

interface PositionSectionProps {
  position: string;
  setPosition: (value: string) => void;
}

export const PositionSection: React.FC<PositionSectionProps> = ({ position, setPosition }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Label htmlFor="position" className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Position of Interest
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <TooltipIndicator />
            </TooltipTrigger>
            <TooltipContent className="bg-primary text-primary-foreground border border-primary/60">
              <p>Select the position you're most interested in</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select onValueChange={setPosition} value={position}>
        <SelectTrigger id="position" className="w-full">
          <SelectValue placeholder="Select a position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cleaner">Cleaner</SelectItem>
          <SelectItem value="supervisor">Cleaning Supervisor</SelectItem>
          <SelectItem value="customer-service">Customer Service</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
