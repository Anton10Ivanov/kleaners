
import { useState } from 'react';
import { ChevronUp, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { SummaryDrawer } from './SummaryDrawer';

interface SummaryPillProps {
  form: UseFormReturn<BookingFormData>;
  currentStep: number;
}

const getHourlyRate = (frequency: string) => {
  switch (frequency) {
    case 'weekly': return 27;
    case 'bi-weekly': return 30;
    default: return 35;
  }
};

const calculateExtrasCost = (selectedExtras: string[], frequency: string) => {
  const hourlyRate = getHourlyRate(frequency);
  let totalCost = 0;

  selectedExtras.forEach(extra => {
    switch (extra) {
      case 'cabinets':
      case 'fridge':
        totalCost += (0.5 * hourlyRate);
        break;
      case 'oven':
        totalCost += hourlyRate;
        break;
      case 'ironing':
        totalCost += (0.5 * hourlyRate);
        break;
    }
  });

  return totalCost;
};

export const SummaryPill = ({ form, currentStep }: SummaryPillProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const formData = form.getValues();
  const frequency = formData.frequency;
  const hours = formData.hours || 0;
  const selectedExtras = formData.extras || [];
  const currentPrice = getHourlyRate(frequency || '');
  
  const extrasCost = calculateExtrasCost(selectedExtras, frequency || '');
  const totalCost = (currentPrice * hours) + extrasCost;

  const hasRelevantData = frequency && hours > 0;
  
  if (!hasRelevantData) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsDrawerOpen(true)}
          className="h-12 px-4 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full flex items-center gap-2"
        >
          <Receipt className="h-4 w-4" />
          <span className="font-semibold">
            {totalCost.toFixed(2)} €
          </span>
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>

      <SummaryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        form={form}
        currentStep={currentStep}
      />
    </>
  );
};
