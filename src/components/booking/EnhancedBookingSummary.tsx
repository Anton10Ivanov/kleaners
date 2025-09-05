
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import ServiceDetails from './summary/ServiceDetails';
import DateTimeInfo from './summary/DateTimeInfo';
import AdditionalServices from './summary/AdditionalServices';
import PricingSection from './summary/PricingSection';
import PromoCodeSection from './summary/PromoCodeSection';
import ActionButtons from './summary/ActionButtons';

interface EnhancedBookingSummaryProps {
  form: UseFormReturn<BookingFormData>;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  onBack?: () => void;
  backButtonText?: string;
  showBackButton?: boolean;
}

const EnhancedBookingSummary = ({ 
  form, 
  onSubmit, 
  isSubmitting, 
  onBack, 
  backButtonText = 'Back', 
  showBackButton = false 
}: EnhancedBookingSummaryProps) => {
  return (
    <Card className="w-full min-w-0">
      <CardHeader className="pb-3">
        <h3 className="font-semibold text-lg">Booking Summary</h3>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <ServiceDetails form={form} />
        <DateTimeInfo form={form} />
        <AdditionalServices form={form} />
        <PricingSection form={form} />
        <PromoCodeSection form={form} />
        <ActionButtons
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onBack={onBack}
          backButtonText={backButtonText}
          showBackButton={showBackButton}
        />
      </CardContent>
    </Card>
  );
};

export default EnhancedBookingSummary;
