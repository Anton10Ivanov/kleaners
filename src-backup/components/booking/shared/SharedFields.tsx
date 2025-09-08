import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Droplets, Shield, Package, MapPin, Home, User, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ServiceType } from '@/schemas/booking';

// Conditional Fields Component
export const ConditionalFields = ({ form, serviceType }: { form: UseFormReturn<any>; serviceType: ServiceType }) => {
  return (
    <div className="space-y-4">
      {/* This component can be customized based on service type */}
      <div className="text-sm text-muted-foreground">
        Conditional fields for {serviceType}
      </div>
    </div>
  );
};

// Disinfection Required Field
export const DisinfectionRequiredField = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <FormField
      control={form.control}
      name="disinfectionRequired"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Disinfection Required
            </FormLabel>
            <FormDescription>
              Add disinfection services for extra protection
            </FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

// Target Areas Field
export const TargetAreasField = ({ form }: { form: UseFormReturn<any> }) => {
  const targetAreas = [
    'Kitchen', 'Bathroom', 'Living Room', 'Bedroom', 'Dining Room',
    'Office', 'Basement', 'Garage', 'Windows', 'Carpets'
  ];

  return (
    <FormField
      control={form.control}
      name="targetAreas"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Target Areas
          </FormLabel>
          <FormDescription>
            Select the areas you want cleaned
          </FormDescription>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {targetAreas.map((area) => (
              <div key={area} className="flex items-center space-x-2">
                <Checkbox
                  id={area}
                  checked={field.value?.includes(area) || false}
                  onCheckedChange={(checked) => {
                    const currentAreas = field.value || [];
                    if (checked) {
                      field.onChange([...currentAreas, area]);
                    } else {
                      field.onChange(currentAreas.filter((item: string) => item !== area));
                    }
                  }}
                />
                <Label htmlFor={area} className="text-sm">
                  {area}
                </Label>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Pets Field
export const PetsField = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <FormField
      control={form.control}
      name="hasPets"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base flex items-center gap-2">
              <Package className="h-4 w-4" />
              Pets in Home
            </FormLabel>
            <FormDescription>
              Do you have pets that we should be aware of?
            </FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

// Dirtiness Level Field
export const DirtinessLevelField = ({ form }: { form: UseFormReturn<any> }) => {
  const dirtinessLevels = [
    { value: 1, label: 'Light (Regular cleaning)', description: 'Minimal dirt and dust' },
    { value: 2, label: 'Moderate (Standard cleaning)', description: 'Normal household dirt' },
    { value: 3, label: 'Heavy (Deep cleaning)', description: 'Significant dirt and grime' },
    { value: 4, label: 'Very Heavy (Intensive cleaning)', description: 'Extreme dirt and buildup' },
    { value: 5, label: 'Extreme (Specialized cleaning)', description: 'Hazardous or special conditions' }
  ];

  return (
    <FormField
      control={form.control}
      name="dirtinessLevel"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            Dirtiness Level
          </FormLabel>
          <FormDescription>
            How dirty are the areas that need cleaning?
          </FormDescription>
          <div className="space-y-2 mt-2">
            {dirtinessLevels.map((level) => (
              <div key={level.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`dirtiness-${level.value}`}
                  value={level.value}
                  checked={field.value === level.value}
                  onChange={() => field.onChange(level.value)}
                  className="h-4 w-4"
                />
                <Label htmlFor={`dirtiness-${level.value}`} className="text-sm">
                  {level.label}
                </Label>
                <Badge variant="outline" className="text-xs">
                  {level.description}
                </Badge>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Main Shared Fields Component
export const SharedFields = ({ form, serviceType }: { form: UseFormReturn<any>; serviceType: ServiceType }) => {
  return (
    <div className="space-y-6">
      {/* Dirtiness Level */}
      <DirtinessLevelField form={form} />
      
      {/* Target Areas */}
      <TargetAreasField form={form} />
      
      {/* Disinfection Required */}
      <DisinfectionRequiredField form={form} />
      
      {/* Pets - Only for residential services */}
      {(serviceType === 'home-cleaning' || serviceType === 'deep-cleaning') && (
        <PetsField form={form} />
      )}
    </div>
  );
};

export default SharedFields;
