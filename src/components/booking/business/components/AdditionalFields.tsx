
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalFieldsProps {
  form: UseFormReturn<BookingFormData>;
  businessType: string | undefined;
}

export const AdditionalFields = ({ form, businessType }: AdditionalFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="frequency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How Often Do You Need Cleaning?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={Frequency.Weekly}>Weekly</SelectItem>
                <SelectItem value={Frequency.BiWeekly}>Bi-weekly</SelectItem>
                <SelectItem value={Frequency.Monthly}>Monthly</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="propertySize"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Size (in square meters)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter property size" 
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {businessType !== "other" && (
        <FormField
          control={form.control}
          name="specialRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requirements</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please specify any special requirements or instructions"
                  className="min-h-[100px]"
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};
