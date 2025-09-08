'use client'

import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Minus, Plus, Home, Droplets, Clock, Star, Percent, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

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
    const newValue = Math.min(250, field.value + 10);
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 card-spacing-none text-muted-foreground hover:text-primary"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-sm">
                    Maximum size is 250 m². For larger properties, please contact us for a custom quote.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </FormLabel>
          <FormControl>
            <div className="form-spacing-normal">
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecrement(field)}
                  disabled={field.value <= 10}
                  className="h-10 w-10 rounded-full card-spacing-none"
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
                  disabled={field.value >= 250}
                  className="h-10 w-10 rounded-full card-spacing-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground px-2">
                <span>Min: 10m²</span>
                <span>Max: 250m²</span>
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
            <div className="form-spacing-normal">
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecrement(field)}
                  disabled={field.value <= 0}
                  className="h-10 w-10 rounded-full card-spacing-none"
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
                  className="h-10 w-10 rounded-full card-spacing-none"
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
            <div className="form-spacing-normal">
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecrement(field)}
                  disabled={field.value <= 1}
                  className="h-10 w-10 rounded-full card-spacing-none"
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
                  className="h-10 w-10 rounded-full card-spacing-none"
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
            <div className="form-spacing-normal">
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecrement(field)}
                  disabled={field.value <= 1}
                  className="h-10 w-10 rounded-full card-spacing-none"
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
                  className="h-10 w-10 rounded-full card-spacing-none"
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
                  <CardContent className="card-spacing-xs text-center">
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

// Cleaning Pace Slider with 3 speed options
export const WebFriendlyCleaningPaceField = ({ form }: WebFriendlyFieldsProps) => {
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const cleaningPaceValue = form.watch('cleaningPaceValue') || 1.0;

  const speedOptions = [
    { value: 0.5, label: '0.5x', color: 'text-blue-600', bgColor: 'bg-blue-50 border-blue-200' },
    { value: 1.0, label: '1x', color: 'text-gray-600', bgColor: 'bg-gray-50 border-gray-200' },
    { value: 1.5, label: '1.5x', color: 'text-red-600', bgColor: 'bg-red-50 border-red-200' }
  ];

  const getSpeedDescription = (value: number) => {
    switch (value) {
      case 0.5:
        return "Thorough & detailed cleaning. Perfect for regularly maintained homes where attention to detail is above price. The cleaner may not cover the entire space but will focus on quality.";
      case 1.5:
        return "Quick refresh cleaning. Ideal for places that were not regularly cleaned and need to be refreshed. Affects detail quality but covers more square meters.";
      default:
        return "Standard pace cleaning. Balanced approach between coverage and detail quality.";
    }
  };

  return (
    <FormField
      control={form.control}
      name="cleaningPaceValue"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Cleaning Pace/Speed
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 card-spacing-none text-muted-foreground hover:text-primary"
              onClick={() => setShowInfoPopup(true)}
            >
              <Info className="h-4 w-4" />
            </Button>
          </FormLabel>
          <FormControl>
            <div className="form-spacing-relaxed">
              <div className="grid grid-cols-3 gap-2">
                {speedOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
                      field.value === option.value 
                        ? `ring-2 ring-primary ${option.bgColor}` 
                        : 'hover:border-primary/50'
                    )}
                    onClick={() => field.onChange(option.value)}
                  >
                    <CardContent className="card-spacing-xs text-center">
                      <div className={cn("font-bold text-lg", option.color)}>
                        {option.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {option.value === 0.5 && "Detailed"}
                        {option.value === 1.0 && "Standard"}
                        {option.value === 1.5 && "Quick"}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="card-spacing-xs bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {getSpeedDescription(field.value)}
                </p>
              </div>
            </div>
          </FormControl>
          <FormMessage />

          {/* Info Popup Dialog */}
          <Dialog open={showInfoPopup} onOpenChange={setShowInfoPopup}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Cleaning Pace Guide
                </DialogTitle>
              </DialogHeader>
              <div className="form-spacing-relaxed">
                <div className="form-spacing-normal">
                  <div className="card-spacing-xs bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="font-medium text-blue-800 mb-1">0.5x Speed (Detailed)</div>
                    <p className="text-sm text-blue-700">
                      More thorough cleaning but the cleaner may not be able to cover the whole place. 
                      Best for regularly maintained homes where attention to detail is above price.
                    </p>
                  </div>
                  
                  <div className="card-spacing-xs bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="font-medium text-gray-800 mb-1">1x Speed (Standard)</div>
                    <p className="text-sm text-gray-700">
                      Balanced approach between coverage and attention to detail. 
                      Standard cleaning pace with good coverage and quality.
                    </p>
                  </div>
                  
                  <div className="card-spacing-xs bg-red-50 border border-red-200 rounded-lg">
                    <div className="font-medium text-red-800 mb-1">1.5x Speed (Quick)</div>
                    <p className="text-sm text-red-700">
                      Faster cleaning affects square meter coverage but reduces detail quality. 
                      Suited for places which were not regularly cleaned and need to be refreshed.
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </FormItem>
      )}
    />
  );
};