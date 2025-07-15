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

// Last Cleaned Field - Used in all service types
export const LastCleanedField = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <FormField
      control={form.control}
      name="lastCleaned"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Last Cleaned
          </FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormDescription>
            When was this space last professionally cleaned?
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
            <div className="space-y-4">
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-primary">
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
              <div className="flex justify-between text-sm text-gray-500">
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
          <FormLabel>Bedrooms</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={0}
              max={10}
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
            />
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
          <FormLabel>Bathrooms</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={1}
              max={10}
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Hours Selection Field - Used in Home and can be reused
export const HoursSelectionField = ({ form, onSuggestedTimeSelect }: { 
  form: UseFormReturn<any>;
  onSuggestedTimeSelect?: (hours: number) => void;
}) => {
  const suggestedHours = [2, 3, 4, 5, 6];

  return (
    <FormField
      control={form.control}
      name="hours"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Estimated Hours
          </FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {field.value} hours
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedHours.map((hours) => (
                  <Button
                    key={hours}
                    type="button"
                    variant={field.value === hours ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      field.onChange(hours);
                      onSuggestedTimeSelect?.(hours);
                    }}
                  >
                    {hours}h
                  </Button>
                ))}
              </div>
              <Slider
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                max={12}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Residents Field - Used in Home cleaning
export const ResidentsField = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <FormField
      control={form.control}
      name="numResidents"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Number of Residents
          </FormLabel>
          <FormControl>
            <Input
              type="number"
              min={1}
              max={20}
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
            />
          </FormControl>
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

// Conditional Field Renderer
export const ConditionalFields = ({ form, serviceType }: SharedFieldsProps) => {
  const showDirtinessLevel = ['home', 'deep-cleaning', 'move-in-out'].includes(serviceType);
  const showDisinfection = ['deep-cleaning', 'move-in-out'].includes(serviceType);
  const showSupplies = ['home', 'office'].includes(serviceType);
  const showTargetAreas = ['deep-cleaning', 'move-in-out'].includes(serviceType);

  return (
    <div className="space-y-6">
      {showDirtinessLevel && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cleaning Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DirtinessLevelField form={form} />
            <LastCleanedField form={form} />
          </CardContent>
        </Card>
      )}

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
          <CardTitle className="text-base">Additional Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showDisinfection && <DisinfectionRequiredField form={form} />}
          {showSupplies && <SuppliesProvidedField form={form} />}
        </CardContent>
      </Card>
    </div>
  );
};