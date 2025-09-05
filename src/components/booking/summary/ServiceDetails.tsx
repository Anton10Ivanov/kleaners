
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData, Frequency } from '@/schemas/booking';
import { Clock, LucideIcon, MapPin, Repeat } from 'lucide-react';

interface ServiceDetailsProps {
  form: UseFormReturn<BookingFormData>;
}

const InfoLine = ({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
    <Icon className="h-4 w-4 flex-shrink-0" />
    <span className="min-w-0">{children}</span>
  </div>
);

const getFrequencyLabel = (freq: string) => {
  switch (freq) {
    case Frequency.Weekly: return 'Weekly';
    case Frequency.BiWeekly: return 'Every 2 weeks';
    case Frequency.Monthly: return 'Monthly';
    default: return 'One-time';
  }
};

const ServiceDetails = ({ form }: ServiceDetailsProps) => {
  const formData = form.watch();
  const { 
    frequency = Frequency.Weekly, 
    hours = 2, 
    propertySize,
    bedrooms,
    bathrooms
  } = formData;

  return (
    <div className="space-y-2">
      <InfoLine icon={Repeat}>{getFrequencyLabel(frequency)}</InfoLine>
      <InfoLine icon={Clock}>{hours} hours</InfoLine>
      {propertySize && (
        <InfoLine icon={MapPin}>
          {propertySize}m², {bedrooms || 0} bed{bedrooms !== 1 ? 's' : ''}, {bathrooms || 0} bath{bathrooms !== 1 ? 's' : ''}
        </InfoLine>
      )}
    </div>
  );
};

export default ServiceDetails;
