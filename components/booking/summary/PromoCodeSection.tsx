
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface PromoCodeSectionProps {
  form: UseFormReturn<BookingFormData>;
}

const PromoCodeSection = ({ form }: PromoCodeSectionProps) => {
  const { promoCode } = form.watch();

  const handlePromoCodeApply = () => {
    if (promoCode) {
      toast.success("Promo code applied!");
    }
  };

  return (
    <div className="border-t pt-3">
      <h4 className="font-medium mb-3">Promo Code</h4>
      <div className="flex gap-3">
        <Input
          placeholder="Enter promo code"
          value={promoCode || ''}
          onChange={(e) => form.setValue('promoCode', e.target.value)}
          className="flex-1 h-10 text-base"
        />
        <Button 
          type="button" 
          variant="outline" 
          size="default"
          onClick={handlePromoCodeApply}
          className="px-4 whitespace-nowrap"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default PromoCodeSection;
