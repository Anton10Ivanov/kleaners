import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Droplets, Clock, Shield, Package, MapPin, Home, User, Star } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ServiceType } from '@/schemas/booking';
import ExtrasSelector from '@/components/booking/ExtrasSelector';

interface SharedFieldsProps {
  form: UseFormReturn<any>;
  serviceType: ServiceType;
}

// Dirtiness Level Field - Used in Home, Deep Cleaning, Move In/Out
export const DirtinessLevelField = ({ form }: { form: UseFormReturn<any> }) => {
  const dirtinessLabels = [
    { value: 1, label: 'Light', description: 'Regular maintenance cleaning' },
    { value: 2, label: 'Moderate', description: 'Some buildup, standard cleaning' },
    { value: 3, label: 'Heavy', description: 'Significant dirt and grime' },
    { value: 4, label: 'Very Heavy', description: 'Extensive cleaning required' },
    { value: 5, label: 'Extreme', description: 'Deep restoration needed' }
  ];

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
            <div className="space-y-4">
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {dirtinessLabels.find(l => l.value === field.value)?.label || 'Select level'}
                  </span>
                  <Badge variant="outline">{field.value}/5</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {dirtinessLabels.find(l => l.value === field.value)?.description}
                </p>
              </div>
              <Slider
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
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

// Enhanced Last Cleaned Field - Standardized for all booking forms (replaces dirtiness level)
export const EnhancedLastCleanedField = ({ form }: { form: UseFormReturn<any> }) => {
  const lastCleanedOptions = [
    { 
      value: 'never', 
      label: 'Never cleaned professionally',
      description: 'This space has never been professionally cleaned',
      severity: 'high'
    },
    { 
      value: 'over-year', 
      label: 'Over a year ago',
      description: 'Last professional cleaning was more than 12 months ago',
      severity: 'high'
    },
    { 
      value: '6-12-months', 
      label: '6-12 months ago',
      description: 'Moderate cleaning needed, some buildup expected',
      severity: 'medium'
    },
    { 
      value: '3-6-months', 
      label: '3-6 months ago',
      description: 'Standard maintenance cleaning required',
      severity: 'medium'
    },
    { 
      value: '1-3-months', 
      label: '1-3 months ago',
      description: 'Light cleaning and touch-ups needed',
      severity: 'low'
    },
    { 
      value: 'within-month', 
      label: 'Within the last month',
      description: 'Recent cleaning, minimal work required',
      severity: 'low'
    },
    { 
      value: 'within-week', 
      label: 'Within the last week',
      description: 'Very recent cleaning, light maintenance only',
      severity: 'very-low'
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'very-low': return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200';
      case 'low': return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200';
      case 'high': return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200';
      default: return 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200';
    }
  };

  return (
    <FormField
      control={form.control}
      name="lastCleaned"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5 text-primary" />
            When was this space last professionally cleaned?
          </FormLabel>
          <FormControl>
            <div className="grid gap-3">
              {lastCleanedOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => field.onChange(option.value)}
                  className={cn(
                    "p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md",
                    field.value === option.value 
                      ? `${getSeverityColor(option.severity)} border-current shadow-sm ring-2 ring-primary/20` 
                      : "border-border bg-card hover:border-primary/30"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                        field.value === option.value 
                          ? "border-primary bg-primary" 
                          : "border-muted-foreground"
                      )}>
                        {field.value === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <h4 className={cn(
                          "font-medium text-base",
                          field.value === option.value ? "text-current" : "text-foreground"
                        )}>
                          {option.label}
                        </h4>
                        <p className={cn(
                          "text-sm mt-1",
                          field.value === option.value ? "text-current opacity-90" : "text-muted-foreground"
                        )}>
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FormControl>
          <FormDescription className="text-sm text-muted-foreground mt-3">
            This helps us determine the appropriate cleaning approach and time required for your space.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Disinfection Required Field - Used in Move In/Out and Deep Cleaning
export const DisinfectionRequiredField = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <FormField
      control={form.control}
      name="disinfectionRequired"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Disinfection Required
            </FormLabel>
          </div>
          <FormDescription>
            Hospital-grade disinfection service for maximum hygiene
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Supplies Provided Field - Used in Home and Office
export const SuppliesProvidedField = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <FormField
      control={form.control}
      name="suppliesProvided"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Supplies Provided
            </FormLabel>
          </div>
          <FormDescription>
            We provide all necessary cleaning supplies and equipment
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Target Areas Field - Used in Deep Cleaning and Move In/Out
export const TargetAreasField = ({ form }: { form: UseFormReturn<any> }) => {
  const targetAreas = [
    { id: 'bathroom', label: 'Bathroom', description: 'Deep clean all bathroom fixtures' },
    { id: 'kitchen', label: 'Kitchen', description: 'Complete kitchen cleaning including appliances' },
    { id: 'living-room', label: 'Living Room', description: 'Full living area cleaning' },
    { id: 'bedrooms', label: 'Bedrooms', description: 'All bedroom spaces' },
    { id: 'whole-place', label: 'Whole Place', description: 'Complete property cleaning' },
    { id: 'balcony', label: 'Balcony/Terrace', description: 'Outdoor spaces' },
    { id: 'basement', label: 'Basement/Storage', description: 'Storage and basement areas' }
  ];

  return (
    <FormField
      control={form.control}
      name="targetAreas"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Target Areas
          </FormLabel>
          <FormControl>
            <div className="grid grid-cols-2 gap-3">
              {targetAreas.map((area) => (
                <div key={area.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={area.id}
                    checked={field.value?.includes(area.id)}
                    onCheckedChange={(checked) => {
                      const current = field.value || [];
                      if (checked) {
                        field.onChange([...current, area.id]);
                      } else {
                        field.onChange(current.filter((id: string) => id !== area.id));
                      }
                    }}
                  />
                  <div className="space-y-1">
                    <Label htmlFor={area.id} className="text-sm font-medium cursor-pointer">
                      {area.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {area.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FormControl>
          <FormDescription>
            Select all areas that require special attention
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Property Size Field - Used in all service types (propertySize for home, squareMeters for others)
export const PropertySizeField = ({ form, fieldName = 'propertySize', label = 'Property Size' }: { 
  form: UseFormReturn<any>; 
  fieldName?: string;
  label?: string;
}) => {
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
              <div className="px-3 py-2 bg-muted rounded-lg">
                <div className="text-lg font-semibold text-primary">
                  {field.value}m²
                </div>
              </div>
              <Slider
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                max={500}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10m²</span>
                <span>500m²</span>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Bedrooms Field - Used in all service types
export const BedroomsField = ({ form }: { form: UseFormReturn<any> }) => {
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
              <div className="px-3 py-2 bg-muted rounded-lg">
                <div className="text-lg font-semibold text-primary">
                  {field.value} {field.value === 1 ? 'bedroom' : 'bedrooms'}
                </div>
              </div>
              <Slider
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                max={10}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Studio</span>
                <span>10+</span>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Bathrooms Field - Used in all service types
export const BathroomsField = ({ form }: { form: UseFormReturn<any> }) => {
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
              <div className="px-3 py-2 bg-muted rounded-lg">
                <div className="text-lg font-semibold text-primary">
                  {field.value} {field.value === 1 ? 'bathroom' : 'bathrooms'}
                </div>
              </div>
              <Slider
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>10+</span>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Compact Cleaning Assessment Field - optimized for space
export const CompactCleaningAssessmentField = ({ form }: { form: UseFormReturn<any> }) => {
  const lastCleanedOptions = [
    { 
      value: 'never', 
      label: 'Never / More than a year',
      severity: 'high',
      icon: '🔴'
    },
    { 
      value: 'six-months', 
      label: '3-6 months ago',
      severity: 'medium',
      icon: '🟡'
    },
    { 
      value: 'within-month', 
      label: 'Within the last month',
      severity: 'low',
      icon: '🟢'
    },
    { 
      value: 'within-week', 
      label: 'Within the last week',
      severity: 'very-low',
      icon: '✅'
    },
  ];

  return (
    <FormField
      control={form.control}
      name="lastCleaned"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            When was this space last professionally cleaned?
          </FormLabel>
          <FormControl>
            <div className="grid grid-cols-2 gap-2">
              {lastCleanedOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => field.onChange(option.value)}
                  className={cn(
                    "p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm text-center",
                    field.value === option.value 
                      ? "ring-2 ring-primary border-primary bg-primary/5" 
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="text-lg mb-1">{option.icon}</div>
                  <div className="text-sm font-medium">{option.label}</div>
                </div>
              ))}
            </div>
          </FormControl>
          <FormDescription className="text-xs text-muted-foreground mt-2">
            This helps us determine the appropriate cleaning approach and time required.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Pets Field - Used in all service types (Yes/No format)
export const PetsField = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <FormField
      control={form.control}
      name="hasPets"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-base font-medium">
            <User className="h-4 w-4" />
            Do you have pets?
          </FormLabel>
          <FormControl>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => field.onChange(true)}
                className={cn(
                  "p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm text-center",
                  field.value === true 
                    ? "ring-2 ring-primary border-primary bg-primary/5" 
                    : "border-border hover:border-primary/30"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 mx-auto mb-2 flex items-center justify-center transition-colors",
                  field.value === true 
                    ? "border-primary bg-primary" 
                    : "border-muted-foreground"
                )}>
                  {field.value === true && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="text-sm font-medium">Yes</div>
              </div>
              <div
                onClick={() => field.onChange(false)}
                className={cn(
                  "p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm text-center",
                  field.value === false 
                    ? "ring-2 ring-primary border-primary bg-primary/5" 
                    : "border-border hover:border-primary/30"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 mx-auto mb-2 flex items-center justify-center transition-colors",
                  field.value === false 
                    ? "border-primary bg-primary" 
                    : "border-muted-foreground"
                )}>
                  {field.value === false && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="text-sm font-medium">No</div>
              </div>
            </div>
          </FormControl>
          <FormDescription className="text-sm text-muted-foreground mt-2">
            Pets may require special cleaning considerations
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Extras Field - Used in all service types
export const ExtrasField = ({ form, serviceType }: { form: UseFormReturn<any>; serviceType: ServiceType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Additional Services
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="extras"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ExtrasSelector
                  serviceType={serviceType}
                  selectedExtras={(field.value || []) as any}
                  onExtrasChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

// Conditional Field Renderer - Updated to use EnhancedLastCleanedField instead of dirtiness level
export const ConditionalFields = ({ form, serviceType }: SharedFieldsProps) => {
  const showDisinfection = ['deep-cleaning', 'move-in-out'].includes(serviceType);
  const showSupplies = ['home', 'office'].includes(serviceType);
  const showTargetAreas = ['deep-cleaning', 'move-in-out'].includes(serviceType);

  return (
    <div className="space-y-6">

      {showTargetAreas && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Focus Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <TargetAreasField form={form} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Property Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PetsField form={form} />
          {showDisinfection && <DisinfectionRequiredField form={form} />}
        </CardContent>
      </Card>
    </div>
  );
};