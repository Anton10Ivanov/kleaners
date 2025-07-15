import { UseFormReturn } from "react-hook-form";
import { PostConstructionBookingForm } from "@/schemas/bookingSchemas";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { HardHat, AlertTriangle, Wrench, Calendar } from 'lucide-react';

interface PostConstructionFieldsProps {
  form: UseFormReturn<PostConstructionBookingForm>;
}

const PostConstructionFields = ({ form }: PostConstructionFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <HardHat className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Construction Details</h3>
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
                  max="1000"
                />
                <div className="text-sm text-gray-500">
                  Minimum 10 m², maximum 1000 m²
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Construction Type */}
      <FormField
        control={form.control}
        name="constructionType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Construction Type</FormLabel>
            <FormControl>
              <RadioGroup value={field.value} onValueChange={field.onChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="renovation" id="renovation" />
                  <Label htmlFor="renovation">Renovation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new-build" id="new-build" />
                  <Label htmlFor="new-build">New Build</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="demolition" id="demolition" />
                  <Label htmlFor="demolition">Demolition</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Dust Level */}
      <FormField
        control={form.control}
        name="dustLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dust Level (1-5)</FormLabel>
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

      {/* Hazardous Materials */}
      <FormField
        control={form.control}
        name="hazardousMaterials"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <FormLabel>Hazardous Materials Present</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            <div className="text-sm text-gray-500">
              Asbestos, lead paint, or other hazardous materials
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Special Equipment */}
      <FormField
        control={form.control}
        name="specialEquipmentNeeded"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary" />
                <FormLabel>Special Equipment Needed</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            <div className="text-sm text-gray-500">
              Industrial vacuums, pressure washers, etc.
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Access Restrictions */}
      <FormField
        control={form.control}
        name="accessRestrictions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Access Restrictions (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe any access restrictions or special requirements..."
                {...field}
                className="min-h-[80px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Completion Deadline */}
      <FormField
        control={form.control}
        name="completionDeadline"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Completion Deadline (Optional)
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
    </div>
  );
};

export default PostConstructionFields;