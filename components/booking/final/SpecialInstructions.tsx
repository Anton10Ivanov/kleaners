
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form";
import { Textarea } from '@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from '@/schemas/booking";
import { Card, CardContent } from '@/components/ui/card";

interface SpecialInstructionsProps {
  form: UseFormReturn<BookingFormData>;
}

const SpecialInstructions = ({ form }: SpecialInstructionsProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Special Instructions</h3>
        <FormField
          control={form.control}
          name="specialInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Any special requests or instructions?</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Please let us know about any specific requirements, preferred cleaning products, areas to focus on, pets, or access instructions..."
                  className="min-h-[100px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-xs text-gray-500 mt-2">
          This information helps our cleaners provide the best service for your needs.
        </p>
      </CardContent>
    </Card>
  );
};

export default SpecialInstructions;
