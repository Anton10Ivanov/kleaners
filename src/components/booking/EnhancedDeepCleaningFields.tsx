import { UseFormReturn } from "react-hook-form";
import { DeepCleaningBookingForm } from "@/schemas/bookingSchemas";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, MapPin } from 'lucide-react';
import { 
  WebFriendlyPropertySizeField,
  WebFriendlyBedroomsField,
  WebFriendlyBathroomsField,
  WebFriendlyDirtinessLevelField
} from '@/components/booking/shared/WebFriendlyFields';
import FlatExtrasSelector from '@/components/booking/FlatExtrasSelector';
import { TargetAreasField, DisinfectionRequiredField } from '@/components/booking/shared/SharedFields';
import { ConditionalTargetAreas } from '@/components/booking/shared/ConditionalTargetAreas';
import { EnhancedDeepCleaningFields as DeepCleaningSpecificFields } from '@/components/booking/shared/EnhancedDeepCleaningFields';
import { MobileStack } from '@/components/layout/mobile-container';
import { ServiceType } from '@/schemas/booking';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface EnhancedDeepCleaningFieldsProps {
  form: UseFormReturn<DeepCleaningBookingForm>;
}

const EnhancedDeepCleaningFields = ({ form }: EnhancedDeepCleaningFieldsProps) => {
  const { isMobile } = useMobileOptimizations();

  return (
    <MobileStack spacing={isMobile ? "md" : "lg"}>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className={cn(
          "font-semibold text-foreground",
          isMobile ? "text-lg" : "text-xl"
        )}>
          Deep Cleaning Details
        </h3>
      </div>

      {/* Property Size */}
      <WebFriendlyPropertySizeField form={form} fieldName="squareMeters" label="Property Size" />

      {/* Bedrooms */}
      <WebFriendlyBedroomsField form={form} />

      {/* Bathrooms */}
      <WebFriendlyBathroomsField form={form} />

      {/* Dirtiness Level */}
      <WebFriendlyDirtinessLevelField form={form} />

      {/* Enhanced Target Areas with Conditional Logic */}
      <ConditionalTargetAreas form={form} />
      
      {/* Enhanced Deep Cleaning Specific Fields */}
      <DeepCleaningSpecificFields form={form} />

      {/* Include Walls and Ceilings */}
      <FormField
        control={form.control}
        name="includeWallsAndCeilings"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center space-x-2">
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
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
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
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
            <FormLabel className="flex items-center gap-2 text-foreground font-medium">
              <Sparkles className="h-4 w-4 text-primary" />
              Special Surfaces to Handle (Optional)
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe any special surfaces that need attention (marble, wood, etc.)..."
                {...field}
                className={cn(
                  "min-h-[80px] bg-background border-input text-foreground",
                  isMobile ? "text-base" : "text-sm"
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Flattened Extras */}
      <FlatExtrasSelector
        serviceType={ServiceType.DeepCleaning}
        selectedExtras={(form.watch('extras') || []) as any}
        onExtrasChange={(extras) => form.setValue('extras', extras as any)}
      />

      {/* Disinfection Required */}
      <DisinfectionRequiredField form={form} />
    </MobileStack>
  );
};

export default EnhancedDeepCleaningFields;