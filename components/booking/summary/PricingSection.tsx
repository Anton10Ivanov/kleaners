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

  // Keep pricing logic but don't render any pricing information
  return null;
};

export default PricingSection;
