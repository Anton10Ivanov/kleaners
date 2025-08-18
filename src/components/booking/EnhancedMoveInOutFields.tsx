import { UseFormReturn } from "react-hook-form";
import { MoveInOutBookingForm } from "@/schemas/bookingSchemas";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Building2, Shield, Trash2, Key } from 'lucide-react';
import { 
  WebFriendlyPropertySizeField,
  WebFriendlyBedroomsField,
  WebFriendlyBathroomsField,
  WebFriendlyDirtinessLevelField
} from '@/components/booking/shared/WebFriendlyFields';
import FlatExtrasSelector from '@/components/booking/FlatExtrasSelector';
import { ConditionalFields, DisinfectionRequiredField } from '@/components/booking/shared/SharedFields';
import { ServiceType } from '@/schemas/booking';

interface EnhancedMoveInOutFieldsProps {
  form: UseFormReturn<MoveInOutBookingForm>;
}

const EnhancedMoveInOutFields = ({ form }: EnhancedMoveInOutFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Move In/Out Details</h3>
      </div>

      {/* Square Meters */}
      <WebFriendlyPropertySizeField form={form} fieldName="squareMeters" label="Property Size" />

      {/* Bedrooms */}
      <WebFriendlyBedroomsField form={form} />

      {/* Bathrooms */}
      <WebFriendlyBathroomsField form={form} />

      {/* Dirtiness Level */}
      <WebFriendlyDirtinessLevelField form={form} />

      {/* Cleaning Goal */}
      <FormField
        control={form.control}
        name="cleaningGoal"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Cleaning Goal
            </FormLabel>
            <FormControl>
              <RadioGroup value={field.value} onValueChange={field.onChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="deposit" id="deposit" />
                  <Label htmlFor="deposit">Get Deposit Back</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="owner" id="owner" />
                  <Label htmlFor="owner">Property Owner Standards</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="clean-start" id="clean-start" />
                  <Label htmlFor="clean-start">Clean Fresh Start</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Property Status */}
      <FormField
        control={form.control}
        name="isFurnished"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center space-x-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <Label htmlFor="furnished" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Property is furnished
              </Label>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Trash Removal */}
      <FormField
        control={form.control}
        name="trashRemovalNeeded"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center space-x-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <Label htmlFor="trash-removal" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Trash removal needed
              </Label>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Pre-inspection */}
      <FormField
        control={form.control}
        name="preInspectionRequired"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center space-x-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <Label htmlFor="pre-inspection" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Pre-inspection required
              </Label>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Parking */}
      <FormField
        control={form.control}
        name="parkingAvailable"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center space-x-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <Label htmlFor="parking" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Parking available
              </Label>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Flattened Extras */}
      <FlatExtrasSelector
        serviceType={ServiceType.MoveInOut}
        selectedExtras={(form.watch('extras') || []) as any}
        onExtrasChange={(extras) => form.setValue('extras', extras as any)}
      />

      {/* Disinfection Required */}
      <DisinfectionRequiredField form={form} />

      {/* Shared Fields */}
      <ConditionalFields form={form} serviceType={ServiceType.MoveInOut} />
    </div>
  );
};

export default EnhancedMoveInOutFields;