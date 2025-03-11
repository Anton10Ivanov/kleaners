
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { TooltipIndicator } from './FormSelectionButtons';

interface ExperienceSectionProps {
  experience: string;
  setExperience: (value: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience, setExperience }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Label htmlFor="experience" className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Years of Experience
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <TooltipIndicator />
            </TooltipTrigger>
            <TooltipContent className="bg-primary text-primary-foreground border border-primary/60">
              <p>Tell us about your cleaning experience</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select onValueChange={setExperience} value={experience}>
        <SelectTrigger id="experience" className="w-full">
          <SelectValue placeholder="Select your experience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0-1">0-1 years</SelectItem>
          <SelectItem value="1-3">1-3 years</SelectItem>
          <SelectItem value="3+">3+ years</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
