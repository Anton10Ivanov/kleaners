
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData, Frequency } from '@/schemas/booking';

interface PricingSectionProps {
  form: UseFormReturn<BookingFormData>;
}

const PricingSection = ({ form }: PricingSectionProps) => {
  const formData = form.watch();
  const { 
    frequency = Frequency.Weekly, 
    hours = 2, 
    extras = []
  } = formData;

  const getHourlyRate = (freq: string) => {
    switch (freq) {
      case Frequency.Weekly: return 27;
      case Frequency.BiWeekly: return 30;
      default: return 35;
    }
  };

  const hourlyRate = getHourlyRate(frequency);
  const basePrice = hours * hourlyRate;
  const extrasPrice = extras.length * 15;
  const totalPrice = basePrice + extrasPrice;

  return (
    <div className="border-t pt-3 space-y-2">
      {extrasPrice > 0 && (
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Additional services</span>
          <span>€{extrasPrice}</span>
        </div>
      )}
      
      <div className="flex justify-between font-semibold text-lg pt-2">
        <span>Total</span>
        <span className="text-primary">€{totalPrice}</span>
      </div>
      <p className="text-xs text-gray-500">Per cleaning session</p>
    </div>
  );
};

export default PricingSection;
