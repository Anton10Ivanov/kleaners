import { UseFormReturn } from "react-hook-form";
import { MoveInOutBookingForm } from "@/schemas/bookingSchemas";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Building2, Shield, Trash2, Key } from 'lucide-react';

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
            <div className="flex items-center justify-between">
              <FormLabel>Property is Furnished</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            <div className="text-sm text-gray-500">
              Cleaning around furniture and personal items
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-red-500" />
                <FormLabel>Trash Removal Needed</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            <div className="text-sm text-gray-500">
              Disposal of leftover items and trash
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
            <div className="flex items-center justify-between">
              <FormLabel>Pre-inspection Required</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            <div className="text-sm text-gray-500">
              Property assessment before cleaning
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
            <div className="flex items-center justify-between">
              <FormLabel>Parking Available</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            <div className="text-sm text-gray-500">
              Parking space available for cleaning team
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Disinfection */}
      <FormField
        control={form.control}
        name="disinfectionRequired"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <FormLabel>Disinfection Required</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            <div className="text-sm text-gray-500">
              Full disinfection of all surfaces
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EnhancedMoveInOutFields;