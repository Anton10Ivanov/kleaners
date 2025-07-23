import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { MobileInput } from '@/components/ui/mobile-input';
import { MobileSelect } from '@/components/ui/mobile-select';
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from '@/components/ui/mobile-card';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MobileButton } from '@/components/ui/mobile-button';
import { CalendarIcon, Droplets, Clock, Shield, Package, MapPin, Home, User, Star } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ServiceType } from '@/schemas/booking';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import ExtrasSelector from '@/components/booking/ExtrasSelector';

interface SharedFieldsProps {
  form: UseFormReturn<any>;
  serviceType: ServiceType;
}

// Mobile-optimized Dirtiness Level Field
export const MobileDirtinessLevelField = ({ form }: { form: UseFormReturn<any> }) => {
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
          <FormLabel className="flex items-center gap-2 text-foreground font-medium">
            <Droplets className="h-4 w-4 text-primary" />
            Dirtiness Level
          </FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className={cn(
                "px-4 py-3 bg-muted/50 rounded-lg border",
                isMobile ? "text-sm" : "text-base"
              )}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">
                    {dirtinessLabels.find(l => l.value === field.value)?.label || 'Select level'}
                  </span>
                  <Badge variant="outline" className="text-primary">
                    {field.value}/5
                  </Badge>
                </div>
                <p className={cn(
                  "text-muted-foreground mt-1",
                  isMobile ? "text-xs" : "text-sm"
                )}>
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

// Mobile-optimized Last Cleaned Field
export const MobileLastCleanedField = ({ form }: { form: UseFormReturn<any> }) => {
  const lastCleanedOptions = [
    { value: '', label: 'Select when last cleaned' },
    { value: 'never', label: 'Never cleaned professionally' },
    { value: 'over-year', label: 'Over a year ago' },
    { value: '6-12-months', label: '6-12 months ago' },
    { value: '3-6-months', label: '3-6 months ago' },
    { value: '1-3-months', label: '1-3 months ago' },
    { value: 'within-month', label: 'Within the last month' },
    { value: 'within-week', label: 'Within the last week' },
  ];

  return (
    <FormField
      control={form.control}
      name="lastCleaned"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-foreground font-medium">
            <Clock className="h-4 w-4 text-primary" />
            Last Cleaned
          </FormLabel>
          <FormControl>
            <MobileSelect {...field}>
              {lastCleanedOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </MobileSelect>
          </FormControl>
          <FormDescription className="text-muted-foreground">
            When was this space last professionally cleaned?
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Mobile-optimized Property Size Field
export const MobilePropertySizeField = ({ 
  form, 
  fieldName = 'propertySize', 
  label = 'Property Size' 
}: { 
  form: UseFormReturn<any>; 
  fieldName?: string;
  label?: string;
}) => {
  const { isMobile } = useMobileOptimizations();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-foreground font-medium">
            <Home className="h-4 w-4 text-primary" />
            {label} (m²)
          </FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className={cn(
                "px-4 py-3 bg-primary/5 rounded-lg border border-primary/20",
                isMobile ? "text-base" : "text-lg"
              )}>
                <div className="font-bold text-primary">
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

// Mobile-optimized Bedrooms Field
export const MobileBedroomsField = ({ form }: { form: UseFormReturn<any> }) => {
  const { isMobile } = useMobileOptimizations();

  return (
    <FormField
      control={form.control}
      name="bedrooms"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-foreground font-medium">
            <Home className="h-4 w-4 text-primary" />
            Bedrooms
          </FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className={cn(
                "px-4 py-3 bg-primary/5 rounded-lg border border-primary/20",
                isMobile ? "text-base" : "text-lg"
              )}>
                <div className="font-bold text-primary">
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

// Mobile-optimized Bathrooms Field
export const MobileBathroomsField = ({ form }: { form: UseFormReturn<any> }) => {
  const { isMobile } = useMobileOptimizations();

  return (
    <FormField
      control={form.control}
      name="bathrooms"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-foreground font-medium">
            <Droplets className="h-4 w-4 text-primary" />
            Bathrooms
          </FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className={cn(
                "px-4 py-3 bg-primary/5 rounded-lg border border-primary/20",
                isMobile ? "text-base" : "text-lg"
              )}>
                <div className="font-bold text-primary">
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

// Mobile-optimized Target Areas Field
export const MobileTargetAreasField = ({ form }: { form: UseFormReturn<any> }) => {
  const { isMobile } = useMobileOptimizations();
  
  const targetAreas = [
    { id: 'bathroom', label: 'Bathroom', description: 'Deep clean all bathroom fixtures', icon: '🚿' },
    { id: 'kitchen', label: 'Kitchen', description: 'Complete kitchen cleaning including appliances', icon: '🍽️' },
    { id: 'living-room', label: 'Living Room', description: 'Full living area cleaning', icon: '🛋️' },
    { id: 'bedrooms', label: 'Bedrooms', description: 'All bedroom spaces', icon: '🛏️' },
    { id: 'whole-place', label: 'Whole Place', description: 'Complete property cleaning', icon: '🏠' },
    { id: 'balcony', label: 'Balcony/Terrace', description: 'Outdoor spaces', icon: '🌿' },
    { id: 'basement', label: 'Basement/Storage', description: 'Storage and basement areas', icon: '📦' }
  ];

  return (
    <FormField
      control={form.control}
      name="targetAreas"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-foreground font-medium">
            <MapPin className="h-4 w-4 text-primary" />
            Target Areas
          </FormLabel>
          <FormControl>
            <div className={cn(
              "grid gap-3",
              isMobile ? "grid-cols-1" : "grid-cols-2"
            )}>
              {targetAreas.map((area) => (
                <div key={area.id} className={cn(
                  "flex items-start space-x-3 p-3 rounded-lg border transition-colors",
                  field.value?.includes(area.id) 
                    ? "bg-primary/5 border-primary/30" 
                    : "bg-muted/30 border-border hover:bg-muted/50"
                )}>
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
                    className="mt-0.5"
                  />
                  <div className="flex-1 space-y-1">
                    <Label 
                      htmlFor={area.id} 
                      className="flex items-center gap-2 text-sm font-medium cursor-pointer text-foreground"
                    >
                      <span>{area.icon}</span>
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
          <FormDescription className="text-muted-foreground">
            Select all areas that require special attention
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Mobile-optimized Pets Field
export const MobilePetsField = ({ form }: { form: UseFormReturn<any> }) => {
  const petsOptions = [
    { value: '', label: 'Select pet situation' },
    { value: 'none', label: 'No pets' },
    { value: 'cats', label: 'Cats only' },
    { value: 'dogs', label: 'Dogs only' },
    { value: 'both', label: 'Both cats and dogs' },
    { value: 'other', label: 'Other pets' },
  ];

  return (
    <FormField
      control={form.control}
      name="pets"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-foreground font-medium">
            <User className="h-4 w-4 text-primary" />
            Pets in Property
          </FormLabel>
          <FormControl>
            <MobileSelect {...field}>
              {petsOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </MobileSelect>
          </FormControl>
          <FormDescription className="text-muted-foreground">
            Pets may require special cleaning considerations
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Mobile-optimized Switch Fields
export const MobileSwitchField = ({ 
  form, 
  name, 
  label, 
  description, 
  icon 
}: { 
  form: UseFormReturn<any>; 
  name: string; 
  label: string; 
  description?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
            <div className="flex items-start space-x-3 flex-1">
              {icon && (
                <div className="mt-0.5 text-primary">
                  {icon}
                </div>
              )}
              <div className="flex-1">
                <FormLabel className="text-sm font-medium text-foreground cursor-pointer">
                  {label}
                </FormLabel>
                {description && (
                  <FormDescription className="text-xs text-muted-foreground">
                    {description}
                  </FormDescription>
                )}
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value || false}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Mobile-optimized Extras Field
export const MobileExtrasField = ({ form, serviceType }: { form: UseFormReturn<any>; serviceType: ServiceType }) => {
  const { isMobile } = useMobileOptimizations();

  return (
    <MobileCard className="bg-primary/5 border-primary/20">
      <MobileCardHeader className={cn(isMobile ? "pb-2" : "pb-3")}>
        <MobileCardTitle className="flex items-center gap-2 text-primary">
          <Star className="h-4 w-4" />
          Additional Services
        </MobileCardTitle>
      </MobileCardHeader>
      <MobileCardContent className={cn(isMobile ? "pt-0" : "pt-0")}>
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
      </MobileCardContent>
    </MobileCard>
  );
};

// Mobile-optimized Postal Code Field
export const MobilePostalCodeField = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <FormField
      control={form.control}
      name="postalCode"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-foreground font-medium">
            <MapPin className="h-4 w-4 text-primary" />
            Postal Code
          </FormLabel>
          <FormControl>
            <MobileInput
              {...field}
              placeholder="Enter your postal code"
              className="text-center font-medium"
            />
          </FormControl>
          <FormDescription className="text-muted-foreground">
            We use this to calculate travel costs and availability
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};