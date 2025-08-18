import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Home, Droplets, Clock, Star, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WebFriendlyFieldsProps {
  form: UseFormReturn<any>;
}

// Property Size Field with +/- controls
export const WebFriendlyPropertySizeField = ({ form, fieldName = 'propertySize', label = 'Property Size' }: { 
  form: UseFormReturn<any>; 
  fieldName?: string;
  label?: string;
}) => {
  const handleIncrement = (field: any) => {
    const newValue = Math.min(500, field.value + 10);
    field.onChange(newValue);
  };

  const handleDecrement = (field: any) => {
    const newValue = Math.max(10, field.value - 10);
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
          </FormLabel>
          <FormControl>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecrement(field)}
                  disabled={field.value <= 10}
                  className="h-10 w-10 rounded-full p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 px-4 py-3 bg-muted rounded-lg text-center">
                  <div className="text-lg font-semibold text-primary">
                    {field.value}m²
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncrement(field)}
                  disabled={field.value >= 500}
                  className="h-10 w-10 rounded-full p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground px-2">
                <span>Min: 10m²</span>
                <span>Max: 500m²</span>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Bedrooms Field with +/- controls (limited to 5)
export const WebFriendlyBedroomsField = ({ form }: WebFriendlyFieldsProps) => {
  const handleIncrement = (field: any) => {
    const newValue = Math.min(5, field.value + 1);
    field.onChange(newValue);
  };

  const handleDecrement = (field: any) => {
    const newValue = Math.max(0, field.value - 1);
    field.onChange(newValue);
  };

  return (
    <FormField
      control={form.control}
      name="bedrooms"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Bedrooms
          </FormLabel>
          <FormControl>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecrement(field)}
                  disabled={field.value <= 0}
                  className="h-10 w-10 rounded-full p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 px-4 py-3 bg-muted rounded-lg text-center">
                  <div className="text-lg font-semibold text-primary">
                    {field.value === 0 ? 'Studio' : `${field.value} ${field.value === 1 ? 'bedroom' : 'bedrooms'}`}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncrement(field)}
                  disabled={field.value >= 5}
                  className="h-10 w-10 rounded-full p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground px-2">
                <span>Studio</span>
                <span>Max: 5</span>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Bathrooms Field with +/- controls (limited to 5)
export const WebFriendlyBathroomsField = ({ form }: WebFriendlyFieldsProps) => {
  const handleIncrement = (field: any) => {
    const newValue = Math.min(5, field.value + 1);
    field.onChange(newValue);
  };

  const handleDecrement = (field: any) => {
    const newValue = Math.max(1, field.value - 1);
    field.onChange(newValue);
  };

  return (
    <FormField
      control={form.control}
      name="bathrooms"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            Bathrooms
          </FormLabel>
          <FormControl>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecrement(field)}
                  disabled={field.value <= 1}
                  className="h-10 w-10 rounded-full p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 px-4 py-3 bg-muted rounded-lg text-center">
                  <div className="text-lg font-semibold text-primary">
                    {field.value} {field.value === 1 ? 'bathroom' : 'bathrooms'}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncrement(field)}
                  disabled={field.value >= 5}
                  className="h-10 w-10 rounded-full p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground px-2">
                <span>Min: 1</span>
                <span>Max: 5</span>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Dirtiness Level with +/- controls
export const WebFriendlyDirtinessLevelField = ({ form }: WebFriendlyFieldsProps) => {
  const dirtinessLabels = [
    { value: 1, label: 'Light', description: 'Regular maintenance cleaning' },
    { value: 2, label: 'Moderate', description: 'Some buildup, standard cleaning' },
    { value: 3, label: 'Heavy', description: 'Significant dirt and grime' },
    { value: 4, label: 'Very Heavy', description: 'Extensive cleaning required' },
    { value: 5, label: 'Extreme', description: 'Deep restoration needed' }
  ];

  const handleIncrement = (field: any) => {
    const newValue = Math.min(5, field.value + 1);
    field.onChange(newValue);
  };

  const handleDecrement = (field: any) => {
    const newValue = Math.max(1, field.value - 1);
    field.onChange(newValue);
  };

  return (
    <FormField
      control={form.control}
      name="dirtinessLevel"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            Dirtiness Level
          </FormLabel>
          <FormControl>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecrement(field)}
                  disabled={field.value <= 1}
                  className="h-10 w-10 rounded-full p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 px-4 py-3 bg-muted rounded-lg text-center">
                  <div className="text-lg font-semibold text-primary">
                    {dirtinessLabels.find(l => l.value === field.value)?.label}
                  </div>
                  <Badge variant="outline" className="mt-1">{field.value}/5</Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {dirtinessLabels.find(l => l.value === field.value)?.description}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleIncrement(field)}
                  disabled={field.value >= 5}
                  className="h-10 w-10 rounded-full p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground px-2">
                <span>Light</span>
                <span>Extreme</span>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Frequency Selector with discount boxes
export const WebFriendlyFrequencyField = ({ form }: WebFriendlyFieldsProps) => {
  const frequencyOptions = [
    { value: 'one-time', label: 'One-time', discount: 0, description: 'Single cleaning session' },
    { value: 'weekly', label: 'Weekly', discount: 15, description: 'Every week' },
    { value: 'bi-weekly', label: 'Bi-weekly', discount: 10, description: 'Every 2 weeks' },
    { value: 'monthly', label: 'Monthly', discount: 5, description: 'Once a month' }
  ];

  return (
    <FormField
      control={form.control}
      name="frequency"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Cleaning Frequency
          </FormLabel>
          <FormControl>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {frequencyOptions.map((option) => (
                <Card
                  key={option.value}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md relative",
                    field.value === option.value ? 'ring-2 ring-primary border-primary bg-primary/5' : ''
                  )}
                  onClick={() => field.onChange(option.value)}
                >
                  <CardContent className="p-3 text-center">
                    {option.discount > 0 && (
                      <div className="absolute -top-2 -right-2">
                        <Badge variant="destructive" className="text-xs">
                          <Percent className="h-3 w-3 mr-1" />
                          -{option.discount}%
                        </Badge>
                      </div>
                    )}
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
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

// Cleaning Pace Toggle
export const WebFriendlyCleaningPaceField = ({ form }: WebFriendlyFieldsProps) => {
  return (
    <FormField
      control={form.control}
      name="cleaningPace"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Cleaning Pace
          </FormLabel>
          <FormControl>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <span className={cn(
                "text-sm font-medium transition-colors",
                field.value === 'standard' ? 'text-primary' : 'text-muted-foreground'
              )}>
                Standard
              </span>
              <Switch
                checked={field.value === 'quick'}
                onCheckedChange={(checked) => field.onChange(checked ? 'quick' : 'standard')}
              />
              <span className={cn(
                "text-sm font-medium transition-colors",
                field.value === 'quick' ? 'text-primary' : 'text-muted-foreground'
              )}>
                Quick
              </span>
            </div>
          </FormControl>
          <FormDescription>
            {field.value === 'quick' 
              ? 'Faster cleaning with focus on essential areas' 
              : 'Thorough cleaning with attention to detail'
            }
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};