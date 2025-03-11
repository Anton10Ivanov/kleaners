
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ExperienceSectionProps {
  experience: string;
  setExperience: (value: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience, setExperience }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="experience" className="text-base font-semibold text-gray-800 dark:text-gray-100">
        Years of Experience <span className="text-red-500">*</span>
      </Label>
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
