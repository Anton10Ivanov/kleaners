
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PositionSectionProps {
  position: string;
  setPosition: (value: string) => void;
}

export const PositionSection: React.FC<PositionSectionProps> = ({ position, setPosition }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="position" className="text-base font-semibold text-gray-800 dark:text-gray-100">
        Position of Interest <span className="text-red-500">*</span>
      </Label>
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
