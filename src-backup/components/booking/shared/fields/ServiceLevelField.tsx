import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Star, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceLevel {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
  features: string[];
  recommended?: boolean;
}

interface ServiceLevelFieldProps {
  form: UseFormReturn<any>;
  fieldName?: string;
  label?: string;
  serviceLevels?: ServiceLevel[];
}

const defaultServiceLevels: ServiceLevel[] = [
  {
    id: 'basic',
    name: 'Basic Clean',
    description: 'Essential cleaning services',
    priceMultiplier: 1.0,
    features: ['Dusting', 'Vacuuming', 'Bathroom cleaning', 'Kitchen cleaning']
  },
  {
    id: 'standard',
    name: 'Standard Clean',
    description: 'Comprehensive cleaning with extras',
    priceMultiplier: 1.2,
    features: ['All Basic features', 'Appliance cleaning', 'Window cleaning', 'Organizing'],
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium Clean',
    description: 'Deep cleaning with premium services',
    priceMultiplier: 1.5,
    features: ['All Standard features', 'Deep sanitization', 'Furniture cleaning', 'Premium products']
  }
];

export const ServiceLevelField: React.FC<ServiceLevelFieldProps> = ({
  form,
  fieldName = 'serviceLevel',
  label = 'Service Level',
  serviceLevels = defaultServiceLevels
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Star className="h-4 w-4" />
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
                  <p>Choose the level of service that best fits your needs</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </FormLabel>
          <FormControl>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {serviceLevels.map((level) => (
                <Card
                  key={level.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md",
                    field.value === level.id
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => field.onChange(level.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{level.name}</h3>
                      {level.recommended && (
                        <Badge variant="secondary" className="text-xs">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {level.description}
                    </p>
                    
                    <div className="space-y-1">
                      {level.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-sm font-medium">
                        {level.priceMultiplier === 1.0 ? 'Base Price' : `${Math.round((level.priceMultiplier - 1) * 100)}% Extra`}
                      </div>
                    </div>
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
