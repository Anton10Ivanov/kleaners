
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PropertySizeFieldProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  className?: string;
}

export const PropertySizeField = ({ 
  value, 
  onChange, 
  label = "Property Size (m²)",
  className = ""
}: PropertySizeFieldProps) => {
  const incrementSize = () => {
    onChange(Math.min(value + 5, 200));
  };

  const decrementSize = () => {
    onChange(Math.max(value - 5, 20));
  };

  return (
    <div className={`form-spacing-normal ${className}`}>
      <Label className="text-base font-semibold text-gray-900">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={decrementSize}
          className="h-12 w-12 rounded-lg border-2 border-gray-200 hover:border-primary"
        >
          -
        </Button>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-12 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-center text-base font-medium flex-1"
          min="20"
          max="200"
          step="5"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={incrementSize}
          className="h-12 w-12 rounded-lg border-2 border-gray-200 hover:border-primary"
        >
          +
        </Button>
      </div>
      <p className="text-xs text-gray-500 text-center">
        Typical apartment: 60-80m² • House: 100-150m²
      </p>
    </div>
  );
};
