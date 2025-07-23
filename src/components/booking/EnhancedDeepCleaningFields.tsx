import { UseFormReturn } from "react-hook-form";
import { DeepCleaningBookingForm } from "@/schemas/bookingSchemas";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, MapPin } from 'lucide-react';
import { 
  MobilePropertySizeField, 
  MobileBedroomsField, 
  MobileBathroomsField, 
  MobileExtrasField,
  MobileTargetAreasField,
  MobileSwitchField
} from '@/components/booking/shared/MobileSharedFields';
import { MobileStack } from '@/components/layout/mobile-container';
import { ServiceType } from '@/schemas/booking';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { cn } from '@/lib/utils';

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
      <MobilePropertySizeField form={form} fieldName="squareMeters" label="Property Size" />

      {/* Bedrooms */}
      <MobileBedroomsField form={form} />

      {/* Bathrooms */}
      <MobileBathroomsField form={form} />

      {/* Target Areas */}
      <MobileTargetAreasField form={form} />

      {/* Include Walls and Ceilings */}
      <MobileSwitchField
        form={form}
        name="includeWallsAndCeilings"
        label="Include walls and ceilings"
        description="Deep clean walls and ceiling surfaces"
        icon={<Sparkles className="h-4 w-4" />}
      />

      {/* Mold or Pest Presence */}
      <MobileSwitchField
        form={form}
        name="moldOrPestPresence"
        label="Mold or pest presence"
        description="Requires specialized cleaning treatment"
        icon={<MapPin className="h-4 w-4" />}
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

      {/* Extras */}
      <MobileExtrasField form={form} serviceType={ServiceType.DeepCleaning} />
    </MobileStack>
  );
};

export default EnhancedDeepCleaningFields;