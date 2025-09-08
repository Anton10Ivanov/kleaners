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
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import ExtrasSelector from '@/components/booking/ExtrasSelector';

interface ResponsiveSharedFieldsProps {
  form: UseFormReturn<any>;
  serviceType: ServiceType;
  showPets?: boolean;
}

// Responsive Dirtiness Level Field
export const ResponsiveDirtinessLevelField = ({ form }: { form: UseFormReturn<any> }) => {
  const { isMobile } = useMobileOptimizations();
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
            <div className={cn("form-spacing-relaxed", isMobile && "form-spacing-tight")}>
              <div className={cn(
                "px-4 section-spacing-xs bg-gray-50 dark:bg-gray-700 rounded-lg",
                isMobile && "px-2 py-3"
              )}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {dirtinessLabels[field.value - 1]?.label || 'Select Level'}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    Level {field.value}
                  </Badge>
                </div>
                <Slider
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  min={1}
                  max={5}
                  step={1}
                  className="mt-3"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {dirtinessLabels[field.value - 1]?.description}
                </p>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Responsive Target Areas Field
export const ResponsiveTargetAreasField = ({ form }: { form: UseFormReturn<any> }) => {
  const { isMobile } = useMobileOptimizations();
  const targetAreas = [
    { id: 'kitchen', label: 'Kitchen', icon: Package },
    { id: 'bathroom', label: 'Bathroom', icon: Droplets },
    { id: 'living_room', label: 'Living Room', icon: Home },
    { id: 'bedroom', label: 'Bedroom', icon: User },
    { id: 'office', label: 'Office', icon: Clock },
    { id: 'basement', label: 'Basement', icon: MapPin }
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
          <FormDescription>
            Select the areas you want to focus on during cleaning
          </FormDescription>
          <FormControl>
            <div className={cn(
              "grid gap-3",
              isMobile ? "grid-cols-2" : "grid-cols-3"
            )}>
              {targetAreas.map((area) => {
                const Icon = area.icon;
                const isSelected = field.value?.includes(area.id) || false;
                
                return (
                  <div
                    key={area.id}
                    className={cn(
                      "flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => {
                      const currentAreas = field.value || [];
                      const newAreas = isSelected
                        ? currentAreas.filter((areaId: string) => areaId !== area.id)
                        : [...currentAreas, area.id];
                      field.onChange(newAreas);
                    }}
                  >
                    <Checkbox
                      checked={isSelected}
                      onChange={() => {}}
                      className="h-4 w-4"
                    />
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{area.label}</span>
                  </div>
                );
              })}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Responsive Disinfection Required Field
export const ResponsiveDisinfectionRequiredField = ({ form }: { form: UseFormReturn<any> }) => {
  const { isMobile } = useMobileOptimizations();

  return (
    <FormField
      control={form.control}
      name="disinfectionRequired"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-3">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-primary"
              />
            </FormControl>
            <div className="space-y-1">
              <FormLabel className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4" />
                Disinfection Required
              </FormLabel>
              <FormDescription className="text-xs">
                {isMobile 
                  ? "Add disinfection service" 
                  : "Include professional disinfection with your cleaning service"
                }
              </FormDescription>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Responsive Pets Field
export const ResponsivePetsField = ({ form }: { form: UseFormReturn<any> }) => {
  const { isMobile } = useMobileOptimizations();

  return (
    <FormField
      control={form.control}
      name="hasPets"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-3">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-primary"
              />
            </FormControl>
            <div className="space-y-1">
              <FormLabel className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4" />
                Pets in Home
              </FormLabel>
              <FormDescription className="text-xs">
                {isMobile 
                  ? "Pets present" 
                  : "Do you have pets in your home? This helps us prepare appropriately."
                }
              </FormDescription>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Main Responsive Shared Fields Component
export const ResponsiveSharedFields: React.FC<ResponsiveSharedFieldsProps> = ({
  form,
  serviceType,
  showPets = true
}) => {
  const { isMobile } = useMobileOptimizations();

  return (
    <div className={cn("space-y-6", isMobile && "space-y-4")}>
      {/* Dirtiness Level - Used in most services */}
      <ResponsiveDirtinessLevelField form={form} />

      {/* Target Areas - Used in most services */}
      <ResponsiveTargetAreasField form={form} />

      {/* Disinfection - Used in most services */}
      <ResponsiveDisinfectionRequiredField form={form} />

      {/* Pets - Used in residential services */}
      {showPets && (serviceType === 'home-cleaning' || serviceType === 'deep-cleaning') && (
        <ResponsivePetsField form={form} />
      )}

      {/* Extras Selector */}
      <Card className={cn(isMobile && "p-4")}>
        <CardHeader className={cn(isMobile && "pb-3")}>
          <CardTitle className={cn("text-lg", isMobile && "text-base")}>
            Additional Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ExtrasSelector
            selectedExtras={form.watch('extras') || []}
            onExtrasChange={(extras) => form.setValue('extras', extras)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResponsiveSharedFields;
