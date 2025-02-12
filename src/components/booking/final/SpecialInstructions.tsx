
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";

interface SpecialInstructionsProps {
  form: UseFormReturn<BookingFormData>;
}

const SpecialInstructions = ({ form }: SpecialInstructionsProps) => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">Special instructions</h3>
      <FormField
        control={form.control}
        name="specialInstructions"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Any special instructions for our cleaning team?"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SpecialInstructions;
