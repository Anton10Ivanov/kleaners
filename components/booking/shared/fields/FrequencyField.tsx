'use client'

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Clock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FrequencyOption {
  id: string;
  name: string;
  description: string;
  value: number;
  discount?: number;
  popular?: boolean;
}

interface FrequencyFieldProps {
  form: UseFormReturn<any>;
  fieldName?: string;
  label?: string;
  frequencies?: FrequencyOption[];
}

const defaultFrequencies: FrequencyOption[] = [
  {
    id: 'one-time',
    name: 'One-time',
    description: 'Single cleaning service',
    value: 1
  },
  {
    id: 'weekly',
    name: 'Weekly',
    description: 'Every week',
    value: 4,
    discount: 10,
    popular: true
  },
  {
    id: 'biweekly',
    name: 'Bi-weekly',
    description: 'Every 2 weeks',
    value: 2,
    discount: 5
  },
  {
    id: 'monthly',
    name: 'Monthly',
    description: 'Once a month',
    value: 1
  }
];

export const FrequencyField: React.FC<FrequencyFieldProps> = ({
  form,
  fieldName = 'frequency',
  label = 'Cleaning Frequency',
  frequencies = defaultFrequencies
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {label}
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
                  <p>How often would you like cleaning services?</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </FormLabel>
          <FormControl>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {frequencies.map((frequency) => (
                <Card
                  key={frequency.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md",
                    field.value === frequency.id
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => field.onChange(frequency.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">{frequency.name}</h3>
                      {frequency.popular && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {frequency.description}
                    </p>
                    
                    {frequency.discount && (
                      <div className="text-xs text-green-600 font-medium">
                        {frequency.discount}% discount
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
