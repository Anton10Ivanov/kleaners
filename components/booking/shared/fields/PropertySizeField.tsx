'use client'

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Minus, Plus, Home, Info } from 'lucide-react';

interface PropertySizeFieldProps {
  form: UseFormReturn<any>;
  fieldName?: string;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const PropertySizeField: React.FC<PropertySizeFieldProps> = ({
  form,
  fieldName = 'propertySize',
  label = 'Property Size',
  min = 10,
  max = 250,
  step = 10
}) => {
  const handleIncrement = (field: any) => {
    const newValue = Math.min(max, field.value + step);
    field.onChange(newValue);
  };

  const handleDecrement = (field: any) => {
    const newValue = Math.max(min, field.value - step);
    field.onChange(newValue);
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            {label} (m²)
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-primary"
                  >
                    <Info className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the total square meters of your property</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </FormLabel>
          <FormControl>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleDecrement(field)}
                disabled={field.value <= min}
                className="h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                {...field}
                type="number"
                min={min}
                max={max}
                step={step}
                className="text-center"
                onChange={(e) => field.onChange(parseInt(e.target.value) || min)}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleIncrement(field)}
                disabled={field.value >= max}
                className="h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
