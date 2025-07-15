import { UseFormReturn } from "react-hook-form";
import { DeepCleaningBookingForm } from "@/schemas/bookingSchemas";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConditionalFields } from '@/components/booking/shared/SharedFields';
import { ServiceType } from '@/schemas/booking';
import ExtrasSelector from '@/components/booking/ExtrasSelector';

interface EnhancedDeepCleaningFieldsProps {
  form: UseFormReturn<DeepCleaningBookingForm>;
}

const EnhancedDeepCleaningFields = ({ form }: EnhancedDeepCleaningFieldsProps) => {
  const targetAreasOptions = [
    { id: "bathroom", label: "Bathroom", icon: "🚿" },
    { id: "kitchen", label: "Kitchen", icon: "🍽️" },
    { id: "living-room", label: "Living Room", icon: "🛋️" },
    { id: "whole-place", label: "Whole Place", icon: "🏠" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Deep Cleaning Details</h3>
      </div>

      {/* Square Meters */}
      <FormField
        control={form.control}
        name="squareMeters"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Size (m²)</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  min="10"
                  max="500"
                />
                <div className="text-sm text-gray-500">
                  Minimum 10 m², maximum 500 m²
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Bedrooms */}
      <FormField
        control={form.control}
        name="bedrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Bedrooms</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                min="0"
                max="10"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Bathrooms */}
      <FormField
        control={form.control}
        name="bathrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Bathrooms</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                min="1"
                max="10"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Dirtiness Level */}
      <FormField
        control={form.control}
        name="dirtinessLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dirtiness Level (1-5)</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Slider
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Light</span>
                  <span>Heavy</span>
                </div>
                <div className="text-center text-sm font-medium">
                  Level {field.value}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Target Areas */}
      <FormField
        control={form.control}
        name="targetAreas"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Areas to Clean</FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-3">
                {targetAreasOptions.map((area) => (
                  <div key={area.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={area.id}
                      checked={field.value?.includes(area.id as any)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, area.id]);
                        } else {
                          field.onChange(field.value?.filter((item) => item !== area.id));
                        }
                      }}
                    />
                    <Label htmlFor={area.id} className="flex items-center gap-2">
                      <span>{area.icon}</span>
                      {area.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Include Walls and Ceilings */}
      <FormField
        control={form.control}
        name="includeWallsAndCeilings"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Include Walls and Ceilings</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            <div className="text-sm text-gray-500">
              Deep cleaning of walls and ceiling surfaces
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Last Cleaned */}
      <FormField
        control={form.control}
        name="lastCleaned"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Last Cleaned (Optional)
            </FormLabel>
            <FormControl>
              <Input
                type="date"
                {...field}
                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Mold or Pest Presence */}
      <FormField
        control={form.control}
        name="moldOrPestPresence"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Mold or Pest Issues</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            <div className="text-sm text-gray-500">
              Requires special attention for mold or pest treatment
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Special Surfaces */}
      <FormField
        control={form.control}
        name="specialSurfacesToHandle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Surfaces to Handle (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe any special surfaces that need attention (marble, wood, etc.)..."
                {...field}
                className="min-h-[80px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Enhanced Extras Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
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
                    serviceType={ServiceType.DeepCleaning}
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

      {/* Shared Fields */}
      <div className="mt-6">
        <ConditionalFields form={form} serviceType={ServiceType.DeepCleaning} />
      </div>
    </div>
  );
};

export default EnhancedDeepCleaningFields;