import { UseFormReturn } from "react-hook-form";
import { DeepCleaningBookingForm } from "@/schemas/bookingSchemas";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, MapPin } from 'lucide-react';
import { ConditionalFields, PropertySizeField, BedroomsField, BathroomsField, ExtrasField } from '@/components/booking/shared/SharedFields';
import { ServiceType } from '@/schemas/booking';

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
      <PropertySizeField form={form} fieldName="squareMeters" label="Property Size" />

      {/* Bedrooms */}
      <BedroomsField form={form} />

      {/* Bathrooms */}
      <BathroomsField form={form} />

      {/* Target Areas */}
      <FormField
        control={form.control}
        name="targetAreas"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Target Areas to Clean
            </FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-3">
                {targetAreasOptions.map((area) => (
                  <div key={area.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={area.id}
                      checked={field.value?.includes(area.id as any)}
                      onCheckedChange={(checked) => {
                        const current = field.value || [];
                        if (checked) {
                          field.onChange([...current, area.id]);
                        } else {
                          field.onChange(current.filter((item) => item !== area.id));
                        }
                      }}
                    />
                    <Label htmlFor={area.id} className="flex items-center gap-2 cursor-pointer">
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
            <div className="flex items-center space-x-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <Label htmlFor="walls-ceilings">
                Include walls and ceilings
              </Label>
            </div>
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
            <div className="flex items-center space-x-2">
              <FormControl>
                <Switch
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <Label htmlFor="mold-pest">
                Mold or pest presence
              </Label>
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

      {/* Extras */}
      <ExtrasField form={form} serviceType={ServiceType.DeepCleaning} />

      {/* Shared Fields */}
      <ConditionalFields form={form} serviceType={ServiceType.DeepCleaning} />
    </div>
  );
};

export default EnhancedDeepCleaningFields;