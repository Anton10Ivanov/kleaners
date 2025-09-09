
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from '@/schemas/booking';
import { toast } from "sonner";

interface PromoCodeProps {
  form: UseFormReturn<BookingFormData>;
}

const PromoCode = ({ form }: PromoCodeProps) => {
  return (
    <div className="form-spacing-relaxed card-spacing-sm bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Promo code</h3>
      <FormField
        control={form.control}
        name="promoCode"
        render={({ field }) => (
          <FormItem>
            <div className="flex gap-2">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <Button type="button" variant="outline" onClick={() => {
                if (field.value) {
                  toast.success("Promo code applied!");
                }
              }}>
                Apply
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PromoCode;
